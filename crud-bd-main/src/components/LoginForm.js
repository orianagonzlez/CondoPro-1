import { Form, Button } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';
import { gql } from 'apollo-boost';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
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

const getCasas = gql`
    {
        getCasas {
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

export const LoginForm = ({buttonText}) => {

  const {setUser, user} = useContext(AppContext)

  const [loadingLogin, setLoadingLogin] = useState(false);

  const [casas, setCasas] = useState([]);

  const [ formValues , handleInputChange, reset] = useForm({
        CI: "",
        casaId: ""
    });

  const { CI, casaId }= formValues;

  const [getPropietario, { loading, error, data } ] = useLazyQuery( getPropietarioByCI, {
     variables: { CI: CI }
   });

   const { loading: loadingCasas, error: errorCasas, data: dataCasas } = useQuery(getCasas);

   
   useEffect(() => {
     
    if (!loadingCasas && dataCasas) {
          
          setCasas(dataCasas.getCasas);
          }
      }, [dataCasas]);


   useEffect(() => {
   
    if( data && !loading && loadingLogin){
      
      if( data.getPropietarioByCI ){
        let userInfo = data.getPropietarioByCI;
        console.log('hiciste login hay que cambiar el context y redirigir', data.getPropietarioByCI);
        setUser({
         ...user,
         isLogged: true,
         casaID: casaId,
         cedula: userInfo.cedula
        });

        
      }else if( data.getPropietarioByCI === null){
        console.log( 'Credenciales invalidas ');
        setLoadingLogin(false);
      }
    }

   }, [data, loading, loadingLogin]);



    const handleSubmit = (e) => {
      e.preventDefault();

      getPropietario();
      setLoadingLogin(true);
    }

    if (loadingCasas) return <p>Cargando casas</p>
    if (errorCasas) console.log('error', error);

      return (
    
        <div>
         
            <Form className="my-5" onSubmit={ handleSubmit }>
           
    
              <Form.Group controlId="formBasicEmail">
                <Form.Label>CI</Form.Label>
                <Form.Control name="CI" value={ CI } type="text" placeholder="" onChange={ handleInputChange }/>
                
              </Form.Group>

              
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Propietario</Form.Label>
                <Form.Control as="select" name="casaId" value={ casaId } onChange={ handleInputChange } type="email" placeholder="">
                    <option>Seleccione su casa</option>
                    
                    {casas.map(casa => (
                        <option key={casa.id} value={casa.id}>ID:{casa.id} - {casa.nombre}</option>
                    ))
                    }
                </Form.Control>
              </Form.Group>
    
              <Button variant="dark" type="submit">
               {buttonText}
              </Button>
            </Form>
        </div>
      )
}