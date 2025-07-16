import React, { useState, useContext } from "react";
import Footer from "../estructura/Footer";
import ProductoListaMockApi from "../estructura/ProductoListaMockApi";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import ProductoFormularioAdmin from "../estructura/ProductoFormularioAdmin";
import { useAuth } from "../context/AuthContext";

import { Form, Modal, Row, Col } from "react-bootstrap";
import styles from "./Admin.module.css";
import Botones from "../componentes/Botones"; // ✅ botón personalizado

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

                    <Row className="align-items-center mb-2">
                        <Col xs="auto">
                            <Botones
                                texto="➕ Agregar"
                                color="rgb(100, 42, 194)"
                                ancho="100px"
                                onClick={handleAgregar}
                            />
                        </Col>
                        <Col xs="auto">
                            <Botones
                                texto="🚪 Salir"
                                color="rgba(202, 87, 236, 1)"
                                ancho="100px"
                                onClick={handleSalir}
                            />
                        </Col>
                        <Col className="text-end d-sm-none">
                            <button className={styles.hamburguesaBtn} onClick={toggleMenuFiltros}>
                                ☰
                            </button>
                        </Col>
                    </Row>

                    {/* Filtros colapsables en mobile */}
                    {(menuFiltrosVisible || window.innerWidth >= 576) && (
                        <Row>
                            <Col xs={12} sm={4} className="mb-2">
                                <Form.Control
                                    type="text"
                                    placeholder="🔎 Filtrar por IDProd..."
                                    value={filtroIDProd}
                                    onChange={(e) => setFiltroIDProd(e.target.value)}
                                    className={styles.inputSmall}
                                />
                            </Col>
                            <Col xs={12} sm={4} className="mb-2">
                                <Form.Control
                                    type="text"
                                    placeholder="🔍 Filtrar por nombre..."
                                    value={filtroNombre}
                                    onChange={(e) => setFiltroNombre(e.target.value)}
                                    className={styles.inputSmall}
                                />
                            </Col>
                            <Col xs={12} sm={4} className="mb-2">
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
                            </Col>
                        </Row>
                    )}
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
                        <Modal.Header closeButton>
                            <Modal.Title className={styles.modalTitulo}>
                                {seleccionado ? " ✏️ Editar Producto" : "➕ Agregar Producto"}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProductoFormularioAdmin onClose={handleCerrarFormulario} />
                        </Modal.Body>
                    </Modal>

                    <Footer />
                </div>
            </div>
        </div>
    );

};

export default Admin;
