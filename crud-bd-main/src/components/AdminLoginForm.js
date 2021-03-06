import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';


const getAdminByCI = gql`
query GetAdminByCI($CI: String!)
  {
   getAdminByCI(cedula: $CI ){
    id
    nombre
    apellido
    cedula
    correo
    telefono
  }
  }
`; 


export const AdminLoginForm = () => {
  
  const {setUser, user} = useContext(AppContext)

  const [loadingLogin, setLoadingLogin] = useState(false);

    const [ formValues , handleInputChange, reset] = useForm({
        CI: "",
    });

    const { CI }= formValues;

    const [getAdmin, { loading, error, data } ] = useLazyQuery( getAdminByCI, {
     variables: { CI: CI }
   });

   useEffect(() => {
  
    if( data && !loading && loadingLogin){
     
      if( data.getAdminByCI ){
        let userInfo = data.getAdminByCI
        console.log('hiciste login hay que cambiar el context y redirigir', data.getAdminByCI);
        setUser({
         ...user,
         isLogged: true,
         isAdmin: true,  //poner cuando sea admin
         cedula: userInfo.cedula
        });
        
      }else if( data.getPropietarioByCI == null){
        console.log( 'Credenciales invalidas ');
        setLoadingLogin(false);
      }
    }

   }, [data, loading, loadingLogin, user])

    const handleSubmit = (e) => {
      e.preventDefault();
      getAdmin();
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
    
    
              <Button variant="dark" type="submit" >
               Iniciar sesión
              </Button>
            </Form>
        </div>
  )
}
