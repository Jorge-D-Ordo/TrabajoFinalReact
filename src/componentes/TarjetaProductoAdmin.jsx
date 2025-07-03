import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotonesCantidad from './BotonesCantidad';
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
        const cantidadActualizada = cantProdEnCarrito(producto.id);
        setCantidad(cantidadActualizada);
    }, [carrito, producto.id]);

    const manejarCambioCantidad = (valor) => {
        setCantidad(valor);
    };

    const agregarModifCantCarritoProducto = (e) => {
        e.stopPropagation();
        modifCantCarrito(producto, cantidad);
    };

    const irADetalle = () => {
        navigate(`/producto/${producto.id}`);
    };

    const editarProducto = (e) => {
        e.stopPropagation();
        setSeleccionado(producto);
    };

    const eliminarProductoConfirmado = (e) => {
        e.stopPropagation();
        eliminarProducto(producto.id);
    };

    return (
        <table className={est.tarjetaTabla} onClick={irADetalle}>
            <thead>
                <tr>
                    <th colSpan="4" className={est.titulo}>{producto.nombre}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowSpan="2" className={est.imagenCol}>
                        <img
                            src={`/datos/millanelProductos/${producto.imagen1}`}
                            alt="Producto"
                            className={est.imagen}
                            loading="lazy"
                        />
                    </td>
                    <td><strong>CodProd:</strong> {producto.idProd}</td>
                    <td><strong>Genero:</strong> {producto.genero}</td>
                    <td><strong>Familia:</strong> {producto.familia}</td>
                </tr>
                <tr>
                    <td colSpan="3"><strong>Descripción:</strong> {producto.descripcion}</td>
                </tr>
                <tr>
                    <td rowSpan="2" className={est.imagenCol}>
                        <img
                            src={`/datos/millanelProductos/${producto.imagen2}`}
                            alt="Producto"
                            className={est.imagen}
                            loading="lazy"
                        />
                    </td>
                    <td colSpan="3"><strong>Notas:</strong> {producto.notas}</td>
                </tr>
                <tr>
                    <td colSpan="2"><strong>Inspiración:</strong> {producto.inspiracion}</td>
                    <td><strong>Linea:</strong> {producto.Linea}</td>
                </tr>
                <tr>
                    <td><strong>Alta:</strong> {producto.Alta}</td>
                    <td colSpan="2"><strong>Presentacion:</strong> {producto.presentacion}</td>
                    <td><strong>Familia:</strong> {producto.familia}</td>
                </tr>
                <tr>

                    <td colSpan="3"><strong>Notas:</strong> {producto.notas}</td>

                </tr>
                <tr>
                    <td colSpan="3"><strong>Notas:</strong> {producto.notas}</td>
                </tr>
                <tr>

                    <td><strong>Precio:</strong> ${producto.precio.toLocaleString('es-AR')}</td>


                    <td><strong>Familia:</strong> {producto.familia}</td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <p><strong>Notas:</strong> {producto.notas}</p>
                        <p><strong>Inspiración:</strong> {producto.inspiracion}</p>
                        <p>{producto.presentacion}</p>
                    </td>
                </tr>
                <tr>
                    <td><strong>Stock:</strong> {producto.stock}</td>
                    <td colSpan="1">
                        <Botones
                            texto="Editar"
                            color="rgb(100, 42, 194)"
                            ancho="120px"
                            onClick={editarProducto}
                        />
                    </td>
                    <td colSpan="1">
                        <Botones
                            texto=" 🗑️ Eliminar 🗑️"
                            color="rgb(100, 42, 194)"
                            ancho="120px"
                            onClick={eliminarProductoConfirmado}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default TarjetaProductoAdmin;
