import React from 'react';

export const AllCondosRow = ({ condo }) => {

    console.log(condo)
    const {id, nombre, estado, ciudad, direccion, AdminId } = condo;

    return (
       
        <>
            <tr className="text-center">
                    <td>{ id }</td>
                    <td>{ nombre }</td>
                    <td>{ estado }</td>
                    <td>{ ciudad }</td>
                    <td>{ direccion }</td>
                    <td>{ AdminId }</td>
            </tr>
        </>
        
    )
}

