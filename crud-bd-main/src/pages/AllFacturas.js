import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { AllFacturasRow } from '../components/AllFacturasRow';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const getFacturasByCondoId = gql`
query GetFacturasByCondoId($condoId: Int!)
{
    getFacturasByCondoId(condoId: $condoId) {
      numero
      estado
      fechaEmision
      fechaVenc
      saldo
      CasaId
      Casa {
        numero
        nombre
      }
      id
  }
}
`;


export const AllFacturas = () => {
  const { user } = useContext(AppContext);
  
  const { loading, error, data, refetch } = useQuery(getFacturasByCondoId, {
    variables: { condoId: user.condoID}
  });

  const [ tableData, setTableData ] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
        
        if (!loading && data?.getFacturasByCondoId) {
    
          setTableData(data?.getFacturasByCondoId);
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
                    <th># Factura</th>
                    <th>Estado</th>
                    <th>Fecha de emisión</th>
                    <th>Fecha de vencimiento</th>
                    <th>Saldo</th>
                    <th>Casa</th>
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
