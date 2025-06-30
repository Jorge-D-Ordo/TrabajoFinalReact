import React,  { useContext } from "react";
import { Routes, Route, Navigate} from 'react-router-dom';
import RutaProtegida from '../auth/RutasProtegidads';

import Inicio from '../paginas/Inicio';
import Galeria from '../paginas/Galeria';
import ErrorPagina from '../paginas/ErrorPagina';
import Nosotros from '../paginas/Nosotros';
import Contacto from '../paginas/Contacto';
import Login from '../paginas/Login';
//import Carrito from '../paginas/Carrito';
import DetalleProducto from '../paginas/DetalleProducto';
import Admin from '../paginas/Admin';
/* <Route parh='/productos/:id/promo:campania element={<DetalleProducto/> en el uturo para ver detalles admin}  */
import { CarritoContext } from "../context/CarritoContext";

const Ruteo =()=> {

const { isAuthenticated, setIsAuthenticated } = useContext(CarritoContext);


    return (
        <Routes>
            <Route path="/"             element={<Inicio />} />
            <Route path="Galeria"       element={<Galeria />} />
            <Route path="Nosotros"      element={<Nosotros />} />
            <Route path="Contacto"      element={<Contacto />} />
{/*            <Route path="Carrito"       element={<RutaProtegida isAuthenticated={isAuthenticated}><Carrito /> </RutaProtegida>} />
*/}
            <Route path="Producto/:id"  element={<DetalleProducto />} />
            <Route path="Login"         element={<Login  />} />
            <Route path="Admin"         element={<RutaProtegida isAuthenticated={isAuthenticated}><Admin /> </RutaProtegida>} />
            <Route path="*"             element={<ErrorPagina />} />           
        </Routes>
    );
};

export default Ruteo;
