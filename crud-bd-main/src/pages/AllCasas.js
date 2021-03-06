import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AllCasasRow } from '../components/AllCasasRow';

const getCasas = gql`
    query GetCasas($condoId: Int!)
    {
        getCasas(condoId: $condoId) {
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

export const AllCasas = () => {
    const [tableData, setTableData] = useState([]);

    const { loading, error, data } = useQuery(getCasas, {
        variables: {condoId: 1}
    });

    const history = useHistory();

    useEffect(() => {
        console.log('cambie todos los props')
        if (!loading && data?.getCasas) {
    
          setTableData(data?.getCasas);
        }
      }, [data]);

    if (loading) return <p>Cargando casas</p>
    if (error) console.log('error', error);

    return (
        <Container className="mt-5">
            <h1>Lista de casas</h1>
            <div className="d-flex justify-content-around">
                <Button onClick={() => history.push('/condo/createCasa')} variant="outline-primary" className="my-5">Nueva casa</Button>
            </div>
            <Table striped bordered hover className="mt-5">
                <thead>
                <tr className="text-center">
                    <th>#ID</th>
                    <th>Nombre</th>
                    <th>Numero</th>
                    <th>Dimensiones (m2)</th>
                    <th>Estado</th>
                    <th>Alicuota</th>
                    <th>Propietario</th>
                    <th>Editar</th>
                </tr>
                </thead>
                <tbody>
                    {
                    tableData.map((casa, i) => (
                        <AllCasasRow key={casa.id} casa={casa}/>
                    ))
                    }
                </tbody>
            </Table>


        </Container>
    )
}

