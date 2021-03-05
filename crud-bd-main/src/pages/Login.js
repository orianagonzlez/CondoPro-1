import React from 'react'
import {  Container  } from 'react-bootstrap';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  

  return (

    <Container className=" loginFormContainer my-5 ">
      <h1>Bienvenido Propietario!</h1>
      <LoginForm buttonText="Iniciar sesión"/> 
      {/* ni me pregunten porque eso se pasa por parametro  */}
    </Container>
  )
}