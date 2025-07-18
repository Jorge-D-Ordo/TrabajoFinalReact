import React, { useState, useContext } from "react";
import Footer from "../estructura/Footer";
import ProductoListaMockApi from "../estructura/ProductoListaMockApi";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import ProductoFormularioAdmin from "../estructura/ProductoFormularioAdmin";
import { useAuth } from "../context/AuthContext";

import { Form, Modal, Row, Col } from "react-bootstrap";
import styles from "./Admin.module.css";
import Botones from "../componentes/Botones"; 

const Admin = () => {
    const { logout } = useAuth();
    const { setSeleccionado, seleccionado } = useContext(AdminContext);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroGenero, setFiltroGenero] = useState("");
    const [filtroIDProd, setFiltroIDProd] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const navigate = useNavigate();

    const handleAgregar = () => {
        setSeleccionado(null);
        setMostrarFormulario(true);
    };

    const handleCerrarFormulario = () => {
        setMostrarFormulario(false);
        setSeleccionado(null);
    };

    const handleSalir = () => {
        logout();
        navigate("/", { replace: true });
    };
    const [menuFiltrosVisible, setMenuFiltrosVisible] = useState(false);
    const toggleMenuFiltros = () => {
        setMenuFiltrosVisible(!menuFiltrosVisible);
    };
    return (
        <div className={styles.adminWrapper}>
            <header className={styles.headerSticky}>
                <div className={styles.fullWidthContainer}>
                    <h1 className={styles.adminTitle}>Administración de Productos Mockapi</h1>

                    <div className={styles.controlContainer}>
                        {/* Hamburguesa y botones en la misma fila */}
                        <div className={styles.btnRowMobile}>
                            <Botones
                                texto="➕ Agregar"
                                color="rgb(100, 42, 194)"
                                ancho="100px"
                                onClick={handleAgregar}
                            />
                            <Botones
                                texto="🚪 Salir"
                                color="rgba(202, 87, 236, 1)"
                                ancho="100px"
                                onClick={handleSalir}
                            />
                            <label htmlFor="toggleFiltros" className={styles.hamburguesaBtn}>☰</label>
                        </div>

                        {/* Checkbox oculto que controla la visibilidad de los filtros en mobile */}
                        <input type="checkbox" id="toggleFiltros" className={styles.toggleInput} />

                        {/* Filtros */}
                        <div className={styles.filtrosRow}>
                            <Form.Control
                                type="text"
                                placeholder="🔎 Filtrar por IDProd..."
                                value={filtroIDProd}
                                onChange={(e) => setFiltroIDProd(e.target.value)}
                                className={styles.inputSmall}
                            />
                            <Form.Control
                                type="text"
                                placeholder="🔍 Filtrar por nombre..."
                                value={filtroNombre}
                                onChange={(e) => setFiltroNombre(e.target.value)}
                                className={styles.inputSmall}
                            />
                            <Form.Select
                                value={filtroGenero}
                                onChange={(e) => setFiltroGenero(e.target.value)}
                                className={styles.inputSmall}
                            >
                                <option value="">Todos los géneros</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Ambos">Ambos</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>
            </header>


            <div className={styles.mainContent}>
                <div className={styles.fullWidthContainer}>
                    <ProductoListaMockApi
                        filtroNombre={filtroNombre}
                        filtroGenero={filtroGenero}
                        filtroIDProd={filtroIDProd}
                        setMostrarFormulario={setMostrarFormulario}
                    />

                    <Modal 
                        show={mostrarFormulario || seleccionado !== null}
                        onHide={handleCerrarFormulario}
                        size="lg"
                        scrollable
                        centered
                    >
                        <Modal.Header closeButton className={styles.EncabezadoTitulo}>
                            <Modal.Title className={styles.modalTitulo}>
                                {seleccionado ? " ✏️ Editar Producto" : "➕ Agregar Producto"}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoFormularioAdmin onClose={handleCerrarFormulario} />
                        </Modal.Body>
                    </Modal>

                </div>
            </div>
        </div>
    );

};

export default Admin;
