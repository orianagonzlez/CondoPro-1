import React from 'react'

export const OwnerInfoRow = ({ owner }) => {

  const {id, nombre, apellido, cedula, correo, telefono} = owner;
  return (
    <>
      <tr>
            <td>{ id }</td>
            <td>{ nombre }</td>
            <td>{ apellido }</td>
            <td>{ cedula }</td>
            <td>{ telefono }</td>
            <td>{ correo }</td>
      </tr>
    </>
  )
}
