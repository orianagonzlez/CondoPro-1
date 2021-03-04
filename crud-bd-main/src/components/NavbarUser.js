import React from 'react'
import { Link } from "react-router-dom";

export const NavBarUser = () => {
  
  return (
  
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="navbar-brand" >CondoPRO</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active"></li>
            <li className="nav-item">
              <Link to="/userHome" className="nav-link" >Home Usuario</Link>
            </li>
            <li className="nav-item">
              <Link to="/detallePago" className="nav-link" >Detalle y Pago de Facturas</Link>
            </li>
            <li className="nav-item">
              <Link to="/registerGuest" className="nav-link" >Registrar Invitados</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" >Login</Link>
            </li>
          </ul>
        </div>
      </nav>

  )
}