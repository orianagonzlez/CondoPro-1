import React from 'react'

export const GastoRow = ({gasto, alicuota}) => {

  const {id, concepto, tipo, monto, CasaId } = gasto;
  
  return (
            <tr className="text-center">
                    <td>{ concepto }</td>
                    <td>{ tipo }</td>
                    <td>{ CasaId === null ? 'Todas' : "Gasto específico" }</td>
                    <td>{ monto }</td>
                    <td>{ monto*alicuota }</td>
                   
            </tr>
  )
}
