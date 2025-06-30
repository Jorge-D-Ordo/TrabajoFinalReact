import est from './TarjetaOferta.module.css';
import React, { useContext, useEffect, useState } from 'react';
import BotonesCantidad from './BotonesCantidad';
import Botones from './Botones';
import { CarritoContext } from '../context/CarritoContext';


const TarjetaOferta = ({ producto }) => {
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

    const agregarModifCantCarritoProducto = () => {
        modifCantCarrito(producto, cantidad);
    };


    return (
        <section className={est.estContenedor}>
            <div className={est.estContenedorHijo}>
                <div className={est.estContImagen}>
                    <img src={`/datos/millanelProductos/${producto.imagen1}`} alt="Foto del producto" className={est.estImagen} />
                </div>
                <div className={est.estContTexto}>
                    <h3 className={est.estNombre}>{producto.nombre}</h3>
                    <p className={est.estParrafo}><strong>Familia : {producto.familia}</strong></p>
                    <p className={est.estParrafoLargo}>{producto.descripcion}</p>
                    <p className={est.estParrafo}><strong>Notas :</strong> {producto.notas}</p>
                    <p className={est.estParrafo}>{producto.Linea}</p>
                    <p className={est.estParrafo}>{producto.presentacion}</p>
                    <p className={est.estParraf}><strong>Inspiración: {producto.inspiracion}</strong></p>

                    <p className={est.estPrecio}>$ {producto.precio.toLocaleString('es-AR')}</p>
                    <p className={est.estStock}>Stock: {producto.stock}</p>

                    <div className={est.estContainerCant}>
                        <BotonesCantidad stock={producto.stock} color="rgb(38, 129, 129)" valorInicial={cantidad} onCantidadCambio={manejarCambioCantidad} />
                    </div>
                    <Botones texto="Enviar al carrito" color="rgb(38, 129, 129)" ancho="120px" onClick={agregarModifCantCarritoProducto}></Botones>
                </div>
            </div>
        </section>

    );
};

export default TarjetaOferta;