import React from 'react'
import { Link } from "react-router-dom";

export const NavBar = () => {
  
  return (
  
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="navbar-brand" >CRUD</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
             
            </li>
            <li className="nav-item">
              <Link to="/"   className="nav-link" >Propietarios</Link>
            </li>
            <li className="nav-item">
              <Link to="/createOwner" className="nav-link" >Crear propietario</Link>
            </li>
          </ul>
        </div>
      </nav>

  )
}
