import React from "react";
import styles from './Footer.module.css';
import facebook from '../assets/img/redes/2023_Facebook_icon.svg';
import twitter from '../assets/img/redes/X_logo_2023.svg';
import instagram from '../assets/img/redes/Instagram_logo_2022.svg';
import linkedin from '../assets/img/redes/linkedIn_icon2.svg';
import telegram from '../assets/img/redes/Telegram_logo.svg';
import whatsapp from '../assets/img/redes/WhatsApp.svg';
import discord from '../assets/img/redes/discord-round-color-icon.svg';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.infoItem}>
                <span className={styles.label}>Dirección:</span>{" "}
                <span className={styles.value}>Avenida Rivadavia 5450, CABA, CP 1405</span>
            </p>
            <p className={styles.infoItem}>
                <span className={styles.label}>Correo electrónico:</span>{" "}
                <span className={styles.value}>fragancias.argentinas@gmail.com</span>
            </p>
            <p className={styles.infoItem}>
                <span className={styles.label}>Teléfono:</span>{" "}
                <span className={styles.value}>(11) 5360-XXXX</span>
            </p>

            <ul className={styles.redes}>
                <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebook} className={styles.iconoRed} alt="Facebook" /></a></li>
                <li><a href="https://x.com/?lang=es" target="_blank" rel="noopener noreferrer"><img src={twitter} className={styles.iconoRed} alt="X (Twitter)" /></a></li>
                <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src={instagram} className={styles.iconoRed} alt="Instagram" /></a></li>
                <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><img src={linkedin} className={styles.iconoRed} alt="LinkedIn" /></a></li>
                <li><a href="https://web.telegram.org/k/" target="_blank" rel="noopener noreferrer"><img src={telegram} className={styles.iconoRed} alt="Telegram" /></a></li>
                <li><a href="https://discord.com/" target="_blank" rel="noopener noreferrer"><img src={discord} className={styles.iconoRed} alt="Discord" /></a></li>
                <li><a href="https://wa.me/549XXXXXXXXXX" target="_blank" rel="noopener noreferrer"><img src={whatsapp} className={styles.iconoRed} alt="WhatsApp" /></a></li>
            </ul>

            <h5 className={styles.copyright}>Millanel cosmético es marca registrada - Todos los derechos reservados 2024</h5>
            <h5 className={styles.copyright}>&copy; 2025 - Fragancias Argentinas</h5>
        </footer>
    );
};

export default Footer;
