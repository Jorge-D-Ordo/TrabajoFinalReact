import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [error, setError] = useState(null);

  const abrirCarrito = () => setCarritoAbierto(true);
  const cerrarCarrito = () => setCarritoAbierto(false);
  const vaciarCarrito = () => setCarrito([]); // Vacía todo el carrito

  // Mostrar el carrito cada vez que cambia
  useEffect(() => {
  }, [carrito]);

  // Agregar o aumentar la cantidad de un producto en el carrito
  const agregarAlCarrito = (producto) => {
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);
    if (productoEnCarrito) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, quantity: 1 }]);
    }
  };

  // Eliminar o reducir la cantidad de un producto en el carrito
  const sacarDelCarrito = (producto) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) => {
          if (item.id === producto.id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null; // Si quantity es 1, lo eliminamos
            }
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  // Modificar la cantidad de un producto en el carrito
  const modifCantCarrito = (producto, nuevaCantidad) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id
      );

      if (nuevaCantidad <= 0) {
        return prevCarrito.filter((item) => item.id !== producto.id);
      }

      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: nuevaCantidad }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, quantity: nuevaCantidad }];
      }
    });
  };

  const cantProdEnCarrito = (idProducto) => {
    const producto = carrito.find((item) => item.id === idProducto);
    return producto ? producto.quantity : 0;
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        abrirCarrito,
        cerrarCarrito,
        carritoAbierto,
        agregarAlCarrito,
        sacarDelCarrito,
        error,
        vaciarCarrito,
        modifCantCarrito,
        cantProdEnCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
