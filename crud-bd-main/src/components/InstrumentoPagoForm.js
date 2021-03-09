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
            id
        }
    }
`;

const createPago = gql`
    mutation createPago($Fid: Int!, $numPago: Int!) {
        createPago(FacturaId: $Fid, InstrumentoDePagoId: $numPago) {
            FacturaId
            InstrumentoDePagoId
        }
    }
`;

const updateFactura = gql`
    mutation updateFactura ($Fnumero: Int!, $estadoFinal: String!, $FfechaEmision: String!, $FfechaVenc: String!, $resta: Float!, $FCasaId: Int!, $Fid: Int!) {
        updateFactura(numero: $Fnumero, estado: $estadoFinal, fechaEmision: $FfechaEmision, fechaVenc: $FfechaVenc, saldo: $resta, CasaId: $FCasaId, id: $Fid) {
            id
            estado
            CasaId
        }
    }

   `;

export const InstrumentoDePagoForm = ({ factura }) => {

    const { user } = useContext(AppContext);

    if (factura) {
        console.log("Hay Factura");
    } else {
        console.log("No Hay Factura");
    }

    const initialFormState = () => {
        console.log(factura);

        let form;
        form = {
            numero: '',
            fecha: new Date().toLocaleDateString(),
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
    const [crearPago] = useMutation(createPago);

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(formValues);

        const num = parseInt(numero);
        const date = new Date().toDateString();
        const mon = parseInt(monto);
        let resta = Fsaldo - mon;
        let estadoFinal = Festado;
        let Fid = factura.id;

        if (resta < 0) {

            window.alert("ERROR!\nEl monto que está pagando es mayor al monto que debe, por favor ingrese la cantidad exacta o un monto menor.");

        } else if (resta === 0) {

            estadoFinal = "Pagada";
            let resp = await crearInstrumentoDePago({ variables: { num, date, tipo, mon } });
            let numPago = resp.data.createInstrumentoDePago.id

            
            crearPago({variables: { Fid, numPago }});

            cambiarSaldoFactura({ variables: { Fnumero, estadoFinal, FfechaEmision, FfechaVenc, resta, FCasaId, Fid } });
            window.alert("Instrumento de Pago registrado con exito");
            reset();

        } else {

            let resp = await crearInstrumentoDePago({ variables: { num, date, tipo, mon } });
            //console.log(resp, "AQUI VIENE EL ID ");
            let numPago = resp.data.createInstrumentoDePago.id
            crearPago({variables: { Fid, numPago }});
            console.log(numPago, 'ESTE ES EL NUMERO DEL PAGO');
            cambiarSaldoFactura({ variables: { Fnumero, estadoFinal, FfechaEmision, FfechaVenc, resta, FCasaId, Fid } });
            window.alert("Instrumento de Pago registrado con exito");
            reset();

        }

    }


    return (

        <div>

            <Form onSubmit={handleSubmit} className="my-5">

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Numero de referencia </Form.Label>
                    <Form.Control name="numero" value={numero} onChange={handleInputChange} type="number" placeholder="" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control name="fecha" value={fecha} onChange={handleInputChange} type="text" placeholder="" disabled />
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