import { NavBar } from "./components/Navbar";
import { NavBarUser } from "./components/NavbarUser";
import React, { useState } from "react";
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

import { Login } from "./pages/Login";

// import "bootswatch/dist/litera/bootstrap.min.css";
import { AppProvider } from "./context/AppContext";
import { AppRouter } from "./router/AppRouter";
import { CreateCasa } from "./pages/CreateCasa";
import { AllCasas } from "./pages/AllCasas";



function App() {




  <div className="App">
    <Router>
      <NavBar />
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
          <AllCondos />
        </Route>

        {/* <Route path="/createCasas">
          <CreateCasa />
        </Route>

        <Route path="/allCasas">
          <AllCasas />
        </Route> */}

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
  return (
    <div>
      <AppProvider>
        <AppRouter />
      </AppProvider>

    </div>
  )

  // const admin = true;

  // if (admin) {
  //   return (
  // <div className="App">
  //   <Router>
  //     <NavBar />
  //     <Switch>

  //       <Route path="/login">
  //         <Login />
  //       </Route>

  //       <Route path="/createOwner">
  //         <CreateOwner />
  //       </Route>

  //       <Route path="/editOwner/:ownerId">
  //         <EditOwner />
  //       </Route>

  //       <Route path="/createCondo">
  //         <CreateCondo />
  //       </Route>

  //       <Route path="/createFactura">
  //         <CreateFactura />
  //       </Route>

  //       <Route path="/resumenDeudas">
  //         <ResumenDeudas />
  //       </Route>

  //       <Route path="/">
  //         <OwnersInfo />
  //       </Route>

  //       <Redirect to="/" />

  //     </Switch>
  //   </Router>
  // </div>

  //   )
  // } else {
  //   return (

  //     <div className="App">
  //       <Router>
  //         <NavBarUser />

  //         <Switch>
  //           <Route path="/login">
  //             <Login />
  //           </Route>

  //           <Route path="/registerGuest">
  //             <RegisterGuest />
  //           </Route>

  //           <Route path="/userHome">
  //             <UserHome />
  //           </Route>

  //           <Route path="/detallePago">
  //             <DetallePago />
  //           </Route>

  //           <Route path="/">
  //             <OwnersInfo />
  //           </Route>

  //           <Redirect to="/" />

  //         </Switch>
  //       </Router>
  //     </div>
  //   )
  // };
}

export default App;
