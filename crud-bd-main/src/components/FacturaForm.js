import React, { useEffect, useState } from 'react'
import { Button, Form, Table, Container, Col, Row } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

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





export const FacturaForm = () => {
  
  const [gastos, setgastos] = useState([])

  const [casas, setCasas] = useState([])
  
  const { loading: loadingCasas, error: errorCasas, data: dataCasas } = useQuery(getCasas);

   useEffect(() => {
     
    if (!loadingCasas && dataCasas) {
          
          setCasas(dataCasas.getCasas);
          }
      }, [dataCasas]);

  
  const [ formValues , handleInputChange, reset] = useForm({
     fEmision: new Date().toLocaleDateString(),
     fVencimiento: "",
     numero: "",
     casaId: ""

  });
  
  const { fVencimiento, fEmision, numero, casaId }= formValues;
  
  //let date = new Date();
  //date = date.getDate() + "-"+ "0"+(date.getMonth()+1)+ "-" +date.getFullYear();
  //console.log( date )
  // let date2 = new Date(fVencimiento);
  // date2.setDate( date2.getDate()+1);
  // date2 = date2.toDateString();
  

  // let date3 = new Date(date2);
  // console.log(date3.toLocaleDateString());
  
    if (loadingCasas) return <p>Cargando casas</p>
    if (errorCasas) console.log('error', errorCasas);
    console.log(casas)

  return (
    <Container fluid >
       <Form className="my-5">
        <Row>
          <Col lg={ 6 } xs ={ 12 }>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Fecha de emisión</Form.Label>
              <Form.Control  name="fEmision" value={ fEmision } type="text" placeholder="" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control  name="fVencimiento" value={ fVencimiento } onChange = { handleInputChange } type="date" placeholder="" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Numero</Form.Label>
              <Form.Control name="numero"  value={ numero } type="text" placeholder="" />
            </Form.Group>

              
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Seleccione la casa a la cual se va emitir</Form.Label>
                <Form.Control as="select" name="casaId" value={ casaId } onChange={ handleInputChange } type="email" placeholder="">
                    <option> </option>
                    
                    {casas.map(casa => (
                        <option key={casa.id} value={casa.id}>ID:{casa.id} - {casa.nombre}</option>
                    ))
                    }
                </Form.Control>
            </Form.Group>



          </Col>
          <Col lg={ 6 } xs ={ 12 }>
            
              <Table striped bordered hover >
              <thead>
                  <tr className="text-center">
                    <th>#ID</th>
                    <th>Concepto</th>
                    <th>Tipo</th>
                    <th>Monto</th>
                  </tr>
              </thead>
              {/* <tbody>
                  {
                    tableData.map((owner, i) => (
                      <OwnerInfoRow key={owner.cedula} owner={owner}/>
                    ))
                  }
              </tbody> */}
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
