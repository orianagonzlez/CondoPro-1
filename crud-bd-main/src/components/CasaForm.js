import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import {gql} from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import { useEffect } from 'react';

const createCasa = gql `
  mutation CreateCasa($nombre: String!, $num: Int!, $dim: Int!, $estado: String!, $ali: Float!, $propId: Int, $condominioId: Int!) {
    createCasa(nombre: $nombre, numero: $num, dimensiones: $dim, estado: $estado, alicuota: $ali, PropietarioId: $propId, CondominioId: $condominioId, activo: true) {
      id
      nombre
      numero
    }
  }
`;

const updateCasa = gql `
  mutation UpdateCasa($nombre: String!, $num: Int!, $dim: Int!, $estado: String!, $ali: Float!, $propId: Int, $id: Int!) {
    updateCasa(nombre: $nombre, numero: $num, dimensiones: $dim, estado: $estado, alicuota: $ali, PropietarioId: $propId, id: $id) {
      id
      nombre
      numero
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
            nombre: casa.nombre,
            numero: casa.numero,
            dimensiones: casa.dimensiones,
            estado: casa.estado,
            alicuota: casa.alicuota,
            propietarioId: casa.PropietarioId
          };
        }else{
          form = {
            nombre: '',
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

      const { nombre, numero, dimensiones, estado, alicuota,  propietarioId }= formValues;

      const [propietarios, setPropietarios] = useState([]);

      useEffect(() => {
          if (!loading && data?.getPropietarios) {
              console.log(data.getPropietarios);
              setPropietarios(data?.getPropietarios);
          }
      }, [data]);
    
    
      const [crearCasa]= useMutation(createCasa);
    
      const [actualizarCasa] = useMutation(updateCasa);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        
        const num = parseInt(numero);
        const dim = parseInt(dimensiones);
        const ali = parseFloat(alicuota);
        const propId = propietarioId === 'Sin propietario' ? null : parseInt(propietarioId);
        if(casa){
          console.log("1")
          let id = casa.id
          actualizarCasa({variables:  {nombre, num, dim, estado, ali, propId, id} });
          window.alert("Casa actualizada con exito");
        }else{
          console.log("2")
          
          const condominioId = 1; //poner condo en el que se este trabajando
          crearCasa({variables: {nombre, num, dim, estado, ali, propId, condominioId}});
          window.alert("Casa registrada con exito");
        }
        
      }
    
      return (
        
        <div>
         
            <Form onSubmit={ handleSubmit } className="my-5">
    
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre</Form.Label>
                <Form.Control name="nombre" value={ nombre } onChange={ handleInputChange } type="text" placeholder="" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Numero</Form.Label>
                <Form.Control name="numero" value={ numero } onChange={ handleInputChange } type="number" placeholder="" />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Dimensiones (m2)</Form.Label>
                <Form.Control name="dimensiones" value={ dimensiones } onChange={ handleInputChange } type="number" min="0" placeholder="" />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Estado</Form.Label>
                <Form.Control name="estado" value={ estado } onChange={ handleInputChange } type="text"  />
              </Form.Group>
              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Alicuota</Form.Label>
                <Form.Control  name="alicuota" value={ alicuota } onChange={ handleInputChange } type="number" step="0.01" min="0" placeholder="" />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Propietario</Form.Label>
                <Form.Control as="select" name="propietarioId" value={ propietarioId } onChange={ handleInputChange } placeholder="">
                    <option value="">Sin propietario</option>
                    
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
