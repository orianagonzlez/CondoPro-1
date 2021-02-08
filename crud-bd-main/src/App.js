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
