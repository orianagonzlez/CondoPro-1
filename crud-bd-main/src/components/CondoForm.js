import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import {gql} from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';

const createCondominio = gql `
  mutation CreateCondominio($nombre: String!, $estado: String!, $ciudad: String!, $direccion: String!, $adminId: Int!) {
    createCondominio(nombre: $nombre, estado: $estado, ciudad: $ciudad, direccion: $direccion, AdminId: $adminId, activo: true) {
      id
      nombre
      estado
      AdminId
    }
  }
`

export const CondoForm = ({buttonText}) => {

    const initialFormState = ( ) => {
        let form;
        form = {
          nombre: '',
          estado:'',
          ciudad:'',
          direccion: '',
        };

        return form
      }

      const [ formValues , handleInputChange, reset] = useForm( initialFormState());

      const { nombre, estado, ciudad, direccion}= formValues;

      const [createCondo] = useMutation(createCondominio);

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);

        const adminId = 1;//aqui se pone el id del admin que esta creando el condo
        createCondo({variables: {nombre, estado, ciudad, direccion, adminId}});
        window.alert("Condominio registrado con exito");
        
      }

      return (
    
        <div>
         
            <Form onSubmit={ handleSubmit } className="my-5">
    
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={ nombre } onChange={ handleInputChange } type="text" placeholder="" />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Estado</Form.Label>
                <Form.Control name="estado" value={ estado } onChange={ handleInputChange } type="text" placeholder="" />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control name="ciudad" value={ ciudad } onChange={ handleInputChange } type="text"  />
              </Form.Group>
              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Dirección</Form.Label>
                <Form.Control  name="direccion" value={ direccion } onChange={ handleInputChange } type="text" placeholder="" />
              </Form.Group>
    
              <Button variant="dark" type="submit">
               Crear condominio
              </Button>
            </Form>
        </div>
      )
}