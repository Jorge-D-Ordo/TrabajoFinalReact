import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Botones from './Botones';
import { CarritoContext } from '../context/CarritoContext';
import { AdminContext } from "../context/AdminContext";
import est from './TarjetaProductoAdmin.module.css';

const TarjetaProductoAdmin = ({ producto }) => {
    const navigate = useNavigate();
    const { carrito, modifCantCarrito, cantProdEnCarrito } = useContext(CarritoContext);
    const { setSeleccionado, eliminarProducto } = useContext(AdminContext);

    const cantidadInicial = cantProdEnCarrito ? cantProdEnCarrito(producto.id) : 0;
    const [cantidad, setCantidad] = useState(cantidadInicial);

    useEffect(() => {
        setCantidad(cantProdEnCarrito(producto.id));
    }, [carrito, producto.id]);

    const irADetalle = () => navigate(`/producto/${producto.id}`);

    const editarProducto = (e) => {
        e.stopPropagation();
        setSeleccionado(producto);
    };

    const eliminarProductoConfirmado = (e) => {
        e.stopPropagation();
        eliminarProducto(producto.id);
    };

    return (
        <Card className={`${est.tarjetaTabla} mb-3`} onClick={irADetalle}>
            <Card.Header className={est.titulo}>{producto.nombre}</Card.Header>
            <Card.Body className={est.cuerpoTarjeta}>

                {/* Imágenes en fila solo visibles en móviles */}
                <div className={est.imagenesFilaMobile}>
                    <img
                        src={`/datos/millanelProductos/${producto.imagen1}`}
                        alt="img1"
                        loading="lazy"
                    />
                    <img
                        src={`/datos/millanelProductos/${producto.imagen2}`}
                        alt="img2"
                        loading="lazy"
                    />
                </div>

                {/* Diseño apaisado: imágenes grandes solo en pantallas medianas o más grandes */}
                <Row className={est.ocultarEnMobile}>
                    <Col xs={12} sm={4} className={est.imagenCol}>
                        <img
                            src={`/datos/millanelProductos/${producto.imagen1}`}
                            alt="Producto"
                            className={est.imagen}
                            loading="lazy"
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Row><Col><strong>CodProd:</strong> {producto.idProd}</Col></Row>
                        <Row><Col><strong>Género:</strong> {producto.genero}</Col></Row>
                        <Row><Col><strong>Familia:</strong> {producto.familia}</Col></Row>
                        <Row><Col><strong>Descripción:</strong> {producto.descripcion}</Col></Row>
                    </Col>
                </Row>

                <Row className={est.ocultarEnMobile}>
                    <Col xs={12} sm={4} className={est.imagenCol}>
                        <img
                            src={`/datos/millanelProductos/${producto.imagen2}`}
                            alt="Producto"
                            className={est.imagen}
                            loading="lazy"
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Row><Col><strong>Notas:</strong> {producto.notas}</Col></Row>
                        <Row><Col><strong>Inspiración:</strong> {producto.inspiracion}</Col></Row>
                        <Row><Col><strong>Línea:</strong> {producto.Linea}</Col></Row>
                    </Col>
                </Row>

                {/* Textos verticales solo visibles en móviles */}
                <div className="d-sm-none">
                    <div className={est.textoBloqueMobile}><strong>CodProd:</strong> {producto.idProd}</div>
                    <div className={est.textoBloqueMobile}><strong>Género:</strong> {producto.genero}</div>
                    <div className={est.textoBloqueMobile}><strong>Familia:</strong> {producto.familia}</div>
                    <div className={est.textoBloqueMobile}><strong>Descripción:</strong> {producto.descripcion}</div>
                    <div className={est.textoBloqueMobile}><strong>Notas:</strong> {producto.notas}</div>
                    <div className={est.textoBloqueMobile}><strong>Inspiración:</strong> {producto.inspiracion}</div>
                    <div className={est.textoBloqueMobile}><strong>Línea:</strong> {producto.Linea}</div>
                </div>

                {/* Información adicional del producto */}
                <Row className="mt-2">
                    <Col xs={12} md={4}><strong>Presentación:</strong> {producto.presentacion}</Col>
                    <Col xs={12} md={4}><strong>Stock:</strong> {producto.stock}</Col>
                    <Col xs={12} md={4}><strong>Uso:</strong> {producto.uso}</Col>
                    <Col xs={12} md={4}><strong>Intensidad:</strong> {producto.intensidad}</Col>
                    <Col xs={12} md={4}><strong>Precio:</strong> ${producto.precio.toLocaleString('es-AR')}</Col>
                </Row>

                {/* Botones (menos espacio abajo) */}
                <Row className={`mt-3 justify-content-center ${est.botonesRow}`}>
                    <Col xs="auto" style={{paddingBottom: 0}}>
                        <Botones
                            texto="Editar"
                            color="rgb(100, 42, 194)"
                            ancho="120px"
                            className={est.botonResponsive}
                            onClick={editarProducto}
                        />
                    </Col>
                    <Col xs="auto" style={{paddingBottom: 0}}>
                        <Botones
                            texto="🗑️ Eliminar"
                            color="rgb(100, 42, 194)"
                            ancho="120px"
                            className={est.botonResponsive}
                            onClick={eliminarProductoConfirmado}
                        />
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    );
};

export default TarjetaProductoAdmin;
