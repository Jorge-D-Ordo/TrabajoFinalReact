import React, { useState, useEffect } from 'react';
import Nav from '../componentes/Nav';
import NavMobile from '../componentes/NavMobile'; // Nuevo
import rosa128px from '../assets/img/logos/rosa_128px.png';
import millanelLogo from '../assets/img/logos/millanel_logo.png';
import styles from './Header.module.css';

const Header = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 576);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className={styles.general}>
            <div className={styles.contenedorInterno}>
                <img src={rosa128px} alt="LogoEmpresa" className={styles.logo} />
                <h1 className={styles.titulo}>Fragancias Argentinas</h1>
                <img src={millanelLogo} alt="LogoMillanel" className={styles.logo} />
            </div>

            {isMobile ? <NavMobile /> : <Nav />}
        </header>
    );
};

export default Header;


