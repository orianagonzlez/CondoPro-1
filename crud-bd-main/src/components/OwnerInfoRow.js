import React, { useImperativeHandle } from 'react'
import { NavLink } from 'react-router-dom';
import {gql} from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Button } from 'react-bootstrap';

const deletePropietario = gql `
  mutation DeletePropietario($id: Int!) {
    deletePropietario(id: $id) {
      id
    }
  }

`

export const OwnerInfoRow = ({ owner }) => {

  const [deleteOwner] = useMutation(deletePropietario);

  const handleDelete = (e) => {
    console.log(id)
    deleteOwner( {variables:  { id } });
  }

  const {id, nombre, apellido, cedula, correo, telefono} = owner;
  return (
    <>
      <tr className="text-center">
            <td>{ id }</td>
            <td>{ nombre }</td>
            <td>{ apellido }</td>
            <td>{ cedula }</td>
            <td>{ telefono }</td>
            <td>{ correo }</td>
            <td>
              <NavLink to={`/condo/editOwner/${id}`}>  
                <i className="far fa-edit"></i>
              </NavLink>
            </td>
            <td><Button onClick={ handleDelete } variant="outline-danger" >Eliminar</Button></td>
      </tr>
    </>
  )
}
