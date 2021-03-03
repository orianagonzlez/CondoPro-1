import React from 'react'
import {  Container  } from 'react-bootstrap';
import { CondoForm } from '../components/CondoForm';

export const CreateCondo = () => {
  
  return (

    <Container className=" condoFormContainer my-5 ">
      <h1>Registrar Condominio</h1>
      <CondoForm buttonText="Crear condominio"/>
    </Container>
  )
}