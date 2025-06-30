import React, { useState , useEffect, useContext} from "react";
import { ProductosContext } from "../context/ProductosContext";

const campaniaActual = "2025-05";  // Luego automatizar

const CarritoLista=()=> {
    const {
        productos,listaPrecios,productoListaCargado,listaPreciosCargado,errorProd,errorPrecio
    } =useContext(ProductosContext)
        
    const productosConPrecio = productos.map((prod) => {
        const precioEncontrado = listaPrecios.find(
            (precio) =>
                precio.idProducto === prod.id && precio.campania === campaniaActual
        );
        return {
            ...prod,
            precio: precioEncontrado ? precioEncontrado.precio : "No disponible",
        };
    });
        

    return ( 
        <>
            <h1>Lista de Productos - Campaña {campaniaActual}</h1>
            {productoListaCargado && <p>Cargando productos...</p>}
            {errorProd && <p>Error al cargar productos.</p>}
            {!productoListaCargado && productos.length > 0 && (
                <ul>
                {productos.map((prod, index) => (
                    <li key={index}>
                    Id : {prod.id}    Nombre :{ prod.nombre} :{ prod.precio}</li> 
                ))}
                </ul>
            )}
        </>
    )
}

export default CarritoLista;