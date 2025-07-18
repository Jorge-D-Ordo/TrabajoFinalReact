import React, { useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import carritoIco from '../assets/img/iconos/CarritoCompras1.svg';
import Carrito from "../paginas/Carrito";
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const { carritoAbierto, abrirCarrito } = useContext(CarritoContext);

    const irAlCarrito = () => {
        if (isAuthenticated) {
            abrirCarrito();
        } else {
            navigate('/Login');
        }
    };

    let estiloNav = {
        backgroundColor: "#ea98ff",
        color: 'black',
        border: 'none',
        padding: '5px',
        paddingTop: '15px'
    };
    let estilo = {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '0',
        alignItems: 'center',
        fontSize: '28px',
    };
    let estiloLink = {
        color: 'black',
        textDecoration: 'none',
        fontSize: '25px'
    };
    let estiloIco = {
        width: '28px',
        height: 'auto',
        marginLeft: '10px',
        cursor: 'pointer'
    };
    let estCarrito = {
        background: "none",
        border: "none",
        cursor: "pointer"
    };

    return (
        <>
            <nav style={estiloNav}>
                <ul style={estilo}>
                    <li><Link to="/" style={estiloLink}>Ofertas</Link></li>
                    <li><Link to="/Galeria" style={estiloLink}>Productos</Link></li>
                    <li><Link to="/Nosotros" style={estiloLink}>Nosotros</Link></li>
                    <li><Link to="/Contacto" style={estiloLink}>Contacto</Link></li>
                    <li><Link to="/Login" style={estiloLink}>Login</Link></li>
                    <li>
                        <button onClick={irAlCarrito} style={estCarrito}>
                            <img src={carritoIco} style={estiloIco} alt="logo del carrito de compras" />
                        </button>
                    </li>
                </ul>
            </nav>
            {carritoAbierto && <Carrito />}
        </>
    );
};

export default Nav;
