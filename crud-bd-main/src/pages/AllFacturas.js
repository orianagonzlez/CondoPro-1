import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { AllFacturasRow } from '../components/AllFacturasRow';

const getFacturas = gql`
    {
        getFacturas {
        numero
        estado
        fechaEmision
        fechaVenc
        saldo
        CasaId
        id
      }
    }
   `; 


export const AllFacturas = () => {
  
  const { loading, error, data } = useQuery(getFacturas);

  const [ tableData, setTableData ] = useState([]);

  useEffect(() => {
        
        if (!loading && data?.getFacturas) {
    
          setTableData(data?.getFacturas);
        }
      }, [data]);
  
  const history = useHistory();

   
   if (loading) return <p>Cargando Facturas</p>
   if (error) console.log('error', error);


  return (

          <Container className="mt-5">
            <h1>Lista de facturas</h1>
            <div className="d-flex justify-content-around">
                <Button 
                  onClick={() => history.push('/condo/createFactura')} 
                  variant="outline-primary" className="my-5">
                      Nueva Factura
                </Button>
            </div>

            <Table striped bordered hover className="mt-5">
                <thead>
                <tr className="text-center">
                    <th>#Numero Fact</th>
                    <th>Estado</th>
                    <th>Fecha de emisión</th>
                    <th>Fecha de vencimiento</th>
                    <th>Saldo</th>
                    <th>#Num de casa</th>
                    <th>Ver detalles</th>
                    
                </tr>
                </thead>
                <tbody>
                    {
                    tableData.map((fact, i) => (
                        <AllFacturasRow key={ fact.id } factura={ fact }/>
                    ))
                    }
                </tbody> 
            </Table>


        </Container>
  )
}
