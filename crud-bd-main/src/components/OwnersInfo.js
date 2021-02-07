import React from 'react'
import { Form, Button, Container, Table   } from 'react-bootstrap';
import { OwnerInfoRow } from './OwnerInfoRow';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

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

export const OwnersInfo = () => {
  
   const { loading, error, data } = useQuery(getOwners);

   if (loading) return <p>Cargando propietarios</p>
   if (error) console.log('error', error);

   console.log(data);
  
  return (
    <Container className="mt-5">
      <h1>Lista de propietarios</h1>
      <Button href="/ownerForm" variant="outline-primary" className="mt-5">Nuevo propietario</Button>
      
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>CI</th>
            <th>Telefono</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
            {
              data.getPropietarios.map((owner) => (
                <OwnerInfoRow key={owner.cedula} owner={owner}/>
              ))
            }
        </tbody>
      </Table>


    </Container>
  )
}
