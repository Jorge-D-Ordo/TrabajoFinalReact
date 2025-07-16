import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import est from "./ProductoFormularioAdmin.module.css";
import jsonBase from "../datos/listaMillanelProductosMockapi.json";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Container, Form, Row, Col} from "react-bootstrap";
import Botones from "../componentes/Botones";

const ProductoFormularioAdmin = ({ onClose }) => {
    const {
        agregarProducto,
        actualizarProducto,
        seleccionado,
        setSeleccionado,
        cantidadProductos
    } = useContext(AdminContext);

    const productoInicial = {
        nombre: "",
        descripcion: "",
        presentacion: "",
        Linea: "",
        imagen1: "SinImagen.png",
        imagen2: "SinImagen.png",
        genero: "",
        familia: "",
        notas: "",
        inspiracion: "",
        intensidad: "",
        uso: "",
        stock: 0,
        alta: Date.now(),
        baja: 0,
        id: null,
        idProd: 0,
        precio: 19999.99,
    };

    const [form, setForm] = useState(productoInicial);
    const [baseProducto, setBaseProducto] = useState(productoInicial);
    const [productoPrecargado, setProductoPrecargado] = useState(null);

    useEffect(() => {
        if (productoPrecargado || jsonBase.length === 0) return;

        const index = cantidadProductos;

        if (index >= jsonBase.length) {
            console.warn(`⚠️ No hay producto en la posición ${index} del JSON base`);
            crearProductoVacio();
            return;
        }

        precargarProducto(index);
    }, [cantidadProductos, productoPrecargado]);

    const precargarProducto = (index) => {
        const ejemplo = jsonBase[index];

        const productoBase = {
            ...productoInicial,
            ...ejemplo,
            id: null,
            idProd: Number(ejemplo.idProd) || Number(ejemplo.id) || 0,
            alta: Date.now(),
            precio: ejemplo.precio ?? 1999,
            stock: ejemplo.stock ?? 0,
            imagen1: ejemplo.imagen1 || "SinImagen.png",
            imagen2: ejemplo.imagen2 || "SinImagen.png",
        };

        setProductoPrecargado(productoBase);
        setBaseProducto(productoBase);
        setForm(productoBase);
    };

    useEffect(() => {
        if (seleccionado) {
            setForm(seleccionado);
        }
    }, [seleccionado]);

    const crearProductoVacio = () => {
        setProductoPrecargado(productoInicial);
        setBaseProducto(productoInicial);
        setForm(productoInicial);
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const validarFormulario = () => {
        const errores = [];

        if (form.idProd <= 0) errores.push("El ID del producto debe ser mayor que cero.");
        if (!form.nombre || form.nombre.trim().length < 4) errores.push("El nombre es obligatorio. y al menos 4 caracteres");
        if (form.precio <= 0) errores.push("El precio debe ser mayor que cero.");
        if (form.stock < 0) errores.push("El stock no puede ser negativo.");
        if (!form.descripcion || form.descripcion.trim().length < 10) errores.push("La descripción debe tener al menos 10 caracteres.");

        if (errores.length > 0) {
            errores.forEach((err) => toast.error("⚠️ " + err));
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        try {
            const productoParaEnviar = { ...form };
            delete productoParaEnviar.id;

            if (form.id) {
                await actualizarProducto(form);// Producto actualizado correctamente
            } else {
                await agregarProducto(productoParaEnviar);//Producto agregado correctamente
                const siguienteIndex = cantidadProductos + 1;
                if (siguienteIndex < jsonBase.length) {
                    precargarProducto(siguienteIndex);
                } else {
                    crearProductoVacio();
                }
            }

            setSeleccionado(null);
            if (onClose) onClose();
        } catch (error) {
            toast.error("❌ Error al guardar el producto");
            console.error("Error en submit:", error);
        }
    };

    const cerrarFormulario = () => {
        setSeleccionado(null);
        if (onClose) onClose();
    };

    return (
        <Container>
            <Form className={est.formulario} onSubmit={handleSubmit}>
               

                {/* Cada fila tiene label e input en la misma línea en desktop, vertical en mobile */}
                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">ID del Producto</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            type="number"
                            name="idProd"
                            value={form.idProd}
                            onChange={handleChange}
                            size="sm"
                            required
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Nombre</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            size="sm"
                            required
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Descripción</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            size="sm"
                            required
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Presentación</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="presentacion"
                            value={form.presentacion}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Línea</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="Linea"
                            value={form.Linea}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Imagen 1</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="imagen1"
                            value={form.imagen1}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Imagen 2</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="imagen2"
                            value={form.imagen2}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Género</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Select
                            name="genero"
                            value={form.genero}
                            onChange={handleChange}
                            size="sm"
                        >
                            <option value="">Seleccione...</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Ambos">Ambos</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Familia</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="familia"
                            value={form.familia}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Notas</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="notas"
                            value={form.notas}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Inspiración</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="inspiracion"
                            value={form.inspiracion}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Intensidad</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="intensidad"
                            value={form.intensidad}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Uso</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            name="uso"
                            value={form.uso}
                            onChange={handleChange}
                            size="sm"
                        />
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Stock</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            size="sm"
                            min={0}
                        />
                    </Col>
                </Row>

                <Row >
                    <Col xs={12} md={3}>
                        <Form.Label className="mb-0">Precio</Form.Label>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Control
                            type="number"
                            name="precio"
                            value={form.precio}
                            onChange={handleChange}
                            size="sm"
                            min={0}
                            step="0.01"
                        />
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col xs={6} className="d-flex justify-content-end pe-1">
                        <Botones texto="Guardar" color="rgb(100, 42, 194)" ancho="50%" type="submit" />
                    </Col>
                    <Col xs={6} className="d-flex justify-content-start ps-1">
                        <Botones texto="Cerrar" color="rgba(202, 87, 236, 1)" ancho="50%" onClick={cerrarFormulario} />
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};


export default ProductoFormularioAdmin;
