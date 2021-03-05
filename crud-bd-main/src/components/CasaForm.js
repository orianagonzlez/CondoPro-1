import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import {gql} from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import { useEffect } from 'react';

const createCasa = gql `
  mutation CreateCasa($nombre: String!, $apellido: String!, $cedula: String!, $correo: String!, $telefono: String!) {
    createCasa(nombre: $nombre, apellido: $apellido, cedula: $cedula, correo: $correo, telefono: $telefono, activo: true) {
      id
      nombre
      apellido
    }
  }
`;

const updatePropietario = gql `
  mutation UpdatePropietario($nombre: String!, $apellido: String!, $cedula: String!, $correo: String!, $telefono: String!, $id: Int!) {
    updatePropietario(nombre: $nombre, apellido: $apellido, cedula: $cedula, correo: $correo, telefono: $telefono, id: $id) {
      id
      nombre
      apellido
    }
  }

`;

const getOwners = gql`
    {
        getPropietarios {
        id
        nombre
        apellido
        cedula
        correo
        telefono
      }
    }
   `; 

export const CasaForm = ({ casa, buttonText }) => {

    const initialFormState = ( ) => {
        console.log(casa);
        let form;
        if(casa){
          form = {
            numero: casa.numero,
            dimensiones: casa.dimensiones,
            estado: casa.estado,
            alicuota: casa.alicuota,
            propietarioId: casa.PropietarioId
          };
        }else{
          form = {
            numero: '',
            dimensiones: '',
            estado: '',
            alicuota: '',
            propietarioId: ''
          };
        }
        return form;
      }
    
      
      const [ formValues , handleInputChange, reset] = useForm( initialFormState());

      const { loading, error, data } = useQuery(getOwners);
      console.log(formValues);
      const { numero, dimensiones, estado, alicuota,  propietarioId }= formValues;

      const [propietarios, setPropietarios] = useState([]);

      useEffect(() => {
          if (!loading && data?.getPropietarios) {
              console.log(data.getPropietarios);
              setPropietarios(data?.getPropietarios);
          }
      }, [data]);
    
    
    //   const [createMessage]= useMutation(createPropietario);
    
    //   const [updateOwner] = useMutation(updatePropietario);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        
        // if(casa){
        //   console.log("1")
        //   let id = casa.id
        //   updateOwner({variables:  {nombre, apellido, cedula, correo, telefono, id} });
        //   window.alert("Propietario actualizado con exito");
        // }else{
        //   console.log("2")
        //   createMessage({variables: {nombre, apellido, cedula, correo, telefono}});
        //   window.alert("Propietario registrado con exito");
        // }
        
      }
    
      return (
        
        <div>
         
            <Form onSubmit={ handleSubmit } className="my-5">
    
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Numero</Form.Label>
                <Form.Control name="numero" value={ numero } onChange={ handleInputChange } type="number" placeholder="" />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Dimensiones</Form.Label>
                <Form.Control name="dimensiones" value={ dimensiones } onChange={ handleInputChange } type="number" min="0" placeholder="" />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Estado</Form.Label>
                <Form.Control name="estado" value={ estado } onChange={ handleInputChange } type="text"  />
              </Form.Group>
              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Alicuota</Form.Label>
                <Form.Control  name="alicuota" value={ alicuota } onChange={ handleInputChange } type="number" min="0" placeholder="" />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Propietario</Form.Label>
                <Form.Control as="select" name="propietarioId" value={ propietarioId } onChange={ handleInputChange } type="email" placeholder="">
                    <option>Sin propietario</option>
                    
                    {propietarios.map(propietario => (
                        <option key={propietario.id} value={propietario.id}>{propietario.nombre} {propietario.apellido}</option>
                    ))
                    }
                </Form.Control>
              </Form.Group>
    
    
              <Button variant="dark" type="submit">
               {buttonText}
              </Button>
            </Form>
        </div>
      )
    }
