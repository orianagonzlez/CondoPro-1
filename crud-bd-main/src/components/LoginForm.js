import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';



const getPropietarioByCI = gql`
query GetPropietarioByCI($CI: String!)
  {
    getPropietarioByCI(cedula: $CI) {
    id
    nombre
    apellido
    cedula
    correo
    telefono
    }
  }
`; 

export const LoginForm = ({buttonText}) => {

  const {setUser, user} = useContext(AppContext)

  const [loadingLogin, setLoadingLogin] = useState(false);

    const [ formValues , handleInputChange, reset] = useForm({
        CI: "",
        password: ""
    });

    const { CI, password }= formValues;

    const [getPropietario, { loading, error, data } ] = useLazyQuery( getPropietarioByCI, {
     variables: { CI: CI }
   });

   useEffect(() => {
   
    if( data && !loading && loadingLogin){
      
      if( data.getPropietarioByCI ){
        let userInfo = data.getPropietarioByCI
        console.log('hiciste login hay que cambiar el context y redirigir', data.getPropietarioByCI);
        setUser({
         ...user,
         isLogged: true,
         isAdmin: true, //poner cuando sea admin
         cedula: userInfo.cedula
        });

        
      }else if( data.getPropietarioByCI === null){
        console.log( 'Credenciales invalidas ');
        setLoadingLogin(false);
      }
    }

   }, [data, loading, loadingLogin])

    const handleSubmit = (e) => {
      e.preventDefault();
      getPropietario();
      setLoadingLogin(true);
    }

      return (
    
        <div>
         
            <Form className="my-5" onSubmit={ handleSubmit }>
            {/* <Form onSubmit={ handleSubmit } className="my-5"> */}
    
              <Form.Group controlId="formBasicEmail">
                <Form.Label>CI</Form.Label>
                <Form.Control name="CI" value={ CI } type="text" placeholder="" onChange={ handleInputChange }/>
                {/* <Form.Control name="nombre" value={ nombre } onChange={ handleInputChange } type="text" placeholder="" /> */}
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>ID de la casa</Form.Label>
                <Form.Control name="password" value={ password } type="text" placeholder="aun no sirve calma" onChange={ handleInputChange } />
                {/* <Form.Control name="apellido" value={ estado } onChange={ handleInputChange } type="text" placeholder="" /> */}
              </Form.Group>
    
              <Button variant="dark" type="submit">
               {buttonText}
              </Button>
            </Form>
        </div>
      )
}