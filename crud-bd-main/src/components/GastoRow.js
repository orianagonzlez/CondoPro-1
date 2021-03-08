import React from 'react'

export const GastoRow = ({gasto}) => {

  const {id, concepto, tipo, monto, CasaId } = gasto;
  
  return (
            <tr className="text-center">
                    <td>{ concepto }</td>
                    <td>{ tipo }</td>
                    <td>{ monto }</td>
                    <td>{ CasaId === null ? 'Todas' : CasaId }</td>
            </tr>
  )
}
