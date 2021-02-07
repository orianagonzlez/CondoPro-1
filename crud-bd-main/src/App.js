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


function App() {  
  return (

    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          
            <Route path="/ownerForm">
              <OwnerForm />
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
