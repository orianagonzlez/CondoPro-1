import React, { useContext } from 'react';
import { useState } from 'react';
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
import { CreateOwner } from '../pages/CreateOwner';
import { DetallePago } from '../pages/DetallePago';
import { EditOwner } from '../pages/EditOwner';
import { Login } from '../pages/Login';
import { RegisterGuest } from '../pages/RegisterGuest';
import { ResumenDeudas } from '../pages/ResumenDeudas';
import { UserHome } from '../pages/UserHome';



export const AppRouter = () => {
  
  const { user } = useContext(AppContext);
   
  if(!user){
    return <div>chamo espera</div>
  }

  console.log(user)

  return (
    <>

    <div>
     <Router>

      { ( user.isLogged && user.isAdmin  ) && (
        <div>
                 <NavBar/>
                 <Switch>

                          <Route exact path="/condo/createOwner" component={ CreateOwner } />
                          <Route exact path="/condo/editOwner/:ownerId" component={ EditOwner } />
                          <Route exact path="/condo/createCondo" component={ CreateCondo } />
                          <Route exact path="/condo/createFactura" component={ CreateFactura } />
                          <Route exact path="/condo/resumenDeudas" component={ ResumenDeudas } />
                          <Route exact path="/condo/ownersInfo" component={ OwnersInfo } />

                      <Redirect to="/condo/ownersInfo" />
                  </Switch>
        </div>
       ) }


       { ( user.isLogged && !user.isAdmin ) &&
         (
        <div>
                 <NavBarUser/>
                 <Switch>

                          <Route exact path="/condo/userHome" component={ UserHome } />
                          <Route exact path="/condo/detallePago" component={ DetallePago } />
                          <Route exact path="/condo/registerGuest" component={ RegisterGuest } />
                          <Route exact path="/condo/registerGuest" component={ RegisterGuest } />


                      <Redirect to="/condo/userHome" />
                  </Switch>
        </div>

       )}  


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












    {/* <Router>
      <div>
        <Switch>

          <PrivateRoute 
              path="/condo"
              component={ AdminRouter }
              isAuthenticated={ true }         
          />

          <PublicRoute
              path="/login"
              component={ LoginRouter }
              isAuthenticated={ false }
          />


          <Redirect to="/login" />


        </Switch>
      </div>
    </Router> */}

    </>
  )
}
