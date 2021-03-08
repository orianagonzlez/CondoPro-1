import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const getNumFacturas = gql`
    query GetNumFacturasPenByCasaId($CasaId: Int!)
    {
        getNumFacturasPenByCasaId(CasaId: $CasaId) {
          numero
        }
    }
`;


export const FactPenByCasaRow = ({ casa }) => {

    const {id, nombre, numero, dimensiones, Propietario} = casa;
  
    const { loading, error, data, refetch } = useQuery(getNumFacturas, {
        variables: {CasaId: parseInt(id)}
    });


    const [numFact, setNumFact] = useState();

    useEffect(() => {
        
        if (data?.getNumFacturasPenByCasaId) {
           console.log(data?.getNumFacturasPenByCasaId, "Aqui esta tu data");
           
            setNumFact(data.getNumFacturasPenByCasaId.numero);

        }

    }, [data])

    
    
    if (loading  ) return <div>Cargando Facturas</div>
    if (error  ) console.log('error', error);
    //console.log(data.getNumFacturasPenByCasaId.numero)

    return (
        <>
            <tr className="text-center">
                    <td>{ id }</td>
                    <td>{ nombre }</td>
                    <td>{ numero }</td>
                    <td>{ Propietario?.nombre } { Propietario?.apellido }</td>
                    <td> { numFact }</td>
                    <td><NavLink to={ `/condo/facturasPen/${id}` }>  
                        <i className="fas fa-arrow-circle-right"></i>
                    </NavLink></td>            
                    
            </tr>
        </>
    )
}
