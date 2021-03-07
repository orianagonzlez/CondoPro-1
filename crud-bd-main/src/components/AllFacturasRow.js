import React from 'react'
import { NavLink } from 'react-router-dom';

export const AllFacturasRow = ({ factura }) => {
  console.log(factura)

  const { id, numero, estado, fechaEmision ,fechaVenc , saldo, CasaId } = factura; 

  let fechaEmi = new Date(fechaEmision);
  fechaEmi = fechaEmi.toLocaleDateString();

  let fechaVen = new Date(fechaVenc);
  fechaVen = fechaVen.toLocaleDateString();

  return (
  <>
            <tr className="text-center">
                    <td>000{ numero }</td>
                    <td>{ estado }</td>
                    <td>{ fechaEmi }</td>
                    <td>{ fechaVen }</td>
                    <td>{ saldo }</td>
                    <td>{ CasaId }</td>
                    <td>
                    <NavLink to={`/condo/facturaDetail/${id}`}>  
                        <i className="far fa-edit"></i>
                    </NavLink>
                    </td>
            </tr>
  </>
  )
}
