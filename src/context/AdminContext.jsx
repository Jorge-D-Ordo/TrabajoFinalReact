 import React, { createContext, useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";

export const AdminContext = createContext();

const API_URL = "https://68573e0121f5d3463e54ccee.mockapi.io/api/V1/ListadoEjemplo";

export const AdminProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seleccionado, setSeleccionado] = useState(null);

    const cargarProductos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Error al obtener los productos");
            const data = await res.json();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        cargarProductos();
    }, [cargarProductos]);

    const agregarProducto = async (productoNuevo) => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoNuevo),
            });
            if (!res.ok) throw new Error('Error al agregar producto');
            await res.json();
            Swal.fire("✅", "Producto agregado correctamente", "success");
            cargarProductos();
        } catch (err) {
            console.error(err.message);
        }
    };

    const actualizarProducto = async (productoEditado) => {
        try {
            const res = await fetch(`${API_URL}/${productoEditado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoEditado),
            });
            if (!res.ok) throw new Error("Error al actualizar producto");
            await res.json();
            Swal.fire("✏️", "Producto actualizado", "info");
            setSeleccionado(null);
            cargarProductos();
        } catch (err) {
            console.error(err.message);
        }
    };

    const eliminarProducto = async (id) => {
        const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
        if (!confirmar) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Error al eliminar producto");
            Swal.fire("🗑️", "Producto eliminado", "error");
            cargarProductos();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <AdminContext.Provider
            value={{
                productos,
                loading,
                error,
                seleccionado,
                setSeleccionado,
                agregarProducto,
                actualizarProducto,
                eliminarProducto,
                cargarProductos,
                cantidadProductos: productos.length
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
