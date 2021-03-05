import React, { useEffect, useState } from 'react'
import { Button, Container, Table, InputGroup, FormControl   } from 'react-bootstrap';
import { OwnerInfoRow } from './OwnerInfoRow';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router';

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

export const OwnersInfo = () => {
  const [ownerId, setOwnerId] = useState(0);
  const [tableData, setTableData] = useState([]);
  const history = useHistory();

  const [ formValues , handleInputChange, reset] = useForm({
    searchText: ''
  });

  const { searchText }= formValues;

   const { loading, error, data } = useQuery(getOwners);
   const { loading: loadingOwner, error: ownerError, data: owner } = useQuery(getOwner, {
     variables: { id: ownerId}
   });

  useEffect(() => {
    console.log('cambie todos los props')
    if (!loading && data?.getPropietarios) {

      setTableData(data?.getPropietarios);
    }
  }, [data]);

  useEffect(() => {
    console.log('cambie');
    if (ownerId && owner?.getPropietario) {
      console.log('soy true')
      setTableData([owner.getPropietario]);
    }
  }, [ownerId, owner]);

  const handleCleaning = () => {
    setTableData(data.getPropietarios)
  };

   console.log(owner);
   if (loading || loadingOwner) return <p>Cargando propietarios</p>
   if (error) console.log('error', error);

   console.log(data);

  return (
    <Container className="mt-5">
      <h1>Lista de propietarios</h1>
      <div className="d-flex justify-content-around">
        <Button onClick={() => history.push('/condo/createOwner')} variant="outline-primary" className="my-5">Nuevo propietario</Button>
        <Button onClick={ handleCleaning } variant="outline-primary" className="my-5">Limpiar filtro</Button>
      
      </div>
      <InputGroup className="mb-3">
        <FormControl
          name="searchText"
          value={searchText}
          onChange={handleInputChange}
          placeholder="ID del usuario"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={a => setOwnerId(parseInt(searchText))}>Buscar</Button>
        </InputGroup.Append>
      </InputGroup>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr className="text-center">
            <th>#ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>CI</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
            {
              tableData.map((owner, i) => (
                <OwnerInfoRow key={owner.cedula} owner={owner}/>
              ))
            }
        </tbody>
      </Table>


    </Container>
  )
}
