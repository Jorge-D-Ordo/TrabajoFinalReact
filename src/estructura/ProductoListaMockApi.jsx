import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import TarjetaProductoAdmin from "../componentes/TarjetaProductoAdmin";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import est from "./ProductoListaMockApi.module.css";

export default function ProductoListaMockApi({ filtroNombre = "", filtroGenero = "", filtroIDProd = "" }) {
    const { productos, loading, error, cargarProductos } = useContext(AdminContext);

    useEffect(() => {
        cargarProductos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const productosFiltrados = productos.filter(producto => {
        const nombreCoincide = producto.nombre?.toLowerCase().includes(filtroNombre.toLowerCase());
        const generoCoincide = filtroGenero ? producto.genero === filtroGenero : true;
        const idProdCoincide = filtroIDProd ? producto.idProd?.toString().includes(filtroIDProd) : true;
        return nombreCoincide && generoCoincide && idProdCoincide;
    });

    return (
        <Container fluid className={est.contenedorLista}>
            <Row className="mb-3">
                <Col>
                    <h2 className={est.tituloLista}>Lista de Productos</h2>
                </Col>
            </Row>

            {loading && (
                <Row className="justify-content-center">
                    <Spinner animation="border" variant="primary" />
                </Row>
            )}

            {error && (
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Alert variant="danger">❌ {error}</Alert>
                    </Col>
                </Row>
            )}

            {!loading && !error && (
                productosFiltrados.length > 0 ? (
                    <Row className="g-3 justify-content-center">
                        {productosFiltrados.map(producto => (
                            <Col key={producto.id} xs={12} sm={10} md={6} lg={4} xl={3}>
                                <TarjetaProductoAdmin producto={producto} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <p className={est.mensaje}>No hay productos que coincidan con los filtros.</p>
                        </Col>
                    </Row>
                )
            )}
        </Container>
    );
}
