import est from './BotonesCantidad.module.css';
import React, { useState, useEffect } from 'react';

const BotonesCantidad = ({ onCantidadCambio, stock = 0, color ,valorInicial }) => {
    const [contador, setContador] = useState(valorInicial);

    
    useEffect(() => {
        setContador(valorInicial);
    }, [valorInicial]);

    useEffect(() => {
        onCantidadCambio(contador);
    }, [contador]);

    const incrementar = () => {
        if (contador < stock) {
            setContador(contador + 1);
        }
    };
    const decrementar = () => {
        if (contador > 0) {
            setContador(contador - 1);
        }
    };




    return (
        <div className={est.estContenedor} style={{ border: `3px solid ${color}` }}>
            <button onClick={(e) => { e.stopPropagation(); decrementar(); }} className={est.estCantBoton}style={{ backgroundColor: color }}>-</button>
            <span className={est.estContador}>{contador}</span>
            <button onClick={(e) => { e.stopPropagation(); incrementar(); }} className={est.estCantBoton}style={{ backgroundColor: color }}>+</button>
        </div>
    );
};

export default BotonesCantidad;
