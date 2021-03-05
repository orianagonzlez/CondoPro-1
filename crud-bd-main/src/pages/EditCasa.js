import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { CasaForm } from '../components/CasaForm';

const getCasa = gql`
    query GetCasa($id: Int!)
    {
        getCasa(id: $id) {
        id
        nombre
        numero
        dimensiones
        estado
        alicuota
        PropietarioId
        }
    }
`;

export const EditCasa = () => {
    const { casaId } = useParams();

    const [casa, setCasa] = useState(null);

    const { loading, error, data } = useQuery(getCasa, {
        variables: { id: parseInt(casaId) }
    });

    useEffect(() => {

        if (data?.getCasa) {

            setCasa(data.getCasa);
        }

    }, [data])


    if (loading || (! casa)) return <p>Cargando casa</p>

    return (

    <Container className=" ownerFormContainer my-5 ">
        <h1>Actualizar casa</h1>
        <CasaForm casa = { casa } buttonText="Actualizar casa"/>
    </Container>
    )
}