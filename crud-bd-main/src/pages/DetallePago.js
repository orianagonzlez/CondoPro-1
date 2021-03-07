import React from 'react'
import {  Container  } from 'react-bootstrap';
import { InstrumentoDePagoForm } from '../components/InstrumentoPagoForm';

export const DetallePago = () => {
  
  return (

    <Container className=" InstrumentoDePagoFormContainer my-5 ">
      <h1>Detalles de Pago</h1>
      <InstrumentoDePagoForm buttonText="Crear Instrumento de Pago"/>
    </Container>

  )
}