import React, { useContext, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { ProductosContext } from '../context/ProductosContext'; // Ajusta la ruta según tu proyecto
import TarjetaProducto from '../componentes/TarjetaProducto';
import TarjetaOferta from '../componentes/TarjetaOferta';


const detalleProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { productosConPrecioPorCampania } = useContext(ProductosContext);

    const producto = productosConPrecioPorCampania().find(p => p.id === parseInt(id));
    const { productos, productoListaCargado, errorProd } = useContext(ProductosContext);


    const [modalAbierto, setModalAbierto] = useState(false);

    //if (productoListaCargado) return <p>Cargando producto...</p>;
    //if (errorProd) return <p>Error cargando productos.</p>;

    const product = productos.find(producto => producto.id == id)

    if (!product) return <p>Producto no encontrado</p>;

 /************************************************************************************************************ */
    const estVentana = {
        position: "fixed",
        top: "10%",
        left: "10%",
        width: "80%",
        height: "80%",
        background: "rgba(255,255,255,0.98)",
        padding: "1rem",
        zIndex: 999,
        overflowY: "auto",
        boxShadow: "0 0 30px rgba(0,0,0,0.4)",
    };
    const botonCerrar = {
        position: "absolute",
        top: "1rem",
        right: "1rem",
        fontSize: "20px",
        background: "red",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        cursor: "pointer",
    };



    return (
        <div>
            <div style={estVentana}>
      <button style={botonCerrar} onClick={() => navigate(-1)}>X</button>
      <TarjetaOferta producto={producto} />
    </div>
  );










      {/*}      <h1>Detalle del producto: {product.nombre}</h1>
            <button onClick={() => setModalAbierto(true)}>Ver detalles en ventana emergente</button>

            {modalAbierto && (
                <EmergDetProducto 
                producto={product} 
                onClose={() => setModalAbierto(false)} 
                />
        )}
*/}

{/*}        <h1>Detalle del producto: {id}</h1>
        {product ? (
            <>
            <h2>{product.nombre}</h2>
            <p>Precio: ${product.precio?.toLocaleString('es-AR') || 'N/A'}</p>
            <p>Notas: {product.notas}</p>
             Muestra más campos si quieres
            </>
        ) : (
            <p>Producto no encontrado</p>
        )} */}


        </div>
    );
};


export default detalleProducto
