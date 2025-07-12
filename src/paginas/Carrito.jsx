import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import basureroIcon from "../assets/img/iconos/trash-can-solid.svg";
import IntroducirCantCarrito from "../componentes/IntroducirCantCarrito";
import Botones from "../componentes/Botones";
import styles from "./Carrito.module.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Carrito = () => {
    const {
        carrito,
        carritoAbierto,
        cerrarCarrito,
        modifCantCarrito,
        vaciarCarrito
    } = useContext(CarritoContext);

    const { isAuthenticated } = useContext(AuthContext);

    const totalCompra = carrito.reduce(
        (total, item) => total + item.precio * item.quantity,
        0
    );

    const manejarPago = () => {
        if (!isAuthenticated) {
            toast.error("Debes iniciar sesión para continuar con el pago");
            return;
        }

        toast.info("Procesando la compra...", {
            autoClose: 1500
        });

        setTimeout(() => {
            toast.success("Compra realizada con éxito. ¡Gracias por su compra!");
            vaciarCarrito();
            cerrarCarrito();
        }, 2000);
    };

    return (
        <div className={carritoAbierto ? styles.cajonAbierto : styles.cajon}>
            <div className={styles.header}>
                <h2>Carrito</h2>
                <h5>
                    Nota: Poniendo a 0 la cantidad en cualquier producto se elimina del carrito
                </h5>
                <button onClick={cerrarCarrito} className={styles.botonCerrar}>×</button>
            </div>

            <div className={styles.contenedor}>
                {carrito.length === 0 ? (
                    <p className={styles.mensajeVacio}>El carrito está vacío</p>
                ) : (
                    <>
                        <table className={styles.tabla}>
                            <thead>
                                <tr>
                                    <th className={styles.celda}>Código</th>
                                    <th className={styles.celda}>Producto</th>
                                    <th className={styles.celda}>Precio</th>
                                    <th className={styles.celda}>Cantidad</th>
                                    <th className={styles.celda}>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carrito.map((item) => (
                                    <tr key={item.id}>
                                        <td className={styles.celda}>{item.id}</td>
                                        <td className={styles.celda}>{item.nombre}</td>
                                        <td className={styles.celda}>${item.precio.toLocaleString('es-AR')}</td>
                                        <td className={styles.celda}>
                                            <IntroducirCantCarrito producto={item} />
                                        </td>
                                        <td className={styles.celda}>
                                            ${(item.precio * item.quantity).toLocaleString('es-AR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className={styles.pieTabla} colSpan="4">Total</td>
                                    <td className={styles.pieTabla}>${totalCompra.toLocaleString('es-AR')}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className={styles.botonesContenedor}>
                            <button onClick={vaciarCarrito} className={styles.basurero}>
                                <img src={basureroIcon} alt="Vaciar carrito" className={styles.basureroIcono} />
                            </button>
                            <Botones texto="Continuar" color="#5bc0de" onClick={cerrarCarrito} />
                            <Botones texto="Pagar" color="#5cb85c" onClick={manejarPago} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Carrito;