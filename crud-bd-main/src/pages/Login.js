import React from 'react'
import {  Container  } from 'react-bootstrap';
import { LoginForm } from '../components/LoginForm';
import { useForm } from '../hooks/useForm';

export const Login = () => {
  

  return (

    <Container className=" loginFormContainer my-5 ">
      <h1>Login</h1>
      <LoginForm buttonText="Login"/>
    </Container>
  )
}