import React from 'react';
import { NavLink } from 'react-router-dom';

export const AllFacturasRowUser = ({ factura }) => {

    const { id, numero, estado, fechaEmision, fechaVenc, saldo, CasaId } = factura;

    return (
        <>
            <tr className="text-center">
                <td>{id}</td>
                <td>{numero}</td>
                <td>{estado}</td>
                <td>{fechaEmision}</td>
                <td>{fechaVenc}</td>
                <td>{saldo}</td>
                <td>{CasaId}</td>
                <td>
                    <NavLink to={`/condo/detallePago/${id}`}>
                        <i className="far fa-edit"></i>
                    </NavLink>
                </td>
            </tr>
        </>
    )
}