import est from './ProductoLista.module.css';
import React, { useContext } from "react";
import { ProductosContext } from "../context/ProductosContext";
import TarjetaProducto from '../componentes/TarjetaProducto';

const ProductoLista = () => {
    const {
        productosConPrecioPorCampania,
        productoListaCargado,
        listaPreciosCargado,
        errorProd,
        errorPrecio,
        campaniaActual,
    } = useContext(ProductosContext);

    const campania = "2025-05"; // <SI POR AHORA USAR EL VALOR FIJO si es admin puede cambiar el valor

    const productosConPrecio = productosConPrecioPorCampania(campania);

    if (productoListaCargado || listaPreciosCargado) return <p>Cargando...</p>;
    if (errorProd || errorPrecio) return <p>Error al cargar datos.</p>;



    return (
        <>
            {/*}    <h1>Productos - Campaña {campaniaActual}</h1>*/}
            <div className={est.estContenedor}> {
                productosConPrecio.map((producto) => (
                    <div className={est.estiloTarjeta} key={producto.id}>
                        <TarjetaProducto producto={producto} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductoLista;