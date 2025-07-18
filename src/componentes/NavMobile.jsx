import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import carritoIco from '../assets/img/iconos/CarritoCompras1.svg';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import styles from './NavMobile.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavMobile = () => {
    const { carritoAbierto, abrirCarrito } = useContext(CarritoContext);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    const irAlCarrito = () => {
        if (isAuthenticated) {
            abrirCarrito();
        } else {
            navigate('/Login');
        }
    };

    return (
        <>
            {/* Barra superior con Ofertas, Productos, carrito y hamburguesa */}
            <div className={styles.navBar}>
                <Link to="/" className={styles.link}>Ofertas</Link>
                <Link to="/Galeria" className={styles.link}>Productos</Link>
                <button onClick={irAlCarrito} className={styles.carritoBtn}>
                    <img src={carritoIco} alt="Carrito" className={styles.carritoIcon} />
                </button>
                <button className={styles.menuBtn} onClick={toggleMenu}>
                    {menuAbierto ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Menú hamburguesa desplegable */}
            {menuAbierto && (
                <div className={styles.menuDesplegable}>
                    <Link to="/Nosotros" className={styles.menuItem} onClick={toggleMenu}>Nosotros</Link>
                    <Link to="/Contacto" className={styles.menuItem} onClick={toggleMenu}>Contacto</Link>
                    <Link to="/Login" className={styles.menuItem} onClick={toggleMenu}>Login</Link>
                </div>
            )}
        </>
    );
};

export default NavMobile;
