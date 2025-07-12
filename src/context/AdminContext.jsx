import React, {createContext, useEffect, useState, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const AdminContext = createContext();

const API_URL =
    "https://68573e0121f5d3463e54ccee.mockapi.io/api/V1/ListadoEjemplo";

export const AdminProvider = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
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
            toast.error("❌ " + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            cargarProductos();
        } else {
            // Si el usuario no está autenticado, limpiamos el contexto
            setProductos([]);
            setSeleccionado(null);
        }
    }, [isAuthenticated, cargarProductos]);

    const agregarProducto = async (productoNuevo) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoNuevo),
            });
            if (!res.ok) throw new Error("Error al agregar producto");
            await res.json();
            toast.success("✅ Producto agregado correctamente");
            cargarProductos();
        } catch (err) {
            toast.error("❌ " + err.message);
            console.error(err.message);
        }
    };

    const actualizarProducto = async (productoEditado) => {
        try {
            const res = await fetch(`${API_URL}/${productoEditado.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoEditado),
            });
            if (!res.ok) throw new Error("Error al actualizar producto");
            await res.json();
            toast.info("✏️ Producto actualizado correctamente");
            setSeleccionado(null);
            cargarProductos();
        } catch (err) {
            toast.error("❌ " + err.message);
            console.error(err.message);
        }
    };

    const eliminarProducto = async (id) => {
        const toastId = toast.info(
            ({ closeToast }) => (
                <div>
                    <p>¿Seguro que deseas eliminar este producto?</p>
                    <button
                        onClick={async () => {
                            closeToast();
                            try {
                                const res = await fetch(`${API_URL}/${id}`, {
                                    method: "DELETE",
                                });
                                if (!res.ok) throw new Error("Error al eliminar producto");
                                toast.error("🗑️ Producto eliminado correctamente");
                                cargarProductos();
                            } catch (err) {
                                toast.error("❌ " + err.message);
                                console.error(err.message);
                            }
                        }}
                        style={{ marginRight: "8px" }}
                    >
                        Sí
                    </button>
                    <button onClick={closeToast}>No</button>
                </div>
            ),
            {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
            }
        );
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
                cantidadProductos: productos.length,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};