import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { AllCondosRow } from '../components/AllCondosRow';
import { useHistory } from 'react-router';

const getCondominios = gql`
    {
        getCondominios {
        id
        nombre
        estado
        ciudad
        direccion
        AdminId 
        Admin {
            nombre
            apellido
        }
        
      }
    }
   `; 

export const AllCondos = () => {
    const [tableData, setTableData] = useState([]);
    console.log('tablaaa', tableData)

    const { loading, error, data, refetch } = useQuery(getCondominios);

    const history = useHistory();

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        console.log('cambie todos los props')
        if (!loading && data?.getCondominios) {
            
          setTableData(data?.getCondominios);
        }
      }, [data]);

    if (loading) return <p>Cargando condominios</p>
   if (error) console.log('error', error);

    return (
        <Container className="mt-5">
            <h1>Lista de condominios</h1>
            <div className="d-flex justify-content-around">
                <Button onClick={() => history.push('/condo/createCondo')} variant="outline-primary" className="my-5">Nuevo condominio</Button>
            </div>
            <Table striped bordered hover className="mt-5">
                <thead>
                <tr className="text-center">
                    <th>#ID</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Ciudad</th>
                    <th>Direccion</th>
                    <th>Administrador</th>
                </tr>
                </thead>
                <tbody>
                    {
                    tableData.map((condo, i) => (
                        <AllCondosRow key={condo.id} condo={condo}/>
                    ))
                    }
                </tbody>
            </Table>


        </Container>
    )
}

