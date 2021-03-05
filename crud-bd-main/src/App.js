import { NavBar } from "./components/Navbar";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { OwnerForm } from "./components/OwnerForm";
import { OwnersInfo } from "./components/OwnersInfo";
import { CreateOwner } from "./pages/CreateOwner";
import { EditOwner } from "./pages/EditOwner";
import { RegisterGuest } from "./pages/RegisterGuest";
import { CreateCondo } from "./pages/CreateCondo";
import { CreateFactura } from "./pages/CreateFactura";
import { ResumenDeudas } from "./pages/ResumenDeudas";
import { UserHome } from "./pages/UserHome";
import { DetallePago } from "./pages/DetallePago";
import { AllCondos } from "./pages/AllCondos";


function App() {  
  
  return (

    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          
            <Route path="/createOwner">
              <CreateOwner />
            </Route>
            
            <Route path="/editOwner/:ownerId">
              <EditOwner />
            </Route>

            <Route path="/registerGuest">
              <RegisterGuest />
            </Route>

            <Route path="/createCondo">
              <CreateCondo />
            </Route>

            <Route path="/allCondos">
              <AllCondos/>
            </Route>

            <Route path="/createFactura">
              <CreateFactura />
            </Route>

            <Route path="/resumenDeudas">
              <ResumenDeudas />
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

  );
}

export default App;
