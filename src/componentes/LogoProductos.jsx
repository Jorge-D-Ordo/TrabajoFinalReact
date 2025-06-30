import React from 'react';
import logo from '../assets/img/logos/millanel_logo.png';

const LogoProductos = () => (
    <div className="logo-productos">
        <a href="https://www.millanel.com" target="_blank" rel="noreferrer">
            <img className="logo" src={logo} alt="logo de millanel cosméticos" />
        </a>
    </div>
);

export default LogoProductos;