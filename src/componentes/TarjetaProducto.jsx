import est from './TarjetaProducto.module.css'
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotonesCantidad from './BotonesCantidad';
import Botones from './Botones';
import { CarritoContext } from '../context/CarritoContext';


const TarjetaProducto = ({ producto }) => {
    const navigate = useNavigate();
    const { carrito, modifCantCarrito, cantProdEnCarrito } = useContext(CarritoContext);
    const cantidadInicial = cantProdEnCarrito ? cantProdEnCarrito(producto.id) : 0;
    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        const cantidadActualizada = cantProdEnCarrito(producto.id);
        setCantidad(cantidadActualizada);
    }, [carrito, producto.id]);

    const manejarCambioCantidad = (valor) => {
        setCantidad(valor);
    };

    const agregarModifCantCarritoProducto = (e) => {
        e.stopPropagation(); // 
        modifCantCarrito(producto, cantidad);
    };

    const irADetalle = () => {
        navigate(`/producto/${producto.id}`);
    };


    return (
        <section className={est.estContenedor} onClick={irADetalle}>
            <div className={est.estContenedorHijo}>
                <h3 className={est.estNombre}>{producto.nombre}</h3>
                <div className={est.estContImagen}>
                    <img src={`datos/millanelProductos/${producto.imagen1}`} alt="Foto del producto" className={est.estImagen} />
                </div>
                <p className={est.estTexto}><strong>Familia : {producto.familia}</strong></p>
                <p className={est.estParrafo}><strong>Notas :</strong> {producto.notas}</p>
                <p className={est.estTexto}><strong>Inspiración: {producto.inspiracion}</strong></p>
                <p className={est.estTexto}>{producto.presentacion}</p>
                <p className={est.estPrecio}>$ {producto.precio.toLocaleString('es-AR')}</p>
                <p className={est.estStock}>Stock: {producto.stock}</p>

                <div className={est.estContainerCant}>
                    <BotonesCantidad stock={producto.stock} color='rgb(100, 42, 194)' valorInicial={cantidad} onCantidadCambio={manejarCambioCantidad} />
                </div>
                <Botones className={est.envio} texto="Enviar al carrito" color='rgb(100, 42, 194)' ancho="120px" onClick={agregarModifCantCarritoProducto}></Botones>
            </div>
        </section >
    )
};

export default TarjetaProducto;