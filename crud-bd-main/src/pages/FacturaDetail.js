import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';
import { AppContext } from '../context/AppContext';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { GastoRow } from '../components/GastoRow';

const getDetallesFactura = gql`
    query GetDetallesFactura($id: Int!)
    {
        getDetallesFactura(FacturaId: $id) {
            id 
            GastoId, 
            FacturaId, 
            Gasto{
              concepto
              tipo
              monto
              CasaId
            }
        }
    }
`;


const getFactura = gql`
    query GetFactura($id: Int!)
    {
        getFactura(id: $id) {
            numero
            estado
            fechaEmision
            fechaVenc
            saldo
            CasaId
            Casa {
              nombre
              dimensiones
              estado
              PropietarioId
              CondominioId
              alicuota
              numero
              Propietario {
                nombre
                apellido
                correo
                telefono
                cedula
              }
            } 
        }
    }
`;

// const getCasa = gql`
//     query GetCasa($id: Int!)
//     {
//         getCasa(id: $id) {
//           nombre
//           dimensiones
//           estado
//           PropietarioId
//           CondominioId
//           alicuota
//           numero
//           Propietario{
//             nombre
//             apellido
//             correo
//             telefono
//             cedula
//           }
//         }
//     }
// `;

export const FacturaDetail = () => {
  
   const { facturaId } = useParams();

  const { loading, error, data } = useQuery(getDetallesFactura, {
        variables: { id: parseInt(facturaId) }
    });

  const { loading: loadingFactura , error: errorFactura , data: dataFactura } = useQuery(getFactura, {
        variables: { id: parseInt(facturaId) }
    });

  // const { loading: loadingCasa, error: errorCasa , data: dataCasa } = useQuery(getCasa, {
  //       variables: { id: parseInt(casaId) }
  //   });

  const [gastos, setGastos] = useState([]);

  const [factura, setFactura] = useState();

  const [casa, setCasa] = useState();

  const [monto, setMonto] = useState(0);

    useEffect(() => {

        if (data?.getDetallesFactura) {
            //console.log(data?.getDetallesFactura);
            let myArray = [] ;
            let myMonto = 0;
            data.getDetallesFactura.forEach(element => {
             
              myArray.push(element.Gasto)
              myMonto = myMonto + element.Gasto.monto

            });
            setGastos(myArray);
            setMonto(myMonto);
        }

    }, [data])

    
    useEffect(() => {

        if (dataFactura?.getFactura) {
            setFactura(dataFactura.getFactura);
            setCasa(dataFactura.getFactura.Casa)
        }

    }, [dataFactura])

    
    
    // useEffect(() => {

    //     if (dataCasa?.getCasa) {
    //         console.log(dataCasa?.getCasa);
           
    //         setCasa(dataCasa.getCasa);

           
    //     }

    // }, [dataCasa])


    if (loading  || loadingFactura) return <p>Cargando Facturas</p>
    if (error || errorFactura ) console.log('error', error);


    if (!factura || !casa )return <p>Cargando datos...</p>
    
  return (
    <Container className= "my-5">
      <h2>Detalles de la factura</h2>

      <Row className= "my-3 d-flex">
        <Col className= "text-center">

          <h5>#Número: {"000"+ factura.numero }</h5>

        </Col >

        <Col className= "text-center">
          <h5>Fecha de Emisión: { new Date(factura.fechaEmision).toLocaleDateString() }</h5>
        </Col>

        <Col className= "text-center">
          <h5>Fecha de Vecimiento: { new Date(factura.fechaVenc).toLocaleDateString() }</h5>
        </Col>

        <Col className= "text-center">
          <h5>Estado: { factura.estado }</h5>
        </Col>
      </Row>

      <h4 className="mt-5">Detalles del propietario </h4>

      <Row className= "my-3 d-flex">
        <Col className= "text-center">

          <h5>Nombre: { casa.Propietario.nombre+ " "+ casa.Propietario.apellido }</h5>

        </Col >

        <Col className= "text-center">
          <h5>CI: { casa.Propietario.cedula }</h5>
        </Col>

        <Col className= "text-center">
          <h5>Nombre de la casa: { casa.nombre }</h5>
        </Col>

        <Col className= "text-center">
          <h5>#Casa: { casa.numero }</h5>
        </Col>
      </Row>

      
        <h4 className="mt-5">Detalles de los gastos</h4>

      <Table className="mt-2 mb-5" striped bordered hover >
              <thead>
                  <tr className="text-center">
                   
                    <th>Concepto</th>
                    <th>Tipo</th>
                    <th>Casa</th>
                    <th> Total gasto($)</th>
                    <th>Monto correpondiente($)</th>
                    
                   
                  </tr>
              </thead>

              <tbody>
                            {
                            gastos.map((gasto, i) => (
                                <GastoRow 
                                key={i} 
                                gasto={gasto} 
                                gastos={gastos} 
                                setGastos={setGastos}
                                alicuota = {casa.alicuota}/>
                            ))
                            } 
                </tbody>
            </Table>

            <Row>
              <Col className="text-center">
              <h5>Monto total de los gastos de factura: { "$"+monto }</h5>
              </Col>
              <Col>
              <h5 className="text-center">Total a pagar:  { "$"+(monto*(casa.alicuota/100)) }</h5>
              </Col>
            </Row>
              

              

              <h5 className="my-5">Saldo pendiente por pagar { "$"+ (factura.saldo) } </h5>

      

    </Container>
  )
}
