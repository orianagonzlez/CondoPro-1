import React, { useEffect, useState } from 'react'
import { OwnerForm } from '../components/OwnerForm'
import {  Container  } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';


const getOwner = gql`
    query GetOwner($id: Int!)
      {
        getPropietario(id: $id) {
        id
        nombre
        apellido
        cedula
        correo
        telefono
        }
      }
  `; 

export const EditOwner = () => {
  
  const { ownerId } = useParams();

  const [owner, setOwner] = useState(null);

  const { loading: loadingOwner, error: ownerError, data: ownerData } = useQuery(getOwner, {
     variables: { id: parseInt(ownerId) }
   });

  useEffect(() => {


    if (ownerData?.getPropietario) {

      setOwner(ownerData.getPropietario);
    }


  }, [ownerData])
  

  if (loadingOwner || (! owner)) return <p>Cargando propietarios</p>

  return (
    
    <Container className=" ownerFormContainer my-5 ">
      <h1>Actualizar propietario</h1>
      <OwnerForm owner = { owner } buttonText="Actualizar propietario"/>
    </Container>
  )
}
