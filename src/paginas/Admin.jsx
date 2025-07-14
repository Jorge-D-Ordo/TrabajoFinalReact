import React, { useState, useContext } from "react";
import Footer from "../estructura/Footer";
import ProductoListaMockApi from "../estructura/ProductoListaMockApi";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import ProductoFormularioAdmin from "../estructura/ProductoFormularioAdmin";
import { useAuth } from "../context/AuthContext";

import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
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
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className={styles.adminTitle}>Administración de Productos Mockapi</h1>
                        </Col>
                    </Row>

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

                            <Row className="mt-2">
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
                </Container>
            </header>

            <Container fluid className={`py-4 ${styles.mainContent}`}>
                <Row>
                    <Col>
                        <ProductoListaMockApi
                            filtroNombre={filtroNombre}
                            filtroGenero={filtroGenero}
                            filtroIDProd={filtroIDProd}
                            setMostrarFormulario={setMostrarFormulario}
                        />
                    </Col>
                </Row>

                <Modal
                    show={mostrarFormulario || seleccionado !== null}
                    onHide={handleCerrarFormulario}
                    size="lg"
                    scrollable
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{seleccionado ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProductoFormularioAdmin onClose={handleCerrarFormulario} />
                    </Modal.Body>
                </Modal>

                <Footer />
            </Container>
        </div>
    );
};

export default Admin;
