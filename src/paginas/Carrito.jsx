import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import basureroIcon from '../assets/img/iconos/trash-can-solid.svg';
import IntroducirCantCarrito from '../componentes/IntroducirCantCarrito';
import Botones from '../componentes/Botones'

const Carrito = () => {
    const {
        carrito,
        carritoAbierto,
        cerrarCarrito,
        modifCantCarrito,
        vaciarCarrito,
        isAuthenticated,
        setIsAuthenticated 
    } = useContext(CarritoContext);
    console.log('Estado del carrito:', carrito);
    const manejarCambio = (producto, nuevaCantidad) => {
        modifCantCarrito(producto, nuevaCantidad);
    };
    const totalCompra = carrito.reduce(
        (total, item) => total + item.precio * item.quantity,0);

    const manejarPago = () => {
        console.log("Pago en proceso...");
    };
/************************************************************************************************************ */
    let estCarrCajon = {
        position: 'fixed',
        right: 0,
        top: 0,
        width: '600px',
        height: '100%',
        backgroundColor: 'rgb(228, 152, 243)',
        boxShadow: '-2px 0px 10px rgba(0,0,0,0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.4s ease-in-out',
        zIndex: 2000,
        overflowY: 'auto',
    };
    let estCarrCajonAbierto = {
        ...estCarrCajon,
        transform: 'translateX(0%)',
    };
    let estCarrHeader = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#964B96',
        color: 'white',
    };
    let estBotonCerrar = {
        background: 'white',
        border: 'none',
        fontSize: '30px',
        borderRadius: '12px',
        cursor: 'pointer',
        color: 'red',
    };
    let estCarrContenedor = {
        padding: '16px',
    };
    let estMensajeVacio = {
        color: 'red',
        textAlign: 'center',
        marginTop: '20px',
    };
    let estTabla = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
        color: 'black',
    };
    let estThTd = {
        border: '1px solid #ccc',
        padding: '8px',
        textAlign: 'center',
    };
    let estPieTabla = {
        fontWeight: 'bold',
        backgroundColor: 'rgb(150, 98, 160)',
         color: 'white',
    };
    let estBasureroContenedor = {
        marginTop: '20px',
        textAlign: 'center',
    };
    let estBasurero = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    };
    let estBasureroIcon = {
        width: '32px',
        height: '32px',
    };
    let estContenedorBotones={
        display: 'flex',
        justifyContent: 'center',  
        gap: '12px',               
        marginTop: '20px',         
        flexWrap: 'wrap',  
    }

    return (
        <div style={carritoAbierto ? estCarrCajonAbierto : estCarrCajon}>
            <div style={estCarrHeader}>
                <h2>Carrito</h2>
                <h5>Nota: Poniendo a 0 la cantidad en cualquer producto en alguna página se elimina  del carrito</h5>
                <button onClick={cerrarCarrito} style={estBotonCerrar}>×</button>
            </div>

            <div style={estCarrContenedor}>
                {carrito.length === 0 ? (
                    <p style={estMensajeVacio}>El carrito está vacío</p>
                ) : (
                    <>
                        <table style={estTabla}>
                            <thead>
                                <tr>
                                    <th style={estThTd}>Codigo</th>
                                    <th style={estThTd}>Producto</th>
                                    <th style={estThTd}>Precio</th>
                                    <th style={estThTd}>Cantidad</th>
                                    <th style={estThTd}>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carrito.map((item) => (
                                    <tr key={item.id}>
                                        <td style={estThTd}>{item.id}</td>
                                        <td style={estThTd}>{item.nombre}</td>
                                        <td style={estThTd}>${item.precio.toLocaleString('es-AR')}</td>
                                        <td style={estThTd}>
                                            <IntroducirCantCarrito producto={item} />
                                        </td>
                                        <td style={estThTd}>${(item.precio * item.quantity).toLocaleString('es-AR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td style={estPieTabla} colSpan="4">Total</td>
                                    <td style={estPieTabla}>${totalCompra.toLocaleString('es-AR')}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div style={estContenedorBotones}>
                            <div style={estBasureroContenedor}>
                                <button onClick={vaciarCarrito} style={estBasurero} title="Vaciar carrito">
                                    <img src={basureroIcon} alt="Vaciar carrito" style={estBasureroIcon} />
                                </button>
                                <Botones texto="cerrar" color="#5bc0de" onClick={cerrarCarrito} />
                                <Botones texto="Pagar" color="#5cb85c" onClick={manejarPago} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Carrito;