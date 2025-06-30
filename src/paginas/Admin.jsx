
import React from "react";
import Header from "../estructura/Header";
import Footer from "../estructura/Footer";
import Aside from "../estructura/Aside";
import ProductoListaMockApi from "../estructura/ProductoListaMockApi";
import est from "./Admin.module.css"; // Asegurate de crear este archivo para estilos opcionales

const Admin = () => {
    return (
        <div className={est.general}>
            <Header />
            <div className={est.contenedor}>
                <main className={est.contenido1}>
                    <h1 className={est.h1Variante}>📦 Administración de Productos MockAPI</h1>
                    <ProductoListaMockApi />
                </main>
                <Aside className={est.contenido2} />
            </div>
            <Footer />
        </div>
    );
};

export default Admin;
