import React from 'react';

export const AllGastosRow = ({ gasto }) => {
    console.log(gasto)
    const {id, concepto, tipo, monto, Casa } = gasto;

    return (
       
        <>
            <tr className="text-center">
                    <td>{ id }</td>
                    <td>{ concepto }</td>
                    <td>{ tipo }</td>
                    <td>{ monto }</td>
                    <td>{ Casa === null ? 'Todas' : `#${Casa.numero} ${Casa.nombre}` }</td>
            </tr>
        </>
        
    )
}
