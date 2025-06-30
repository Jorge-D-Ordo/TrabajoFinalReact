import React from 'react'

const Botones = ({texto, color, ancho, onClick}) => {
    let estilo = {
        backgroundColor: color,
        width: ancho,
        color: 'white',
        fontWeight: '600',
        border: 'none',
        padding: '8px 4px',
        borderRadius: '10px',
        cursor: 'pointer',
        margin: '0 5px',
    }

    return (
        <button style={estilo} onClick={onClick}>{texto}</button>
    );
};

export default Botones;
