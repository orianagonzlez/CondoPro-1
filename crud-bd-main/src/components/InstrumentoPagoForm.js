import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useForm } from '../hooks/useForm';


const createInstrumentoDePago = gql`
  mutation createInstrumentoDePago($num: Int!, $date: String!, $tipo: String!, $mon: Int!) {
    createInstrumentoDePago(numero: $num, fecha: $date, tipo: $tipo, monto: $mon, activo: true) {
        numero
        tipo
        fecha
        monto
      }
  }
`;

// const getFacturasByCasaId = gql`
//     {
//         getFacturasByCasaId(CasaId: $CasaId) {
//         id
//         numero
//         estado
//         fechaEmision
//         fechaVenc
//         saldo
//         CasaId
//       }
//     }
//    `;

export const InstrumentoDePagoForm = () => {

    const { user } = useContext(AppContext);

    const initialFormState = () => {
        let form;
        form = {
            numero: '',
            fecha: '',
            tipo: '',
            monto: '',
        };

        return form
    }

    const [formValues, handleInputChange, reset] = useForm(initialFormState());

    // const { loading, error, data } = useQuery(getFacturasByCasaId, {
    //     variables: { casaId: user.casaId }
    // });

    const { numero, fecha, tipo, monto } = formValues;

    const [facturas, setFacturas] = useState([]);

    // useEffect(() => {
    //     console.log('useEffect')
    //     if (!loading && data?.getFacturasByCasaId) {
    //         console.log(data.getFacturasByCasaId);
    //         setFacturas(data?.getFacturasByCasaId);
    //     }
    // }, [data]);

    const [crearInstrumentoDePago] = useMutation(createInstrumentoDePago);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);

        const num = parseInt(numero);
        const date = new Date(`${fecha}T00:00:00`).toDateString();
        const mon = parseInt(monto);

        crearInstrumentoDePago({ variables: { num, date, tipo, mon } });
        window.alert("Instrumento de Pago registrado con exito");
        reset();

    }

    return (

        <div>

            <Form onSubmit={handleSubmit} className="my-5">

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Numero</Form.Label>
                    <Form.Control name="numero" value={numero} onChange={handleInputChange} type="number" placeholder="" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control name="fecha" value={fecha} onChange={handleInputChange} type="date" placeholder="" />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control name="tipo" value={tipo} onChange={handleInputChange} type="text" placeholder="" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Monto ($)</Form.Label>
                    <Form.Control name="monto" value={monto} onChange={handleInputChange} type="number" />
                </Form.Group>

                {/* <Form.Group controlId="formBasicPassword">
                    <Form.Label>Factura a Pagar</Form.Label>
                    <Form.Control as="select" name="factura" value={FacturaId} onChange={handleInputChange} placeholder="">

                        {facturas.map(factura => (
                            <option key={factura.id} value={factura.id}>{factura.numero} {factura.estado} {factura.fechaEmision} {factura.fechaVenc} {factura.saldo}</option>
                        ))
                        }
                    </Form.Control>
                </Form.Group> */}


                <Button variant="dark" type="submit">
                    Crear instrumento de Pago
                </Button>
            </Form>
        </div>
    )
}