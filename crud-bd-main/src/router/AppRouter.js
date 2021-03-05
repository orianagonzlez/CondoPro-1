import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { NavBarUser } from '../components/NavbarUser';
import { OwnersInfo } from '../components/OwnersInfo';
import { DetallePago } from '../pages/DetallePago';
import { Login } from '../pages/Login';
import { RegisterGuest } from '../pages/RegisterGuest';
import { UserHome } from '../pages/UserHome';


export const AppRouter = () => {
  
  return (
    <>
      <div className="App">
        <Router>
          <NavBarUser />

          <Switch>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/registerGuest">
              <RegisterGuest />
            </Route>

            <Route path="/userHome">
              <UserHome />
            </Route>

            <Route path="/detallePago">
              <DetallePago />
            </Route>

            <Route path="/">
              <OwnersInfo />
            </Route>

            <Redirect to="/" />

          </Switch>
        </Router>
      </div>
    </>
  )
}
