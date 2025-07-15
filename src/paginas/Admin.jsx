import React, { useState, useContext } from "react";
import Footer from "../estructura/Footer";
import ProductoListaMockApi from "../estructura/ProductoListaMockApi";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import ProductoFormularioAdmin from "../estructura/ProductoFormularioAdmin";
import { useAuth } from "../context/AuthContext";

import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import styles from "./Admin.module.css";

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

    return (
        <div className={styles.adminWrapper}>
            <header className={styles.headerSticky}>
                <div className={styles.fullWidthContainer}>
                    <h1 className={styles.adminTitle}>Administración de Productos Mockapi</h1>

                    <Row className="justify-content-center">
                        <Col xs={12} md={10}>
                            <Row>
                                <Col xs={12} md={4} className="mb-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="🔎 Filtrar por IDProd..."
                                        value={filtroIDProd}
                                        onChange={(e) => setFiltroIDProd(e.target.value)}
                                        className={styles.inputSmall}
                                    />
                                </Col>
                                <Col xs={12} md={4} className="mb-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="🔍 Filtrar por nombre..."
                                        value={filtroNombre}
                                        onChange={(e) => setFiltroNombre(e.target.value)}
                                        className={styles.inputSmall}
                                    />
                                </Col>
                                <Col xs={12} md={4} className="mb-2">
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

                            <Row>
                                <Col className={`d-flex ${styles.btnRowMobile}`}>
                                    <Button
                                        variant="success"
                                        onClick={handleAgregar}
                                        className={styles.btnSm}
                                    >
                                        ➕ Agregar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={handleSalir}
                                        className={styles.btnSm}
                                    >
                                        🚪 Salir
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
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
                            <Modal.Title>
                                {seleccionado ? "Editar Producto" : "Agregar Producto"}
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
