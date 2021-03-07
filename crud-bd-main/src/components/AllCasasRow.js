import React from 'react';
import { NavLink } from 'react-router-dom';

export const AllCasasRow = ({ casa }) => {

    const {id, nombre, numero, dimensiones, estado, alicuota, Propietario} = casa;

    return (
        <>
            <tr className="text-center">
                    <td>{ id }</td>
                    <td>{ nombre }</td>
                    <td>{ numero }</td>
                    <td>{ dimensiones }</td>
                    <td>{ estado }</td>
                    <td>{ alicuota }</td>
                    <td>{ Propietario?.nombre } { Propietario?.apellido }</td>
                    <td>
                    <NavLink to={`/condo/editCasa/${id}`}>  
                        <i className="far fa-edit"></i>
                    </NavLink>
                    </td>
            </tr>
        </>
    )
}
