import { gql, useQuery, useLazyQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FactPenByCasaRow } from '../components/FactPenByCasaRow';
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





export const FactPenByCasa = () => {
    const { user } = useContext(AppContext);

    const [tableData, setTableData] = useState([]);

    const { loading, error, data, refetch } = useQuery(getCasasByCondoId, {
        variables: {condoId: user.condoID}
    });

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        console.log('cambie todos los props')
        let casas;
        if (!loading && data?.getCasasByCondoId) {
          
          console.log(casas,'Estas son las CASAS')
          setTableData(data?.getCasasByCondoId);

        }
      }, [data]);

      useEffect(() => {
        refetch()
      }, [])


    if (loading) return <p>Cargando casas</p>
    if (error) console.log('error', error);

    return (
        <Container className="mt-5">
            <h1>Lista de Propietarios por facturas pendientes </h1>
            <Table striped bordered hover className="mt-5">
                <thead>
                <tr className="text-center">
                    <th>#ID</th>
                    <th>Nombre</th>
                    <th>Numero</th>
                    <th>Propietario</th>
                    <th>#Facturas Pendientes</th>
                    <th>Detalles</th>
                </tr>
                </thead>
                <tbody>
                    {
                    tableData.map((casa, i) => (
                        <FactPenByCasaRow key={casa.id} casa={casa}/>
                    ))
                    }
                </tbody>
            </Table>


        </Container>
    )
}

