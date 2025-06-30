import est from './Galeria.module.css'
import React from "react";
import Header from '../estructura/Header';
import ProductoLista from '../estructura/ProductoLista';
import Footer from "../estructura/Footer";
import Aside from "../estructura/Aside";

const Galeria = () => {
    return (
        <div className={est.general}>
            <Header />
            <div className={est.contenedor}>
                <main className={est.contenido1}>
                    <h1 className={est.h1Variante}>Explorá nuestra lista de fragancias </h1>

                    <ProductoLista />
                </main>
                <Aside className={est.contenido2} />
            </div>
            <Footer />
        </div>

    )
}

export default Galeria;