import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const getDetallesDePagos = gql`

    query getDetallesDePagos
    {
      getDetallesDePagos {
        id
        FacturaId
        InstrumentoDePagoId
        Factura{
          numero
        }
        InstrumentoDePago{
          numero
          fecha
          monto
          tipo
        }
      }
    }
`;

export const AllPagosRow = ({ pago }) => {

  const { id, FacturaId, InstrumentoDePagoId, Factura , InstrumentoDePago } = pago; 

  const { loading, error, data, refetch } = useQuery(getDetallesDePagos);

  return (
  <>
            <tr className="text-center">
                    <td>000{ Factura.numero }</td>
                    <td>{ InstrumentoDePago.numero }</td>
                    <td>{ InstrumentoDePago.fecha }</td>
                    <td>{ InstrumentoDePago.monto }</td>
                    <td>{ InstrumentoDePago.tipo }</td>
                    <td>
                    <NavLink to={`/condo/facturaDetail/${FacturaId}/${Factura.CasaId}`}>  
                        <i className="fas fa-arrow-circle-right"></i>
                    </NavLink>
                    </td>
            </tr>
  </>
  )
}