import React, { useContext, useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import { AllPagosRow } from '../components/AllPagosRow';
import { Container, Table } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

const getDetallesDePagoCasa = gql`

query getDetallesDePagoCasa ($CasaId: Int!)
{
    getDetallesDePagoCasa (CasaId: $CasaId) {
    id
    FacturaId
    InstrumentoDePagoId
    Factura{
      numero
      CasaId
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


export const AllPagosUser = () => {

    const { user } = useContext(AppContext);


    const [tableData, setTableData] = useState([]);


    const { loading, error, data } = useQuery(getDetallesDePagoCasa, {
        variables: { CasaId: user.casaID }
    });
  
    useEffect(() => {
  
      console.log(data, "Pagos");
  
      if (data?.getDetallesDePagoCasa) {
  
        setTableData(data?.getDetallesDePagoCasa);
  
      }
  
    }, [data])
  
  
    if (loading) return <p>Cargando pagos...</p>
    if (error) console.log('error', error);
  
  
    return (
      <Container className="mt-5">
  
        <h3>Pagos Realizados</h3>
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