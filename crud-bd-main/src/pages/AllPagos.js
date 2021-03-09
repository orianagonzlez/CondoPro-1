import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { AllPagosRow } from '../components/AllPagosRow';
import { Container, Table } from 'react-bootstrap';

const getDetallesDePagos = gql`

query getDetallesDePagos
{
  getDetallesDePagos {
    id
    FacturaId
    InstrumentoDePagoId
    Factura{
      numero
    }
    InstrumentoDePago{
      numero
      fecha
      monto
      tipo
    }
  }
}
`;

export const AllPagos = () => {


  const [tableData, setTableData] = useState([]);


  const { loading, error, data } = useQuery(getDetallesDePagos);

  useEffect(() => {

    console.log(data, "Pagos");

    if (data?.getDetallesDePagos) {

      setTableData(data?.getDetallesDePagos);

    }

  }, [data])


  if (loading) return <p>Cargando pagos...</p>
  if (error) console.log('error', error);


  return (
    <Container className="mt-5">

      <h3>Pagos Recibidos</h3>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr className="text-center">
            <th># Factura</th>
            <th># Instrumento de Pago</th>
            <th>Fecha de Realización del Pago</th>
            <th>Monto Pagado</th>
            <th>Tipo de Instrumento de Pago</th>
            <th>Ver Detalles de la Factura</th>
          </tr>
        </thead>
        <tbody>
          {
            tableData.map((pago, i) => (
              <AllPagosRow key={pago.id} pago={pago} />
            ))
          }
        </tbody>
      </Table>
    </Container>
  )
}