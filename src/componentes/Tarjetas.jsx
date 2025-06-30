import React from "react";
import Boton from './Botones'

const estilo = {
    width: '300px', 
    heigth: '100px !important', 
    backgroundColor: 'white', 
    padding: '20px', 
    border: '1px solid #ccc', 
    borderRadius: '5px', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    margin: '20px' 
};

function Tarjeta({id,titulo, img, descripcion, botonTexto,botonColor}){
    return(
        <div className='promos' style={estilo}>
            <div id={id}>
                <h2>{titulo}</h2>
                <p>{descripcion}</p>
                <img src={img} alt="Imagen de la tarjeta" />
                <Boton texto={botonTexto} color={botonColor}/>
            </div>
        </div>
    );
}

export default Tarjeta;