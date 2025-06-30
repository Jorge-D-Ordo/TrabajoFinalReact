import React from "react";
import Header from '../estructura/Header';
import Footer from "../estructura/Footer";
import { Link } from 'react-router-dom';

const  ErrorPagina=()=> {

    let estilos = {
        padding: "50px",
        paddingTop: "115px",
        backgroundColor: "#ea98ff", 
        textAlign: "center", 
        color: "red",

    }



    return ( 
        <>
            
            <Header />  
            <div style={estilos}>
                <h1>Error 404: Página no encontrada</h1>;
                <button><Link to='/'>Volver al inicio</Link></button>
            </div>

        </>
    )
}



export default ErrorPagina;