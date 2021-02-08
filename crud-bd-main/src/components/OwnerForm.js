import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import {gql} from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useEffect, useState } from 'react';

const createPropietario = gql `
  mutation CreatePropietario($nombre: String!, $apellido: String!, $cedula: String!, $correo: String!, $telefono: String!) {
    createPropietario(nombre: $nombre, apellido: $apellido, cedula: $cedula, correo: $correo, telefono: $telefono, activo: true) {
      id
      nombre
      apellido
    }
  }
`

const updatePropietario = gql `
  mutation UpdatePropietario($nombre: String!, $apellido: String!, $cedula: String!, $correo: String!, $telefono: String!, $id: Int!) {
    updatePropietario(nombre: $nombre, apellido: $apellido, cedula: $cedula, correo: $correo, telefono: $telefono, id: $id) {
      id
      nombre
      apellido
    }
  }

`

export const OwnerForm = ({owner}) => {

  const initialFormState = ( ) => {
    console.log(owner)
    let form;
    if(owner){
      form = {
        nombre: owner.nombre,
        apellido: owner.apellido,
        cedula: owner.cedula,
        telefono: owner.telefono,
        correo: owner.correo,
      }
    }else{
      form = {
        nombre: '',
        apellido:'',
        cedula:'',
        telefono: '',
        correo: '',
      }
    }
    return form
  }

  const [ formValues , handleInputChange, reset] = useForm( initialFormState());

  const { nombre, apellido, cedula, telefono,  correo }= formValues;


  const [createMessage]= useMutation(createPropietario);

  const [updateOwner] = useMutation(updatePropietario)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    
    if(owner){
      console.log("1")
      let id = owner.id
      updateOwner({variables:  {nombre, apellido, cedula, correo, telefono, id} })
      window.alert("Propietario actualizado con exito")
    }else{
      console.log("2")
      createMessage({variables: {nombre, apellido, cedula, correo, telefono}});
      window.alert("Propietario registrado con exito")
    }
    
  }

  return (
    
    <div>
     
        <Form onSubmit={ handleSubmit } className="my-5">

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={ nombre } onChange={ handleInputChange } type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Apellido</Form.Label>
            <Form.Control name="apellido" value={ apellido } onChange={ handleInputChange } type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>CI</Form.Label>
            <Form.Control name="cedula" value={ cedula } onChange={ handleInputChange } type="text"  />
          </Form.Group>
          
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Telefono</Form.Label>
            <Form.Control  name="telefono" value={ telefono } onChange={ handleInputChange } type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Correo</Form.Label>
            <Form.Control name="correo" value={ correo } onChange={ handleInputChange } type="email" placeholder="" />
          </Form.Group>


          <Button variant="dark" type="submit">
           Crear nuevo propietario
          </Button>
        </Form>
    </div>
  )
}
