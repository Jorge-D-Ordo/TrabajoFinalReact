import React from 'react';
import logo from '../assets/img/logos/rosa _128px.png';

const LogoInstitucional = () => (
    <div className="logo-institucional">
        <a href="/">
            <img className="logo" src={logo} alt="logo de Fragancias Argentinas, un dibujo de la flor de la rosa" />
        </a>
    </div>
);

export default LogoInstitucional;