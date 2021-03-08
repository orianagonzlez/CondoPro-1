import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { AllFacturasRow } from '../components/AllFacturasRow';
import { Container, Table } from 'react-bootstrap';
import { PenFacturasRow } from '../components/PenFacturasRow';

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

//Aqui este pana deberia de traer la casa pero no le daba la gana no se porque y me arrche y la pedi aparte
const getFacturasPenByCasaId = gql`
    query GetFacturasPenByCasaId($CasaId: Int!)
    {
        getFacturasPenByCasaId(CasaId: $CasaId) {
            numero
            estado
            saldo
            fechaEmision
            fechaVenc
            CasaId
            id
        }
    }
`;

const getDeudaByCasaId = gql`
    query getDeudaByCasaId($CasaId: Int!)
    {
        getDeudaByCasaId(CasaId: $CasaId) {
          numero
      }
    }
   `; 


export const FacturasDeUnaCasa = () => {
  
  const { casaId } = useParams();

  const [casa, setCasa] = useState(null);

  const [tableData, setTableData ] = useState([]);

  const [deuda, setDeuda] = useState();

  const { loading, error, data } = useQuery(getCasa, {
        variables: { id: parseInt(casaId) }
    });

  const { loading: loadingFactura, error: errorFactura, data: dataFactura } = useQuery(getFacturasPenByCasaId, {
        variables: { CasaId: parseInt(casaId) }
    });

  const { loading: loadingDeuda, error: errorDeuda, data: dataDeuda } = useQuery(getDeudaByCasaId, {
        variables: { CasaId: parseInt(casaId) }
    });
  
   useEffect(() => {
        if (dataFactura?.getFacturasPenByCasaId) {
          
            setTableData(dataFactura?.getFacturasPenByCasaId);
            console.log(dataFactura.getFacturasPenByCasaId, "hola soy facturas");
        }

    }, [dataFactura])

      
   useEffect(() => {

        if (data?.getCasa) {

            setCasa(data.getCasa);
           
          }

    }, [data])

        
   useEffect(() => {

        if (dataDeuda?.getDeudaByCasaId) {
console.log(dataDeuda?.getDeudaByCasaId, "sos")
            setDeuda(dataDeuda?.getDeudaByCasaId.numero);
           console.log("soy la deuda ", deuda)
          }

    }, [dataDeuda])


    if (loading || (!casa) || loadingFactura || !deuda ) return <p>Cargando casa</p>
    if (errorFactura) console.log('error', error);


  return (
    <Container className= "mt-5">

      <h3>Facturas pendientes de la casa  #{ casa.id+ " - "+ casa.nombre}</h3>
      
      <Table striped bordered hover className="mt-5">
                <thead>
                <tr className="text-center">
                    <th># Factura</th>
                    <th>Estado</th>
                    <th>Fecha de emisión</th>
                    <th>Fecha de vencimiento</th>
                    <th>Saldo</th>
                    <th>Ver detalles</th>
                    
                </tr>
                </thead>
                <tbody>
                    {
                    tableData.map((fact, i) => (
                        <PenFacturasRow key={ i } factura ={ fact }/>
                    ))
                    }
                </tbody> 
            </Table>
            <h4>Monto total de la deuda: ${ parseFloat(deuda).toFixed(2) }</h4>
    </Container>
  )
}
