import est from './Inicio.module.css';
import React from "react";
import Header from '../estructura/Header';
import OfertaLista from '../estructura/OfertaLista';
import Footer from "../estructura/Footer";
import Aside from "../estructura/Aside";



const Inicio = () => {


    return (
        <div className={est.general}>
            <Header />
            <div className={est.contenedor}>
                <main className={est.contenido1}>
                    {/*   <h1>Bienvenido a Fragancias Artentinas</h1>
                    <h1>Mira nuestras ofertas</h1>
                    <h2>No te pierdas nuestras Ofertas </h2>
                    <h3>Fragancias Millanel (propias y alternativas olfativas) </h3>
                    */}
                    <p className={est.h1Variante}>¡Hola! Bienvenido</p>
                    <h1>Gracias por visitar nuestro catálogo online de Millanel</h1>
                    <h2>Descubrí las ofertas destacadas </h2>
                    <h3>Fragancias Millanel - propias y alternativas olfativas</h3>

                    <OfertaLista />
                </main>
                <Aside className={est.contenido2}/>
            </div>
            <Footer />
        </div>
    )
}

export default Inicio;
