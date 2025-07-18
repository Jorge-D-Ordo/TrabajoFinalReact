import React from 'react';
import Header from '../estructura/Header';
import Aside from '../estructura/Aside';
import Footer from '../estructura/Footer';

const Nosotros = () => {
    const containerStyle = {
        display: 'flex',
        paddingTop: '160px',
        padding: '20px',
        gap: '10px',          
    };
    const mainStyle = {
        flex: 3, 
        boxSizing: "border-box",
        backgroundColor: '#f9e8fd',
        border:'0',
        width: '100%',         
    };
    const contentStyle = {
        padding: '2rem',
        backgroundColor: '#f9e8fd',
        color: '#333',
        lineHeight: '1.6',
        fontFamily: '"Montserrat", sans-serif',
        margin: '0px',
        border:'0px',    
        boxSizing: "border-box",   
    };
    const spanRazonSocial = {
        fontWeight: 'bold',
        color: '#bb39c2'
    };
    const titulo = {
        fontSize: '2rem',
        marginBottom: '1rem'
    };
    const subtitulo = {
        fontSize: '1.4rem',
        marginTop: '1.5rem'
    };
    const lista = {
        marginTop: '1rem',
        paddingLeft: '1.2rem'
    };
    const itemLista = {
        marginBottom: '1rem'
    };
    const negrita = {
        fontWeight: 'bold',
        color: '#6b1d7e'
    };

    return (
        <>
            <Header />
            <div style={containerStyle}>
                <main style={mainStyle}>
                <div style={contentStyle}>
                    <h1 style={titulo}>Nosotros</h1>

                    <h3 style={subtitulo}>Bienvenidos a <span style={spanRazonSocial}>Fragancias Argentinas</span></h3>
                    <p>En <span style={spanRazonSocial}>Fragancias Argentinas</span>, somos revendedores apasionados de Millanel Cosmética, especializados en ofrecer fragancias alternativas (de diseñador) y exclusivas de Millanel. Nuestro objetivo es proporcionar a nuestros clientes una experiencia única a través de productos que no solo son de alta calidad, sino también éticos.</p>

                    <h3 style={subtitulo}>¿Quiénes somos?</h3>
                    <p>Nos dedicamos a la distribución de fragancias tanto para mujeres, hombres como unisex. Cada una de nuestras opciones está diseñada para captar la esencia de la sofisticación y la elegancia, permitiendo a nuestros clientes encontrar su aroma perfecto.</p>

                    <h3 style={subtitulo}>Compromiso con el bienestar</h3>
                    <p>Todos nuestros productos son veganos y cruelty-free, lo que significa que están formulados sin ingredientes de origen animal y no han sido probados en animales.</p>

                    <h3 style={subtitulo}>¿Por qué elegirnos?</h3>
                    <ul style={lista}>
                        <li style={itemLista}>
                            <span style={negrita}>Calidad Garantizada:</span> Productos Millanel con reconocimiento de calidad.
                        </li>
                        <li style={itemLista}>
                            <span style={negrita}>Variedad de Opciones:</span> Fragancias para todos los estilos.
                        </li>
                        <li style={itemLista}>
                            <span style={negrita}>Atención Personalizada:</span> Te ayudamos a encontrar tu aroma ideal.
                        </li>
                        <li style={itemLista}>
                            <span style={negrita}>Precios Económicos:</span> Lujo accesible con precios competitivos.
                        </li>
                    </ul>
                    
                    <p>Te invitamos a descubrir nuestras fragancias alternativas exclusivas de Millanel.</p>
                    <h4 style={{ marginTop: '1.5rem' }}>En <span style={spanRazonSocial}>Fragancias Argentinas</span>, la belleza y el compromiso con el bienestar van de la mano.</h4>
                </div>
                </main>

                <Aside style={{ flex: 1 }} />
            </div>
            <Footer />
        </>
    );
};

export default Nosotros;
