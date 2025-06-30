import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotonesCantidad from './BotonesCantidad';
import Botones from './Botones';
import { CarritoContext } from '../context/CarritoContext';
import est from './TarjetaProductoAdmin.module.css'; // Asegurate de tener este CSS

const TarjetaProductoAdmin = ({ producto }) => {
    const navigate = useNavigate();
    const { carrito, modifCantCarrito, cantProdEnCarrito } = useContext(CarritoContext);
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

    return (
        <table className={est.tarjetaTabla} onClick={irADetalle}>
            <thead>
                <tr>
                    <th colSpan="3" className={est.titulo}>{producto.nombre}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowSpan="2" className={est.imagenCol}>
                        <img
                            src={`datos/millanelProductos/${producto.imagen1}`}
                            alt="Producto"
                            className={est.imagen}
                            loading="lazy"
                        />
                    </td>
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
                    <td>
                        <BotonesCantidad
                            stock={producto.stock}
                            color="rgb(100, 42, 194)"
                            valorInicial={cantidad}
                            onCantidadCambio={manejarCambioCantidad}
                        />
                    </td>
                    <td>
                        <Botones
                            texto="Enviar al carrito"
                            color="rgb(100, 42, 194)"
                            ancho="120px"
                            onClick={agregarModifCantCarritoProducto}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    
    );
};

export default TarjetaProductoAdmin;
