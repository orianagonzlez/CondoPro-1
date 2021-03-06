import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useForm } from '../hooks/useForm';

const createGasto = gql `
  mutation CreateGasto($concepto: String!, $tipo: String!, $mon: Int!, $condoId: Int!, $casId: Int) {
    createGasto(concepto: $concepto, tipo: $tipo, monto: $mon, CondominioId: $condoId, CasaId: $casId, activo: true) {
      id
      concepto
      tipo
    }
  }
`;

const getCasasByCondoId = gql`
    query GetCasasByCondoId($condoId: Int!)
    {
        getCasasByCondoId(condoId: $condoId) {
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

export const GastoForm = () => {
    const { user } = useContext(AppContext);

    const initialFormState = ( ) => {
    let form;
    form = {
        concepto: '',
        tipo:'',
        monto:'',
        atribuido: 'condominio',
        casaId: ''
    };

    return form
    }

    const [ formValues , handleInputChange, reset] = useForm( initialFormState());

    const { loading, error, data } = useQuery(getCasasByCondoId, {
        variables: { condoId: user.condoID}
    });

    const { concepto, tipo, monto, atribuido, casaId }= formValues;

    const [casas, setCasas] = useState([]);

    useEffect(() => {
        console.log('cambie todos los props')
        if (!loading && data?.getCasasByCondoId) {
    
          setCasas(data?.getCasasByCondoId);
        }
      }, [data]);

    const [crearGasto] = useMutation(createGasto);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);

        const mon = parseInt(monto);
        const condoId = user.condoID;
        const casId = atribuido === 'casa' ? parseInt(casaId) : null;

        crearGasto({variables: {concepto, tipo, mon, condoId, casId}});
        window.alert("Gasto registrado con exito");
        reset();
        
    }

    return (

        <div>
            
            <Form onSubmit={ handleSubmit } className="my-5">

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Concepto</Form.Label>
                <Form.Control name="concepto" value={ concepto } onChange={ handleInputChange } type="text" placeholder="" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                <Form.Label>Tipo</Form.Label>
                <Form.Control name="tipo" value={ tipo } onChange={ handleInputChange } type="text" placeholder="" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                <Form.Label>Monto ($)</Form.Label>
                <Form.Control name="monto" value={ monto } onChange={ handleInputChange } type="number"  />
                </Form.Group>
                
                <Form.Group controlId="formBasicPassword">
                <Form.Label>Atribuido a</Form.Label>
                <Form.Control  as="select" name="atribuido" value={ atribuido } onChange={ handleInputChange } placeholder="">
                    <option value="condominio">Condominio</option>
                    <option value="casa">Casa</option>
                </Form.Control>
                </Form.Group>

               { atribuido === "casa" && 
                <Form.Group controlId="formBasicPassword">
                <Form.Label>Casa</Form.Label>
                <Form.Control as="select" name="casaId" value={ casaId } onChange={ handleInputChange } placeholder="">
                    <option value="">Seleccione la casa</option>
                    
                    {casas.map(casa => (
                        <option key={casa.id} value={casa.id}>#{casa.numero} {casa.nombre} </option>
                    ))
                    }
                </Form.Control>
                </Form.Group>}

                <Button variant="dark" type="submit">
                Crear gasto
                </Button>
            </Form>
        </div>
    )
}