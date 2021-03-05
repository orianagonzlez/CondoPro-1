import React from 'react'
import { Container } from 'react-bootstrap'
import { AdminLoginForm } from '../components/AdminLoginForm'

export const adminLogin = () => {
  
  return (
    <Container className=" loginFormContainer my-5">
      <h1>Bienvenido administrador!</h1>
      <AdminLoginForm/>
    </Container>
  )
}
