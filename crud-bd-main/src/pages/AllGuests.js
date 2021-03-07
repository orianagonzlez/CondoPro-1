import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AllGuestsRow } from '../components/AllGuestsRow';
import { AppContext } from '../context/AppContext';

const getVisitantesByCasaId = gql`
    query GetVisitantesByCasaId($casaId: Int!)
    {
        getVisitantesByCasaId(casaId: $casaId) {
        id
        nombre
        apellido
        cedula
        fecha
      }
    }
   `; 

export const AllGuests = () => {
    const [tableData, setTableData] = useState([]);
    const history = useHistory();
    const { user } = useContext(AppContext);

    const { loading, error, data, refetch } = useQuery(getVisitantesByCasaId, {
        variables: {casaId: user.casaID}
    });

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (!loading && data?.getVisitantesByCasaId) {
          setTableData(data?.getVisitantesByCasaId);
        }
      }, [data]);

    if (loading) return <p>Cargando visitantes</p>
    if (error) console.log('error', error);

    return (
        <Container className="mt-5">
            <h1>Lista de visitantes</h1>
            <div className="d-flex justify-content-around">
            <Button onClick={() => history.push('/condo/registerGuest')} variant="outline-primary" className="my-5">Nuevo visitante</Button>
            
            </div>
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr className="text-center">
                    <th>#ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>CI</th>
                    <th>Fecha</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((visitante, i) => (
                        <AllGuestsRow key={visitante.cedula} visitante={visitante}/>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}
