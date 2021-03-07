import React from 'react'
import { Container } from 'react-bootstrap';
import { InstrumentoDePagoForm } from '../components/InstrumentoPagoForm';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';

const getFactura = gql`
    query getFactura($id: Int!)
    {
      getFactura(id: $id) {
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

export const DetallePago = () => {

  console.log('si llegue')
  const { facturaId } = useParams();

  const [factura, setFactura] = useState(null);

  const { loading, error, data } = useQuery(getFactura, {
    variables: { id: parseInt(facturaId) }
  });

  useEffect(() => {

    if (data?.getFactura) {

      setFactura(data.getFactura);
    }

  }, [data])


  if (loading || (!factura)) return <p>Cargando factura</p>

  return (

    <Container className=" InstrumentoDePagoFormContainer my-5 ">
      <h1>Detalles de Pago</h1>
      <InstrumentoDePagoForm factura={factura} buttonText="Pagar factura" />
    </Container>

  )
}