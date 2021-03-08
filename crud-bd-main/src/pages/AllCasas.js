import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AllCasasRow } from '../components/AllCasasRow';
import { AppContext } from '../context/AppContext';

const getCasasByCondoId = gql`
    query GetCasasByCondoId($condoId: Int!)
    {
        getCasasByCondoId(condoId: $condoId) {
        id
        nombre
        numero
        dimensiones
        estado
        alicuota
        PropietarioId
        Propietario {
            nombre
            apellido
        }
      }
    }
   `;

export const AllCasas = () => {
    const { user } = useContext(AppContext);

    const [tableData, setTableData] = useState([]);

    const { loading, error, data, refetch } = useQuery(getCasasByCondoId, {
        variables: {condoId: user.condoID}
    });

    const history = useHistory();

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        console.log('cambie todos los props')
        if (!loading && data?.getCasasByCondoId) {
    
          setTableData(data?.getCasasByCondoId);
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
                    <th>Alicuota (%)</th>
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

