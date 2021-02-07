import { Form, Button, Container  } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import {gql} from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const createPropietario = gql `
  mutation CreatePropietario($nombre: String!, $apellido: String!, $cedula: String!, $correo: String!, $telefono: String!) {
    createPropietario(nombre: $nombre, apellido: $apellido, cedula: $cedula, correo: $correo, telefono: $telefono, activo: true) {
      id
      nombre
      apellido
    }
  }
`

export const OwnerForm = () => {
  
  
    const [ formValues , handleInputChange, reset] = useForm({
    nombre: '',
    apellido:'',
    cedula:'',
    telefono: '',
    correo: '',
  });
  
  const { nombre, apellido, cedula, telefono,  correo }= formValues;

  const [createMessage]= useMutation(createPropietario);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);

    createMessage({variables: {nombre, apellido, cedula, correo, telefono}});
  }

  return (
    
    <div>
      <Container className=" ownerFormContainer my-5 ">
        <h1>Registro de propietario</h1>
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
            <Form.Label>Telefono</Form.Label>
            <Form.Control  name="telefono" value={ telefono } onChange={ handleInputChange } type="text" placeholder="" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Correo</Form.Label>
            <Form.Control name="correo" value={ correo } onChange={ handleInputChange } type="email" placeholder="" />
          </Form.Group>


          <Button variant="dark" type="submit">
           Crear nuevo propietario
          </Button>
        </Form>
    </Container>
    </div>
  )
}
