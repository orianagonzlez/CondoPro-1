import { gql, useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { AllGastosRow } from '../components/AllGastosRow';
import { GastoForm } from '../components/GastoForm';
import { AppContext } from '../context/AppContext';

const getGastos = gql`
    query GetGastosByCondoId($condoId: Int!)
    {
        getGastosByCondoId(condoId: $condoId) {
        id
        concepto
        tipo
        monto
        CasaId
      }
    }
   `;

export const AllGastos = () => {
    const { user } = useContext(AppContext);

    const [tableData, setTableData] = useState([]);

    const { loading, error, data } = useQuery(getGastos, {
        variables: {condoId: user.condoID}
    });

    useEffect(() => {
        console.log('cambie todos los props')
        console.log(data);
        if (!loading && data?.getGastosByCondoId) {
            console.log(data.getGastosByCondoId)
          setTableData(data?.getGastosByCondoId);
        }
      }, [data]);

    if (error) console.log('error', error);

    return (
        <Container className="mt-5">
            <Row className="w-100">
                <Col xs={12} md={4}>
                    <h2>Crear gasto</h2>
                    <GastoForm/>
                </Col>
                <Col>
                    <h2>Lista de gastos</h2>
                    
                    <Table striped bordered hover className="mt-5">
                        <thead>
                        <tr className="text-center">
                            <th>#ID</th>
                            <th>Concepto</th>
                            <th>Tipo</th>
                            <th>Monto ($)</th>
                            <th>Casa</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                            tableData.map((gasto, i) => (
                                <AllGastosRow key={gasto.id} gasto={gasto}/>
                            ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
