import React from 'react'
import { Link } from "react-router-dom";

export const UnloggedNav = () => {
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
              <Link to="/login" className="nav-link" >Iniciar como Propietario</Link>
            </li>
            <li className="nav-item">
              <Link to="/adminLogin" className="nav-link" >Inciar como Admin</Link>
            </li>

          </ul>
        </div>
      </nav>
  )
}
