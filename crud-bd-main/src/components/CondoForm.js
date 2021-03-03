import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import {gql} from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';






export const CondoForm = ({buttonText}) => {

    const initialFormState = ( ) => {
        let form;
          form = {
            nombre: '',
            estado:'',
            ciudad:'',
            direccion: '',
          }
        return form
      }

      const [ formValues , handleInputChange, reset] = useForm( initialFormState());

      const { nombre, estado, ciudad, direccion }= formValues;

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
                <Form.Label>Estado</Form.Label>
                <Form.Control name="estado" value={ estado } type="text" placeholder="" />
                {/* <Form.Control name="apellido" value={ estado } onChange={ handleInputChange } type="text" placeholder="" /> */}
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control name="cedula" value={ ciudad } type="text" placeholder=""/>
                {/* <Form.Control name="cedula" value={ ciudad } onChange={ handleInputChange } type="text"  /> */}
              </Form.Group>
              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Dirección</Form.Label>
                <Form.Control  name="telefono" value={ direccion } type="text" placeholder="" />
                {/* <Form.Control  name="telefono" value={ direccion } onChange={ handleInputChange } type="text" placeholder="" /> */}
              </Form.Group>
    
              <Button variant="dark" type="submit">
               {buttonText}
              </Button>
            </Form>
        </div>
      )
}