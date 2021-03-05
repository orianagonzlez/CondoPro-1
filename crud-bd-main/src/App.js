import { NavBar } from "./components/Navbar";
import { NavBarUser } from "./components/NavbarUser";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


// import "bootswatch/dist/litera/bootstrap.min.css";
import { AppProvider } from "./context/AppContext";
import { AppRouter } from "./router/AppRouter";




function App() {

  return (
    <div>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </div>
  )
}

export default App;
