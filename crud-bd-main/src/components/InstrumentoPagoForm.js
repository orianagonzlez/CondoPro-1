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
            tipo
        }
    }
`;

const updateFactura = gql`
    mutation updateFactura ($Fnumero: Int!, $Festado: String!, $FfechaEmision: String!, $FfechaVenc: String!, $resta: Int!, $FCasaId: Int!, $Fid: Int!) {
        updateFactura(numero: $Fnumero, estado: $Festado, fechaEmision: $FfechaEmision, fechaVenc: $FfechaVenc, saldo: $resta, CasaId: $FCasaId, id: $Fid) {
            id
            estado
            CasaId
        }
    }

   `;

export const InstrumentoDePagoForm = ({ factura }) => {

    const { user } = useContext(AppContext);

    if (factura){
        console.log("Hay Factura");
    }else{
        console.log("No Hay Factura");
    }

    const initialFormState = () => {
        console.log(factura);

        let form;
        form = {
            numero: '',
            fecha: '',
            tipo: '',
            monto: '',
            Fnumero: factura.numero,
            Festado: factura.estado,
            FfechaEmision: factura.fechaEmision,
            FfechaVenc: factura.fechaVenc,
            Fsaldo: factura.saldo,
            FCasaId: factura.CasaId,
            Fid: factura.id
        };

        return form
    }

    const [formValues, handleInputChange, reset] = useForm(initialFormState());

    const { numero, fecha, tipo, monto, Fnumero, Festado, FfechaEmision, FfechaVenc, Fsaldo, FCasaId } = formValues;

    const [crearInstrumentoDePago] = useMutation(createInstrumentoDePago);
    const [cambiarSaldoFactura] = useMutation(updateFactura);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);

        const num = parseInt(numero);
        const date = new Date(`${fecha}T00:00:00`).toDateString();
        const mon = parseInt(monto);
        const resta = Fsaldo - mon;

        crearInstrumentoDePago({ variables: { num, date, tipo, mon } });
        window.alert("Instrumento de Pago registrado con exito");
        let Fid = factura.id
        cambiarSaldoFactura({variables: {Fnumero, Festado, FfechaEmision, FfechaVenc, resta, FCasaId, Fid}})
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

                <Button variant="dark" type="submit">
                    Crear instrumento de Pago
                </Button>
            </Form>
        </div>
    )
}