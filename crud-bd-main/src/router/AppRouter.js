import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { NavBar } from '../components/Navbar';
import { NavBarUser } from '../components/NavbarUser';
import { OwnersInfo } from '../components/OwnersInfo';
import { UnloggedNav } from '../components/UnloggedNav';
import { AppContext } from '../context/AppContext';
import { adminLogin } from '../pages/adminLogin';
import { CreateCondo } from '../pages/CreateCondo';
import { CreateFactura } from '../pages/CreateFactura';
import { AllCasas } from '../pages/AllCasas';
import { CreateCasa } from '../pages/CreateCasa';
import { CreateOwner } from '../pages/CreateOwner';
import { DetallePago } from '../pages/DetallePago';
import { EditOwner } from '../pages/EditOwner';
import { Login } from '../pages/Login';
import { RegisterGuest } from '../pages/RegisterGuest';
import { ResumenDeudas } from '../pages/ResumenDeudas';
import { UserHome } from '../pages/UserHome';
import { AllCondos } from '../pages/AllCondos';
import { EditCasa } from '../pages/EditCasa';
import { AllGastos } from '../pages/AllGastos';
import { AllFacturas } from '../pages/AllFacturas';
import { FacturaDetail } from '../pages/FacturaDetail';
import { AllGuests } from '../pages/AllGuests';
import { EditGuest } from '../pages/EditGuest';



export const AppRouter = () => {
  
  const { user } = useContext(AppContext);
   
  if(!user){
    return <div>chamo espera</div>
  }

  // esto ya funcionaria pero como he ehcho el login del admin muevan estas variables para entrar a la parte que desean


  return (
    <>

    <div>
     <Router>
      {/* LA RUTAS ADMIN */}
      { ( user.isAdmin ) && (
        <div>
                 <NavBar/>
                 <Switch>

                          <Route exact path="/condo/createOwner" component={ CreateOwner } />
                          <Route exact path="/condo/editOwner/:ownerId" component={ EditOwner } />
                          <Route exact path="/condo/createCondo" component={ CreateCondo } />
                          <Route exact path="/condo/allCondos" component={ AllCondos } />
                          <Route exact path="/condo/createFactura" component={ CreateFactura } />
                          <Route exact path="/condo/resumenDeudas" component={ ResumenDeudas } />
                          <Route exact path="/condo/ownersInfo" component={ OwnersInfo } />
                          <Route exact path="/condo/createCasa" component={ CreateCasa } />
                          <Route exact path="/condo/facturaDetail/:facturaId/:casaId" component={ FacturaDetail } />
                          <Route exact path="/condo/editCasa/:casaId" component={ EditCasa } />
                          <Route exact path="/condo/AllFacturas" component={ AllFacturas } />
                          <Route exact path="/condo/allCasas" component={ AllCasas } />
                          <Route exact path="/condo/allGastos" component={ AllGastos } />

                      <Redirect to="/condo/ownersInfo" />
                  </Switch>
        </div>
       ) }

        {/* LAS RUTAS DEL PROPIETARIO */}
       { ( !user.isAdmin && user.isLogged ) &&
         (
        <div>
                 <NavBarUser/>
                 <Switch>

                          <Route exact path="/condo/userHome" component={ UserHome } />
                          <Route exact path="/condo/detallePago/:facturaId" component={ DetallePago } />
                          <Route exact path="/condo/registerGuest" component={ RegisterGuest } />
                          <Route exact path="/condo/editGuest/:visitanteId" component={ EditGuest } />
                          <Route exact path="/condo/allGuests" component={ AllGuests } />

                      <Redirect to="/condo/userHome" />
                  </Switch>
        </div>

       )}  

      {/* LAS RUTAS DE LOGIN */}
      {( !user.isLogged ) &&
         (
        <div>
                 <UnloggedNav/>
                 <Switch>
                          <Route exact path="/login" component={ Login } />
                          <Route exact path="/adminLogin" component={ adminLogin } />
                          
                      <Redirect to="/login" />
                  </Switch>
        </div>

       )}
      </Router>
    </div>






    </>
  )
}
