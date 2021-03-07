import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';

export const NavBar = () => {
  
  const {user, setUser} = useContext(AppContext);

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
              <Link to="/"   className="nav-link" >Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/condo/ownersInfo" className="nav-link" >Propietarios</Link>
            </li>
            <li className="nav-item">
              <Link to="/condo/allCondos" className="nav-link" >Condominios</Link>
            </li>
            <li className="nav-item">
              <Link to="/condo/allCasas" className="nav-link" >Casas</Link>
            </li>
            <li className="nav-item">
              <Link to="/condo/allGastos" className="nav-link" >Gastos</Link>
            </li>
            <li className="nav-item">
              <Link to="/condo/createFactura" className="nav-link" >Factura</Link>
            </li>
            <li className="nav-item">
              <Link to="/condo/resumenDeudas" className="nav-link" >Resumen de Deudas</Link>
            </li>

            <li className="nav-item" onClick={ () => {setUser({
                isAdmin: false,
                cedula: "",
                id: "",
                casaID: "",
                condoID: "",
                isLogged: false
              })} } >
                <Link to='/login' className="nav-link">
                  
                  <span>Cerrar sesión</span>
                </Link>
            </li>


          </ul>
        </div>
      </nav>

  )
}
