import React, { useEffect, useState } from "react";
import TarjetaProductoAdmin from '../componentes/TarjetaProductoAdmin';
import est from './ProductoListaMockApi.module.css';

const MOCKAPI_URL = "https://68573e0121f5d3463e54ccee.mockapi.io/api/V1/ListadoEjemplo";

export default function ProductoListaMockApi({ filtroPop = null }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            console.time("Tiempo carga productos"); /******************************** */
            setCargando(true);
            setError(null);
            try {
                const respuesta = await fetch(MOCKAPI_URL);
                if (!respuesta.ok) throw new Error('Error al obtener los productos.');
                const data = await respuesta.json();
                console.log("🧮 Cantidad total de productos:", data.length);  /**********************/
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
                setError(error.message);
            } finally {
                setCargando(false);
                console.timeEnd("Tiempo carga productos"); /************************************** */
            }
        };

        fetchProductos();
    }, []);

    const productosFiltrados = filtroPop
        ? productos.filter(producto => producto.pop === filtroPop)
        : productos;

    return (
        <div className={est.contenedorLista}>
            <h2>Lista de Productos</h2>

            {cargando && <p>Cargando productos...</p>}
            {error && <p style={{ color: 'red' }}>❌ {error}</p>}

            {!cargando && !error && (
                productosFiltrados.length > 0 ? (
                    <div className={est.gridTarjetas}>
                        {productosFiltrados.map((producto) => (
                            <TarjetaProductoAdmin key={producto.id} producto={producto} />
                        ))}
                    </div>
                ) : (
                    <p>No hay productos que coincidan con el filtro.</p>
                )
            )}
        </div>
    );
}
