import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import {gql} from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';






export const LoginForm = ({buttonText}) => {

    const initialFormState = ( ) => {
        let form;
          form = {
            username: '',
            password:'',
          }
        return form
      }

      const [ formValues , handleInputChange, reset] = useForm( initialFormState());

      const { username, password }= formValues;

      return (
    
        <div>
         
            <Form className="my-5">
            {/* <Form onSubmit={ handleSubmit } className="my-5"> */}
    
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" value={ username } type="text" placeholder="" />
                {/* <Form.Control name="nombre" value={ nombre } onChange={ handleInputChange } type="text" placeholder="" /> */}
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" value={ password } type="text" placeholder="" />
                {/* <Form.Control name="apellido" value={ estado } onChange={ handleInputChange } type="text" placeholder="" /> */}
              </Form.Group>
    
              <Button variant="dark" type="submit">
               {buttonText}
              </Button>
            </Form>
        </div>
      )
}