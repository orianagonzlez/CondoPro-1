import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import {gql} from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';






export const GuestForm = ({buttonText}) => {

    const initialFormState = ( ) => {
        let form;
          form = {
            nombre: '',
            apellido:'',
            cedula:'',
            fecha: '',
            casaId: '',
          }
        return form
      }

      const [ formValues , handleInputChange, reset] = useForm( initialFormState());
      
      const { nombre, apellido, cedula, fecha, casaId }= formValues;

      return (
    
        <div>
     
        <Form className="my-5">
        {/* <Form onSubmit={ handleSubmit } className="my-5"> */}

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={ nombre } type="text" placeholder="" />
            {/* <Form.Control name="nombre" value={ nombre } onChange={ handleInputChange } type="text" placeholder="" /> */}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Apellido</Form.Label>
            <Form.Control name="apellido" value={ apellido } type="text" placeholder="" />
            {/* <Form.Control name="apellido" value={ apellido } onChange={ handleInputChange } type="text" placeholder="" /> */}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>CI</Form.Label>
            <Form.Control name="cedula" value={ cedula } type="text"  />
            {/* <Form.Control name="cedula" value={ cedula } onChange={ handleInputChange } type="text"  /> */}
          </Form.Group>
          
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Fecha</Form.Label>
            <Form.Control  name="fecha" value={ fecha } type="date" placeholder="" />
            {/* <Form.Control  name="fecha" value={ fecha } onChange={ handleInputChange } type="text" placeholder="" /> */}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Casa ID</Form.Label>
            <Form.Control name="casaId" value={ casaId } type="text" placeholder="" />
            {/* <Form.Control name="casaId" value={ casaId } onChange={ handleInputChange } type="text" placeholder="" /> */}
          </Form.Group>


          <Button variant="dark" type="submit">
           {buttonText}
          </Button>
        </Form>
    </div>
      )
}