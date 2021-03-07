import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const deleteVisitante = gql `
  mutation DeleteVisitante($id: Int!) {
    deleteVisitante(id: $id) {
      id
    }
  }

`

export const AllGuestsRow = ({ visitante }) => {
    const [deleted, setDeleted] = useState(false);
    const [deleteGuest] = useMutation(deleteVisitante);

    const {id, nombre, apellido, cedula, fecha } = visitante;

    const handleDelete = (e) => {
        console.log(id)
        deleteGuest( {variables:  { id } });
        setDeleted(true);
    };

  return (
    <>
      {!deleted &&
      <tr className="text-center">
            <td>{ id }</td>
            <td>{ nombre }</td>
            <td>{ apellido }</td>
            <td>{ cedula }</td>
            <td>{ fecha }</td>
            <td>
              <NavLink to={`/condo/editGuest/${id}`}>  
                <i className="far fa-edit"></i>
              </NavLink>
            </td>
            <td><Button onClick={ handleDelete } variant="outline-danger" >Eliminar</Button></td>
      </tr>}
    </>
  )
}

