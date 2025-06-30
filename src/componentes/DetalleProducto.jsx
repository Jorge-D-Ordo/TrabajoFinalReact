import React from "react";
import { useParams } from 'react-router-dom';

const DetalleProducto =() => {
    const {id} = useParams()

  /* DetalleProducto = ({productos}) => {
    console.log(productos):
    
    const {id} =useParams()
    const product= productos.find(producto =>producto.id===id) */
    
    
    





    console.log(id, campania);
    return (
        <div>
            <h1> detalle producto {id}</h1>
        /*   { product ? (<h2>{product.nombre} </h2>): (<p>Producto no encontontrado</p>)}; */
            <hi> detalle campania {campania}</hi>
        </div>
    );
};

export default DetalleProducto;