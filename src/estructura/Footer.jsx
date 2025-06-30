import React from "react";
import facebook from '../assets/img/redes/2023_Facebook_icon.svg';
import twitter from '../assets/img/redes/X_logo_2023.svg';
import instagram from '../assets/img/redes/Instagram_logo_2022.svg';
import linkedin from '../assets/img/redes/linkedIn_icon2.svg';
import telegram from '../assets/img/redes/Telegram_logo.svg';
import whatsapp from '../assets/img/redes/WhatsApp.svg';
import discord from '../assets/img/redes/discord-round-color-icon.svg';


const Footer =()=> {
    

    let estiloLista = {
        listStyle: 'none',
        display: 'flex',
        gap: '35px',
        padding: 0,
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",         
    
    };
    let estilo = {
        backgroundColor: "#ea98ff", 
        padding: "2px", 
        textAlign: "center", 
        width: "100%",  
        margin: 0,       
        
    }
   /* let estilosFlex = {
        display: 'flex',
        alignItems: 'center',    
        justifyContent: 'space-between', 
        padding: '0px 40px',

        height: '60px',
    }
    let estilosFlexRedes = {
        display: 'flex',
        alignItems: 'center',    
        justifyContent: 'space-between', 
        padding: '0px 40px',

        height: '60px',
    }
        */
    let estiloTexto = {
        textAlign: 'center',
        fontFamily: '"Montserrat", serif',
        fontSize : '14px',
        fontWeight: 'bold',
        padding : '10px',
    }
    let estiloIcono = {
        width: '22px',
        height: '22px',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
    }
    let  hoverStyle = {
        cursor: 'pointer',
        opacity: 0.8,
        transform: 'scale(1.1)',
    };

    return (
        <footer style={estilo}>
            <p><span style={estiloTexto}>Dirección:</span> Avenida Rivadavia 5450, CABA, CP 1405</p>
            <p><span style={estiloTexto}>Correo electrónico:</span>  fragancias.argentinas@gmail.com</p>
            <p><span style={estiloTexto}>Teléfono:</span> (11) 5360-XXXX</p>
            <ul style={estiloLista}>
                <li>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={facebook} style={estiloIcono} alt="Facebook" />
                    </a>
                </li>
                <li>
                    <a href="https://x.com/?lang=es" target="_blank" rel="noopener noreferrer">
                        <img src={twitter} style={estiloIcono} alt="X (ex Twitter)" />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} style={estiloIcono} alt="Instagram" />
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin} style={estiloIcono} alt="LinkedIn" />
                    </a>
                </li>
                <li>
                    <a href="https://web.telegram.org/k/" target="_blank" rel="noopener noreferrer">
                        <img src={telegram} style={{ ...estiloIcono, width: '25px' }} alt="Telegram" />
                    </a>
                </li>
                <li>
                    <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
                        <img src={discord} style={{ ...estiloIcono, width: '25px' }} alt="Discord" />
                    </a>
                </li>
                <li>
                    <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
                        <img src={discord} style={{ ...estiloIcono, width: '25px' }} alt="Discord" />
                    </a>
                </li>
                <li>
                    <a href="https://wa.me/549XXXXXXXXXX" target="_blank" rel="noopener noreferrer">
                        <img src={whatsapp} style={{ ...estiloIcono, width: '25px' }} alt="WhatsApp" />
                    </a>
                </li>
            </ul>
            <h5>Millanel cosmetico es marca registrada - Todos los derechos reservados 2024</h5>
            <h5>copy; 2025 - Fragancias Argentinas</h5>
        </footer>
    );
};

export default Footer;