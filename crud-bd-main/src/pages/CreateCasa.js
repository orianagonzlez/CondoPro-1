import React from 'react';
import { Container } from 'react-bootstrap';
import { CasaForm } from '../components/CasaForm';

export const CreateCasa = () => {
    return (
        <Container className="form-container my-5 ">
            <h1>Registrar Casa</h1>
            <CasaForm buttonText="Crear casa"/>
        </Container>
    )
}
