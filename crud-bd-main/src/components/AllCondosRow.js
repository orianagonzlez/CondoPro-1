import React from 'react';

export const AllCondosRow = ({ condo }) => {

    console.log(condo);
    console.log(condo.admin);
    const {id, nombre, estado, ciudad, direccion, AdminId, Admin } = condo;

    return (
       
        <>
            <tr className="text-center">
                    <td>{ id }</td>
                    <td>{ nombre }</td>
                    <td>{ estado }</td>
                    <td>{ ciudad }</td>
                    <td>{ direccion }</td>
                    <td>{ Admin.nombre } { Admin.apellido }</td>
            </tr>
        </>
        
    )
}

