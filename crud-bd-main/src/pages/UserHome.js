import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
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

const getFacturasPendientes = gql`
    query getFacturasPendientes($casaIdPen: Int!)
    {
      getFacturasPendientes(CasaId: $casaIdPen) {
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

const getFacturasPagadas = gql`
    query getFacturasPagadas($casaIdPag: Int!)
    {
      getFacturasPagadas(CasaId: $casaIdPag) {
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
  const [casaIdPen, setEstadoPen] = useState(0);
  const [casaIdPag, setEstadoPag] = useState(0);

  const { loading, error, data } = useQuery(getFacturasByCasaId, {
    variables: { CasaId: user.casaID }
  });

  const { loading: loadingPen, error: penError, data: pendiente} = useQuery(getFacturasPendientes, {
    variables: { casaIdPen: user.casaID }
  });

  const { loading: loadingPag, error: pagError, data: pagada} = useQuery(getFacturasPagadas, {
    variables: { casaIdPag: user.casaID }
  });


  useEffect(() => {

    if (!loading && data?.getFacturasByCasaId) {
      setTableData(data?.getFacturasByCasaId);
    }
  }, [data]);


  useEffect(() => {
    if (!loadingPen && casaIdPen && pendiente?.getFacturasPendientes) {
      setTableData(pendiente?.getFacturasPendientes);
    }
  }, [casaIdPen, pendiente]);

  useEffect(() => {
    if (!loadingPag && casaIdPag && pagada?.getFacturasPagadas) {
      setTableData(pagada?.getFacturasPagadas);
    }
  }, [casaIdPag, pagada]);


  if (loading || loadingPen || loadingPag) return <p>Cargando Facturas</p>
  if (error || penError || pagError) console.log('error', error);

  const handleCleaning = () => {
    console.log("clean:");
    setTableData(data.getFacturasByCasaId);
    setEstadoPag();
    setEstadoPen();
  };

  const handlePending = () => {
    console.log("Pendientes:");
    console.log(pendiente);
    setEstadoPen(pendiente.getFacturasPendientes);
    setEstadoPag();
  };

  const handlePayed = () => {
    console.log("Pagadas:");
    console.log(pagada);
    setEstadoPag(pagada.getFacturasPagadas);
    setEstadoPen();
  };

  return (
    <Container className="mt-5">
      <h1>Lista de Facturas</h1>

      <div className="d-flex justify-content-around">

        <Button onClick={ handleCleaning } variant="outline-primary" className="my-5">Todas las Facturas</Button>
        <Button onClick={ handlePending } variant="outline-primary" className="my-5">Facturas Pendientes</Button>
        <Button onClick={ handlePayed } variant="outline-primary" className="my-5">Facturas Pagadas</Button>

      </div>

      <Table striped bordered hover className="mt-5">
        <thead>
          <tr className="text-center">
            <th># Factura</th>
            <th>Estado</th>
            <th>Fecha de emisión</th>
            <th>Fecha de Vencimiento</th>
            <th>Saldo</th>
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