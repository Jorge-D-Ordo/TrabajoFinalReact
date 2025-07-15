import React from 'react';
import estilos from './Botones.module.css';

const Botones = ({ texto, color, ancho, onClick }) => {
  const estiloInline = {
    backgroundColor: color,
    width: ancho,
  };

  return (
    <button
      className={estilos.botonGenerico}
      style={estiloInline}
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default Botones;
