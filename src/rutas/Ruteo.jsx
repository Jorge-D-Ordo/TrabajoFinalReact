import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import RutaProtegida from "../auth/RutasProtegidads";

import Inicio from "../paginas/Inicio";
import Galeria from "../paginas/Galeria";
import ErrorPagina from "../paginas/ErrorPagina";
import Nosotros from "../paginas/Nosotros";
import Contacto from "../paginas/Contacto";
import Login from "../paginas/Login";
// import Carrito from '../paginas/Carrito';
import DetalleProducto from "../paginas/DetalleProducto";
import Admin from "../paginas/Admin";

import { AuthContext } from "../context/AuthContext";

const Ruteo = () => {
    const { isAuthenticated, usuario } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="Galeria" element={<Galeria />} />
            <Route path="Nosotros" element={<Nosotros />} />
            <Route path="Contacto" element={<Contacto />} />
            {/* <Route path="Carrito" element={<RutaProtegida isAuthenticated={isAuthenticated}><Carrito /></RutaProtegida>} /> */}
            <Route path="Producto/:id" element={<DetalleProducto />} />
            <Route path="Login" element={<Login />} />
            <Route
                path="Admin"
                element={
                    <RutaProtegida isAuthenticated={isAuthenticated && usuario?.rol === "admin"}>
                        <Admin />
                    </RutaProtegida>
                }
            />
            <Route path="*" element={<ErrorPagina />} />
        </Routes>
    );
};

export default Ruteo;
