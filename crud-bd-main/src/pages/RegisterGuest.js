import React from 'react'
import {  Container  } from 'react-bootstrap';
import { GuestForm } from '../components/GuestForm';

export const RegisterGuest = () => {
  
  return (

    <Container className=" guestFormContainer my-5 ">
      <h1>Registrar Invitado</h1>
      <GuestForm buttonText="Registrar Invitado"/>
    </Container>
  )
}