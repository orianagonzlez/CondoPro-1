import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { AllPagosRow } from '../components/AllFacturasRow';
import { Container, Table } from 'react-bootstrap';

// const getPagos = gql`
//     query GetPagos
//     {
//         GetPagos(id: $id) {
//         id
//         InstrumentoDePagoId
//         InstrumentoDePago{
//             numero
//             fecha
//             monto
//             tipo
//         }
//         FacturaId
//         Factura{
//             numero
//         }
//         }
//     }
// `;
// const getFactura



export const AllPagos = () => {

//   const [pagos, setPagos] = useState(null);

//   const [tableData, setTableData ] = useState([]);


//   const { loading, error, data } = useQuery(getPagos);

//   const { loading: loadingFactura, error: errorFactura, data: dataFactura } = useQuery(getFacturasPenByCasaId, {
//         variables: { CasaId: parseInt(casaId) }
//     });

//   const { loading: loadingDeuda, error: errorDeuda, data: dataDeuda } = useQuery(getDeudaByCasaId, {
//         variables: { CasaId: parseInt(casaId) }
//     });
  
//    useEffect(() => {  
        
//     console.log(dataFactura, "AGARRA PSSSSS");

//         if (dataFactura?.getFacturasPenByCasaId) {
          
//             setTableData(dataFactura?.getFacturasPenByCasaId);
            
//         }

//     }, [dataFactura])

      
//    useEffect(() => {

//         if (data?.getCasa) {

//             setCasa(data.getCasa);
           
//           }

//     }, [data])

        
//    useEffect(() => {

//         if (dataDeuda?.getDeudaByCasaId) {
// console.log(dataDeuda?.getDeudaByCasaId, "sos")
//             setDeuda(dataDeuda?.getDeudaByCasaId.numero);
//            console.log("soy la deuda ", deuda)
//           }

//     }, [dataDeuda])


//     if (loading || (!casa) || loadingFactura || !deuda ) return <p>Cargando casa</p>
//     if (errorFactura) console.log('error', error);


  return (
    <Container className= "mt-5">

      <h3>Facturas pendientes de la casa  </h3>
      {/* <h3>Facturas pendientes de la casa  #{ casa.id+ " - "+ casa.nombre}</h3> */}
      
      {/* <Table striped bordered hover className="mt-5">
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
            <h4>Monto total de la deuda: ${ parseFloat(deuda).toFixed(2) }</h4> */}
    </Container>
  )
}