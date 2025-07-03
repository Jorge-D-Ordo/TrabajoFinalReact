import React, { useEffect, useState, useContext } from "react";
import Footer from "../estructura/Footer";
import Aside from "../estructura/Aside";
import ProductoListaMockApi from "../estructura/ProductoListaMockApi";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import est from "./Admin.module.css";
import ProductoFormularioAdmin from "../estructura/ProductoFormularioAdmin";

const Admin = () => {
    const { setAutenticado, setSeleccionado, seleccionado } = useContext(AdminContext);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroGenero, setFiltroGenero] = useState("");
    const [filtroIDProd, setFiltroIDProd] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const navigate = useNavigate();

    const handleSalir = () => {
        setAutenticado(false);
        localStorage.removeItem("autenticado");
    };

    useEffect(() => {
        const cerrarSesionAlCerrar = () => {
            setAutenticado(false);
            localStorage.removeItem("autenticado");
        };
        window.addEventListener("beforeunload", cerrarSesionAlCerrar);
        return () => {
            window.removeEventListener("beforeunload", cerrarSesionAlCerrar);
        };
    }, [setAutenticado]);

    const handleAgregar = () => {
        setSeleccionado(null); // modo "agregar"
        setMostrarFormulario(true);
    };

    const handleCerrarFormulario = () => {
        setMostrarFormulario(false);
        setSeleccionado(null);
    };

    const handleExitoAgregar = () => {
        setMostrarMensaje(true);
    };

    const handleCerrarMensaje = () => {
        setMostrarMensaje(false);
        setMostrarFormulario(false);
        setSeleccionado(null);
    };

    return (
        <div className={est.general}>
            <div className={est.barraEncabezado}>
                <h1 className={est.h1Variante}>Administración de Productos Mockapi</h1> {/************* */}
                <div className={est.controles}>
                    <input
                        type="text"
                        placeholder="🔎 Filtrar por IDProd..."
                        value={filtroIDProd}
                        onChange={(e) => setFiltroIDProd(e.target.value)}
                        className={est.inputFiltro}
                    />
                    <input
                        type="text"
                        placeholder="🔍 Filtrar por nombre..."
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        className={est.inputFiltro}
                    />
                    <select
                        value={filtroGenero}
                        onChange={(e) => setFiltroGenero(e.target.value)}
                        className={est.inputFiltro}
                    >
                        <option value="">Todos los géneros</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Ambos">Ambos</option>
                    </select>
                    <button onClick={handleAgregar} className={est.boton}>➕ Agregar Producto</button>
                    <button onClick={handleSalir} className={est.botonSalir}>🚪 Salir</button>
                </div>
            </div>

            <div className={est.contenedor}>
                <main className={est.contenido1}>
                    <ProductoListaMockApi
                        filtroNombre={filtroNombre}
                        filtroGenero={filtroGenero}
                        filtroIDProd={filtroIDProd}
                        setMostrarFormulario={setMostrarFormulario}
                    />
                </main>
            </div>

            {(mostrarFormulario || seleccionado !== null) && (
                <div className={est.modalOverlay}>
                    <div className={est.modalContent} style={{ maxHeight: "90vh", overflowY: "auto" }}>
                        <ProductoFormularioAdmin onClose={handleCerrarFormulario} onSuccess={handleExitoAgregar} />
                    </div>
                </div>
            )}

            {mostrarMensaje && (
                <div className={est.modalOverlay}>
                    <div className={est.modalContent}>
                        <p>✅ Producto agregado correctamente</p>
                        <button onClick={handleCerrarMensaje}>OK</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Admin;
