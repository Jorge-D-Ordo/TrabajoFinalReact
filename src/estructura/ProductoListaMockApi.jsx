import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import TarjetaProductoAdmin from "../componentes/TarjetaProductoAdmin";
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
        <div className={est.contenedorLista}>
            <h2>Lista de Productos</h2>

            {loading && <p>Cargando productos...</p>}
            {error && <p style={{ color: 'red' }}>❌ {error}</p>}

            {!loading && !error && (
                productosFiltrados.length > 0 ? (
                    <div className={est.gridTarjetas}>
                        {productosFiltrados.map(producto => (
                            <TarjetaProductoAdmin key={producto.id} producto={producto} />
                        ))}
                    </div>
                ) : (
                    <p>No hay productos que coincidan con los filtros.</p>
                )
            )}
        </div>
    );
}
