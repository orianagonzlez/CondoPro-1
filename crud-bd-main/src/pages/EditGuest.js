import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { GuestForm } from '../components/GuestForm';

const getVisitante = gql`
    query GetVisitante($id: Int!)
    {
        getVisitante(id: $id) {
        id
        nombre
        apellido
        cedula
        fecha
        CasaId
        }
    }
`;

export const EditGuest = () => {
    console.log('si llegue')
    const { visitanteId } = useParams();

    const [visitante, setVisitante] = useState(null);

    const { loading, error, data } = useQuery(getVisitante, {
        variables: { id: parseInt(visitanteId) }
    });

    useEffect(() => {

        if (data?.getVisitante) {

            setVisitante(data.getVisitante);
        }

    }, [data])


    if (loading || (! visitante)) return <p>Cargando visitante</p>

    return (

    <Container className=" form-container my-5 ">
        <h1>Actualizar visitante</h1>
        <GuestForm visitante = { visitante } buttonText="Actualizar visitante"/>
    </Container>
    )
}
