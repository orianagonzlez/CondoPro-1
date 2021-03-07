import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import {gql} from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const createVisitante = gql `
  mutation CreateVisitante($nombre: String!, $apellido: String!, $cedula: String!, $date: String!, $casaId: Int!) {
    createVisitante(nombre: $nombre, apellido: $apellido, cedula: $cedula, fecha: $date, CasaId: $casaId, activo: true) {
      id
      nombre
      apellido
    }
  }
`;

const updateVisitante = gql `
  mutation UpdateVisitante($nombre: String!, $apellido: String!, $cedula: String!, $date: String!, $id: Int!) {
    updateVisitante(nombre: $nombre, apellido: $apellido, cedula: $cedula, fecha: $date, id: $id) {
      id
      nombre
      apellido
    }
  }

`

export const GuestForm = ({visitante, buttonText}) => {
    const { user } = useContext(AppContext);

    const initialFormState = ( ) => {
        let form;
        if(visitante) {
          const date = new Date(visitante.fecha);
          console.log(date);

          let month = date.getMonth() + 1;
          month = month < 10 ? `0${month}` : month;
          let day = date.getDate();
          day = day < 10 ? `0${day}` : day;

          form = {
            nombre: visitante.nombre,
            apellido: visitante.apellido,
            cedula: visitante.cedula,
            fecha: `${date.getFullYear()}-${month}-${day}`,
          }
        } else {
          form = {
            nombre: '',
            apellido:'',
            cedula:'',
            fecha: '',
          }
        }
          
        return form
      }

      const [ formValues , handleInputChange, reset] = useForm( initialFormState());
      const { nombre, apellido, cedula, fecha }= formValues;

      const [crearVisitante]= useMutation(createVisitante);

      const [updateGuest] = useMutation(updateVisitante);

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);

        const date = new Date(`${fecha}T00:00:00`).toDateString();
        console.log(new Date(`${fecha}T00:00:00`));
        console.log(new Date(`${fecha}T00:00:00`).toDateString());
        
        
        if(visitante){
          let id = visitante.id
          updateGuest({variables:  {nombre, apellido, cedula, date, id} });
          window.alert("Visitante actualizado con exito");
        }else{
          const casaId = user.casaID;
          
          crearVisitante({variables: {nombre, apellido, cedula, date, casaId}});
          window.alert("Visitante registrado con exito");
        }
        
      }

      return (
    
        <div>
     
        <Form onSubmit={ handleSubmit } className="my-5">

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={ nombre } onChange={ handleInputChange } type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Apellido</Form.Label>
            <Form.Control name="apellido" value={ apellido } onChange={ handleInputChange } type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>CI</Form.Label>
            <Form.Control name="cedula" value={ cedula } onChange={ handleInputChange } type="text"  />
          </Form.Group>
          
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Fecha</Form.Label>
            <Form.Control  name="fecha" value={ fecha } onChange={ handleInputChange } type="date" placeholder="" />
          </Form.Group>

          <Button variant="dark" type="submit">
           {buttonText}
          </Button>
        </Form>
    </div>
      )
}