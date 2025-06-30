import React, { useState, useEffect, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const IntroducirCantCarrito = ({ producto }) => {
    const { modifCantCarrito, cantProdEnCarrito } = useContext(CarritoContext);
    const stock = producto.stock;

    const cantidadInicial = cantProdEnCarrito(producto.id);
    const [cantidad, setCantidad] = useState(cantidadInicial);

    useEffect(() => {
        setCantidad(cantProdEnCarrito(producto.id));
    }, [cantProdEnCarrito, producto.id]);

    const manejarCambio = (e) => {
        const valor = e.target.value;

        // Solo permitir números enteros positivos
        if (!/^\d*$/.test(valor)) return;

        let nuevaCantidad = valor === "" ? 0 : parseInt(valor, 10);

        // Validar contra el stock
        if (nuevaCantidad > stock) nuevaCantidad = stock;

        setCantidad(nuevaCantidad);
        modifCantCarrito(producto, nuevaCantidad);
    };
/************************************************************************************************************ */
    const estInputCantidad = {
        width: "60px",
        padding: "6px",
        fontSize: "16px",
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: "4px",
        outline: "none",
        appearance: "none", // elimina flechas en algunos navegadores
        MozAppearance: "textfield", // Firefox
    }

    return (
        <input
            type="text"
            value={cantidad}
            onChange={manejarCambio}
            style={estInputCantidad}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="3"
            placeholder="0"
        />
    );
};

export default IntroducirCantCarrito;
