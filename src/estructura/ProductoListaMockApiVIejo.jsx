import est from './ProductoLista.module.css';
import React, { useContext, useEffect, useState } from "react";
import { ProductosContext } from "../context/ProductosContext";
import TarjetaProducto from '../componentes/TarjetaProducto';
import SincronizarProductosMockApi from '../componentes/SincronizarProductosMockApi';


const MOCKAPI_URL = "https://68573e0121f5d3463e54ccee.mockapi.io/api/V1/ListadoEjemplo";
const ProductoListaMockApi = () => {
    /*    const [productos, setProductos] = useState([]);
        useEffect(() => {
            const fetchProductos = async () => {
                try {
                    const respuesta = await fetch(MOCKAPI_URL);
                    if (!respuesta.ok) {
                        throw new Error('Error al obtener los productos.');
                    }
                    const data = await respuesta.json();
                    setProductos(data);
                } catch (error) {
                    console.error(error.message);
                }
            };
            fetchProductos();
        }, []);
        return (
            <div>
                <h2>Lista de Productos</h2>
                <ul>
                    {productos.map((producto) => (
                        <li key={producto.id}>
                            <strong>{producto.nombre}</strong>: ${producto.precio}
                            <p>{producto.descripcion}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    */

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch(MOCKAPI_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then((data) => {
                setProductos(data);
                setCargando(false);
            })
            .catch((error) => {
                console.error('Error al obtener datos de MockAPI:', error);
                setCargando(false);
            });
    }, []);

    if (cargando) return <p>Cargando productos...</p>;

    return (
        <div>
            <SincronizarProductosMockApi />
            <h2>Lista de Productos sincronizado?</h2>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre} - ${producto.precio} - Stock: {producto.stock}
                    </li>
                ))}
            </ul>
        </div>
    );
};









export default ProductoListaMockApi;