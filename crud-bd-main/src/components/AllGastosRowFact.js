import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export const AllGastosRowFact = ({ gasto, gastos, setGastos }) => {
    
  const [inFact, setInFact] = useState(false);

  const {id, concepto, tipo, monto, Casa } = gasto;

  const handleGasto = () => {
    
    setInFact(!inFact);

    let myArray = []
    gastos.forEach(elem => {
      myArray.push(elem)
    });

    let numGastos = myArray.length;
    console.log(myArray.length, "por favor", inFact)
    
    if(!inFact){  
      console.log( "ENTRE 0")
      
      if(numGastos === 0){

        console.log( "ENTRE 1 por favor")
        setGastos([gasto]);
      }else{

        console.log( "ENTRE 2 por favor")
        setGastos([...gastos, gasto]);  
      }
    }else{
      
      console.log( "ENTRE 3 por favor");

      myArray = myArray.filter((myGasto) => myGasto.id !== gasto.id );

      console.log(myArray, "FILTRADO");

      setGastos(myArray);

    }

    console.log(gastos, "Estos son los gastos que tengo ")
  }

    return (
       
        <>
            <tr className="text-center">
                    <td>{ ( inFact ) && (<i className="fas fa-check"></i>) }</td>
                    <td>{ id }</td>
                    <td>{ concepto }</td>
                    <td>{ tipo }</td>
                    <td>{ monto }</td>
                    <td>{ Casa === null ? 'Todas' : `#${Casa.numero} ${Casa.nombre}` }</td>
                    <td>
                      { inFact === false ? ( 
                      <Button  onClick={handleGasto}    variant="outline-success" > Agregar </Button>) : 
                      (<Button  onClick={handleGasto}    variant="outline-danger" > Eliminar </Button>)}
                     </td>
            </tr>
        </>
        
    )
}
