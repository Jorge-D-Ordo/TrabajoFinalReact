import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import TarjetaProductoAdmin from "../componentes/TarjetaProductoAdmin";
import { Spinner, Alert } from "react-bootstrap";
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
            <h2 className={est.tituloLista}>Lista de Productos</h2>

            {loading && (
                <div className={est.centrado}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {error && (
                <div className={est.centrado}>
                    <Alert variant="danger">❌ {error}</Alert>
                </div>
            )}

            {!loading && !error && (
                productosFiltrados.length > 0 ? (
                    <div className={est.gridProductos}>
                        {productosFiltrados.map(producto => (
                            <div key={producto.id} className={est.cardWrapper}>
                                <TarjetaProductoAdmin producto={producto} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={est.centrado}>
                        <p className={est.mensaje}>No hay productos que coincidan con los filtros.</p>
                    </div>
                )
            )}
        </div>
    );
}
