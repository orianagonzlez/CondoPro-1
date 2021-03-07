import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Table, Container, Col, Row } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AppContext } from '../context/AppContext';
import { AllGastosRowFact } from './AllGastosRowFact';



const createFactura = gql `
  mutation CreateFactura($num: Int!, $estado: String!, $fechaEmi: String!, $fechaVen  : String!, $saldo: Float!, $CasaId: Int!) {
    createFactura(numero: $num, estado: $estado, fechaEmision: $fechaEmi, fechaVenc: $fechaVen, saldo: $saldo, CasaId: $CasaId, activo: true) {
      id
      numero
    }
  }
`;

const createGastoDeFactura= gql `
  mutation CreateGastoDeFactura($GastoId: Int!, $FacturaId: Int!) {
    createGastoDeFactura(GastoId: $GastoId, FacturaId: $FacturaId) {
      id
    }
  }
`;



const getCasas = gql`
    {
        getCasas {
        id
        nombre
        numero
        dimensiones
        estado
        alicuota
        PropietarioId
        CondominioId
      }
    }
   `;

const getGastos = gql`
    query GetGastosByCondoId($condoId: Int!)
    {
        getGastosByCondoId(condoId: $condoId) {
        id
        concepto
        tipo
        monto
        CasaId
      }
    }
   `;

const getFacturas = gql`
    {
        getFacturas {
          id
          numero
          estado
      }
    }
   `;


export const FacturaForm = () => {
  
  const { user } = useContext(AppContext); 

  const [gastos, setGastos] = useState([]);

  const [casas, setCasas] = useState([]);

  const [monto, setMonto] = useState(0)

  const [numFact, setNumFact] = useState()

  const [tableData, setTableData] = useState([]);

  
  const { loading: loadingCasas, error: errorCasas, data: dataCasas } = useQuery(getCasas);

  const { loading: loadingFact, error: errorFact, data: dataFact, refetch: refetchFact } = useQuery(getFacturas);

    
  const [ formValues , handleInputChange, reset] = useForm({
     fEmision: new Date().toLocaleDateString(),
     fVencimiento: "",
     numero: "",
     casaId: "",
     montoFact: monto,
     numero: numFact

  });

  const { fVencimiento, fEmision, casaId }= formValues;


  const { loading, error, data } = useQuery(getGastos, {
        variables: {condoId: user.condoID}
    });

//Esto es una atrocidad con los effects pero relamnete no quiero seguir viviendo , quizas el de getNumero lo cambie despues

   useEffect(() => {
     
    if (!loadingCasas && dataCasas) {
          
          setCasas(dataCasas.getCasas);
          }
      }, [dataCasas]);

    useEffect(() => {
     
    if (!loadingFact && dataFact) {
          
        let num = 1;
         dataFact.getFacturas.forEach(element => {
         num++;
         });
         
         setNumFact("000"+num)
          
        }

      }, [dataFact]);


    useEffect(() => {
      console.log("me ejecute")
        if (!loading && data?.getGastosByCondoId) {
            console.log(data.getGastosByCondoId)
          setTableData(data?.getGastosByCondoId);

        }

      }, [data]);


    useEffect(() => {
      console.log(gastos,"ESTOY EN EL EFFECT");
      let myMonto = 0
      gastos.forEach(element => {
        myMonto = myMonto + element.monto
      })
      console.log(myMonto);
      setMonto(myMonto);

    }, [gastos])
  
  const [crearFactura]= useMutation(createFactura);

  const [crearGastoDrFactura]= useMutation(createGastoDeFactura);

    const handleSubmit = async (e) => {
      console.log('entregue')
      e.preventDefault();

      let num = parseInt(numFact);
      let estado = "pendiente";
      let fechaEmi = new Date().toDateString();
      let fechaVen = new Date(fVencimiento);
      fechaVen.setDate(fechaVen.getDate() + 1);
      fechaVen = fechaVen.toDateString();
      let saldo = parseFloat(monto);
      let CasaId = parseInt(casaId);

     

      let res = await crearFactura({ variables:  { num, estado, fechaEmi, fechaVen, saldo, CasaId }} )

      let FacturaId = res.data.createFactura.id;
      
      gastos.forEach(gasto => {
       let GastoId = gasto.id;
       crearGastoDrFactura({ variables:  { FacturaId, GastoId }} )
      });
      

    }

    if (loadingCasas && loadingFact) return <p>Cargando casas</p>
    if (errorCasas || errorFact) console.log('error', errorCasas);
   
 

  return (
    <Container fluid >
       <h1>Registrar Factura</h1>
       <Form className="my-5" onSubmit={ handleSubmit }>
        <Row>
          <Col lg={ 4 } xs ={ 12 }>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Fecha de emisión</Form.Label>
              <Form.Control  name="fEmision" value={ fEmision } onChange = { handleInputChange } type="text" placeholder="" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control  name="fVencimiento" value={ fVencimiento } onChange = { handleInputChange } type="date" placeholder="" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Numero</Form.Label>
              <Form.Control name="numero"  value={ numFact }  onChange = { handleInputChange } type="text" placeholder="" />
            </Form.Group>

              
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Seleccione la casa a la cual se va emitir</Form.Label>
                <Form.Control as="select" name="casaId" value={ casaId } onChange={ handleInputChange } type="email" placeholder="">
                    <option> </option>
                    
                    {casas.map(casa => (
                        <option key={casa.id} value={casa.id}>ID:{casa.id} / {casa.nombre}</option>
                    ))
                    }
                </Form.Control>
            </Form.Group>

            <h5>Monto total: { monto }</h5>



          </Col>
          <Col lg={ 8 } xs ={ 12 }>
            
              <Table striped bordered hover >
              <thead>
                  <tr className="text-center">
                    <th>#ID</th>
                    <th>Concepto</th>
                    <th>Tipo</th>
                    <th>Monto ($)</th>
                    <th>Casa</th>
                    <th>Opciones</th>
                  </tr>
              </thead>

              <tbody>
                            {
                            tableData.map((gasto, i) => (
                                <AllGastosRowFact 
                                key={gasto.id} 
                                gasto={gasto} 
                                gastos={gastos} 
                                setGastos={setGastos}/>
                            ))
                            }
                </tbody>
            </Table>
            
          </Col>

        </Row>
 
          <Button variant="dark" type="submit">
           Registrar factura
          </Button>
        </Form>
    </Container>
  )
}
