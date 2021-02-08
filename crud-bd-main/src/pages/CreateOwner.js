import React from 'react'
import { OwnerForm } from '../components/OwnerForm'
import {  Container  } from 'react-bootstrap';

export const CreateOwner = () => {
  
  return (

    <Container className=" ownerFormContainer my-5 ">
      <h1>Registrar Propietario</h1>
      <OwnerForm/>
    </Container>
  )
}
