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

export const AllPagosRow = ({ casa }) => {

    const { id, nombre, numero, dimensiones, Propietario } = casa;

    const { loading, error, data, refetch } = useQuery(getDetallesDePagos);

    const [numFact, setNumFact] = useState();

    useEffect(() => {

        if (data?.getDetallesDePagos) {
            console.log(data?.getDetallesDePagos, "Aqui esta tu data");

            setNumFact(data.getDetallesDePagos.numero);

        }

    }, [data])

    if (loading) return <div>Cargando Pagos</div>
    if (error) console.log('error', error);

    return (
        <>
            <tr className="text-center">
                <td>000{Factura.numero}</td>
                <td>{InstrumentoDePago.numero}</td>
                <td>{InstrumentoDePago.fecha}</td>
                <td>{InstrumentoDePago.monto}</td>
                <td>{InstrumentoDePago.tipo}</td>
            </tr>
        </>
    )
}