import React from 'react'
import { OwnerForm } from '../components/OwnerForm'
import {  Container  } from 'react-bootstrap';
import { FacturaForm } from '../components/FacturaForm';

export const CreateFactura = () => {
  
  return (

    <Container className="  my-5 ">
     
      <FacturaForm/>
   
    </Container>
  )
}