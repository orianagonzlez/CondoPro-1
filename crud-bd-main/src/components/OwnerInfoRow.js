import React from 'react'
import { NavLink } from 'react-router-dom';

export const OwnerInfoRow = ({ owner }) => {

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
              <NavLink to={`/editOwner/${id}`}>  
                <i className="far fa-edit"></i>
              </NavLink>
            </td>
            <td><i className="far fa-trash-alt"></i></td>
      </tr>
    </>
  )
}
