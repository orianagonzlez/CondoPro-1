import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { gql } from 'apollo-boost';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
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

const getCondominios = gql`
    {
        getCondominios {
        id
        nombre
        estado
        ciudad
        direccion
        AdminId
      }
    }
   `; 


export const AdminLoginForm = () => {
  
  const {setUser, user} = useContext(AppContext)

  const [loadingLogin, setLoadingLogin] = useState(false);

  const [condominios, setCondominios] = useState([]);

    const [ formValues , handleInputChange, reset] = useForm({
        CI: "",
        condoId: ""
    });

    const { CI, condoId }= formValues;

    const [getAdmin, { loading, error, data } ] = useLazyQuery( getAdminByCI, {
     variables: { CI: CI }
   });

    const { loadin: loadingCondo, error: errorCondo, data: dataCondo } = useQuery(getCondominios);

   useEffect(() => {
  
    if( data && !loading && loadingLogin){
     
      if( data.getAdminByCI && condoId !== ""){
        
        let userInfo = data.getAdminByCI
        let myCondo = condominios.filter( (condo) => condo.id === parseInt(condoId) && condo.AdminId === userInfo.id )
        
        if(myCondo.length>0){
            console.log('hiciste login hay que cambiar el context y redirigir', data.getAdminByCI);
            setUser({
            ...user,
            id: userInfo.id,
            isLogged: true,
            isAdmin: true,  
            cedula: userInfo.cedula,
            condoID: parseInt(condoId)
            });
        }else{
           console.log( 'Credenciales invalidas ');
        }


        
      }else if( data.getPropietarioByCI == null){
        console.log( 'Credenciales invalidas ');
        setLoadingLogin(false);
      }
    }

   }, [data, loading, loadingLogin, user]);

   useEffect(() => {
    if (!loadingCondo && dataCondo) {
          console.log(dataCondo.getCondominios)
          setCondominios(dataCondo.getCondominios);
          }
   }, [dataCondo])

    const handleSubmit = (e) => {
      e.preventDefault();
      getAdmin();
      setLoadingLogin(true);
    }

    
    if (loadingCondo) return <p>Cargando condominios</p>
    if (errorCondo) console.log('error', errorCondo);

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
                <Form.Label>Condominio</Form.Label>
                <Form.Control as="select" name="condoId" value={ condoId } onChange={ handleInputChange } type="email" placeholder="">
                    <option>Seleccione el condominio</option>
                    
                    {condominios.map(condo => (
                        <option key={condo.id} value={condo.id}> {condo.nombre}</option>
                    ))
                    }
                </Form.Control>
              </Form.Group>
    
              <Button variant="dark" type="submit" >
               Iniciar sesión
              </Button>
            </Form>
        </div>
  )
}
