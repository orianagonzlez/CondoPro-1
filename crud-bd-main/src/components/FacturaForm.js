import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Table, Container, Col, Row } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AppContext } from '../context/AppContext';
import { AllGastosRowFact } from './AllGastosRowFact';
import { useHistory } from 'react-router';



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

const getCasasByCondoId = gql`
query GetCasasByCondoId($condoId: Int!)
{
    getCasasByCondoId(condoId: $condoId) {
    id
    nombre
    numero
    alicuota
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
        Casa {
          numero
          nombre
        }
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
  
//OJALA ME PAGARAN POR CASA EFFECT DE ESTE COMPONENTE LMAO
  const history = useHistory();

  const { user } = useContext(AppContext); 

  const [gastos, setGastos] = useState([]);

  const [casas, setCasas] = useState([]);

  const [monto, setMonto] = useState(0)

  const [numFact, setNumFact] = useState('');

  const [tableData, setTableData] = useState([]);

  const [alicuota, setAlicuota] = useState()

  
  const { loading: loadingCasas, error: errorCasas, data: dataCasas, refetch: refetchCasas } = useQuery(getCasasByCondoId, {
    variables: {condoId: user.condoID}
  });

  const { loading: loadingFact, error: errorFact, data: dataFact, refetch: refetchFact } = useQuery(getFacturas);

  const { loading, error, data, refetch } = useQuery(getGastos, {
        variables: {condoId: user.condoID}
    });

  const [ formValues , handleInputChange, reset] = useForm({
     fEmision: new Date().toLocaleDateString(),
     fVencimiento: "",
     numero: "",
     casaId: "",
     montoFact: monto,
     numero: numFact

  });

  const { fVencimiento, fEmision, casaId }= formValues;




//Esto es una atrocidad con los effects pero relamnete no quiero seguir viviendo , quizas el de getNumero lo cambie despues

   useEffect(() => {
     
    if (!loadingCasas && dataCasas) {
          
          setCasas(dataCasas.getCasasByCondoId);
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
            //console.log(data.getGastosByCondoId)
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

    useEffect(() => {

      let myArray = [];
      if(casaId){
        myArray = casas.filter( ( casa ) => ( casa.id === parseInt(casaId) )  );
        setAlicuota(myArray[0].alicuota);
      }

     

    }, [casaId, casas])

    useEffect(() => {

    refetch();
    refetchCasas();
    refetchFact(); 

    }, [])
  
  const [crearFactura]= useMutation(createFactura);

  const [crearGastoDeFactura]= useMutation(createGastoDeFactura);

    const handleSubmit = async (e) => {
      e.preventDefault();

      let num = parseInt(numFact);
      let estado = "Pendiente";
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
       console.log(GastoId);
       crearGastoDeFactura({ variables:  { FacturaId, GastoId }} )
      });
      
      window.alert("Factura registrada con exito");

      history.push(`/condo/facturaDetail/${FacturaId}/${CasaId}`)

      

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
              <Form.Control  name="fEmision" value={ fEmision } onChange = { handleInputChange } type="text" placeholder="" disabled/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control  name="fVencimiento" value={ fVencimiento } onChange = { handleInputChange } type="date" placeholder="" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Numero</Form.Label>
              <Form.Control name="numero"  value={ numFact }  onChange = { handleInputChange } type="text" placeholder="" disabled/>
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
             
            
            <h5>Monto total a pagar: ${ (alicuota) ? (monto*(alicuota/100)) : ("0") }</h5>
            <small>Seleccione la casa a la cual va dirigida la factura para calcular el monto segun la alicuota</small>



          </Col>
          <Col lg={ 8 } xs ={ 12 }>
            
              <Table striped bordered hover >
              <thead>
                  <tr className="text-center">
                    <th>Check</th>
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
 
          <Button className="my-3" variant="dark" type="submit">
           Registrar factura
          </Button>
        </Form>
    </Container>
  )
}
