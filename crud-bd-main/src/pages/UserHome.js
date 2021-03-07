import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AllFacturasRowUser } from '../components/AllFacturasRowUser';


import { AppContext } from '../context/AppContext';


const getFacturasByCasaId = gql`
    query getFacturasByCasaId($CasaId: Int!)
    {
      getFacturasByCasaId(CasaId: $CasaId) {
        id
        numero
        estado
        fechaEmision
        fechaVenc
        saldo
        CasaId
      }
    }
   `;

export const UserHome = () => {
  const { user } = useContext(AppContext);

  const [tableData, setTableData] = useState([]);

  const { loading, error, data } = useQuery(getFacturasByCasaId, {
    variables: { CasaId: user.casaID }
  });


  const history = useHistory();

  useEffect(() => {
    console.log('cambie todos los props')
    if (!loading && data?.getFacturasByCasaId) {

      setTableData(data?.getFacturasByCasaId);
    }
  }, [data]);

  if (loading) return <p>Cargando Facturas</p>
  if (error) console.log('error', error);

  return (
    <Container className="mt-5">
      <h1>Lista de Facturas</h1>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr className="text-center">
            <th>#ID</th>
            <th>Numero</th>
            <th>Estado</th>
            <th>fechaEmision</th>
            <th>fechaVenc</th>
            <th>Saldo</th>
            <th>CasaId</th>
            <th>Pagar</th>
          </tr>
        </thead>
        <tbody>
          {
            tableData.map((factura, i) => (
              <AllFacturasRowUser key={factura.id} factura={factura} />
            ))
          }
        </tbody>
      </Table>

    </Container>
  )
}