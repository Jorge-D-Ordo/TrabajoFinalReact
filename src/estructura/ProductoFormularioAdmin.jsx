import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import est from "./ProductoFormularioAdmin.module.css";
import jsonBase from "../datos/listaMillanelProductosMockapi.json";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductoFormularioAdmin = ({ onClose }) => {
    const {
        agregarProducto,
        actualizarProducto,
        seleccionado,
        setSeleccionado,
        cantidadProductos
    } = useContext(AdminContext);

    const productoInicial = {
        nombre: "",
        descripcion: "",
        presentacion: "",
        Linea: "",
        imagen1: "SinImagen.png",
        imagen2: "SinImagen.png",
        genero: "",
        familia: "",
        notas: "",
        inspiracion: "",
        intensidad: "",
        uso: "",
        stock: 0,
        alta: Date.now(),
        baja: 0,
        id: null,
        idProd: 0,
        precio: 19999.99,
    };

    const [form, setForm] = useState(productoInicial);
    const [baseProducto, setBaseProducto] = useState(productoInicial);
    const [productoPrecargado, setProductoPrecargado] = useState(null);

    useEffect(() => {
        if (productoPrecargado || jsonBase.length === 0) return;

        const index = cantidadProductos;

        if (index >= jsonBase.length) {
            console.warn(`⚠️ No hay producto en la posición ${index} del JSON base`);
            crearProductoVacio();
            return;
        }

        precargarProducto(index);
    }, [cantidadProductos, productoPrecargado]);

    const precargarProducto = (index) => {
        const ejemplo = jsonBase[index];

        const productoBase = {
            ...productoInicial,
            ...ejemplo,
            id: null,
            idProd: Number(ejemplo.idProd) || Number(ejemplo.id) || 0,
            alta: Date.now(),
            precio: ejemplo.precio ?? 1999,
            stock: ejemplo.stock ?? 0,
            imagen1: ejemplo.imagen1 || "SinImagen.png",
            imagen2: ejemplo.imagen2 || "SinImagen.png",
        };

        setProductoPrecargado(productoBase);
        setBaseProducto(productoBase);
        setForm(productoBase);
    };

    useEffect(() => {
        if (seleccionado) {
            setForm(seleccionado);
        }
    }, [seleccionado]);

    const crearProductoVacio = () => {
        setProductoPrecargado(productoInicial);
        setBaseProducto(productoInicial);
        setForm(productoInicial);
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const validarFormulario = () => {
        const errores = [];

        if (form.idProd <= 0) errores.push("El ID del producto debe ser mayor que cero.");
        if (!form.nombre || form.nombre.trim().length < 4) errores.push("El nombre es obligatorio. y al menos 4 caracteres");
        if (form.precio <= 0) errores.push("El precio debe ser mayor que cero.");
        if (form.stock < 0) errores.push("El stock no puede ser negativo.");
        if (!form.descripcion || form.descripcion.trim().length < 10) errores.push("La descripción debe tener al menos 10 caracteres.");

        if (errores.length > 0) {
            errores.forEach((err) => toast.error("⚠️ " + err));
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        try {
            const productoParaEnviar = { ...form };
            delete productoParaEnviar.id;

            if (form.id) {
                await actualizarProducto(form);// Producto actualizado correctamente
            } else {
                await agregarProducto(productoParaEnviar);//Producto agregado correctamente
                const siguienteIndex = cantidadProductos + 1;
                if (siguienteIndex < jsonBase.length) {
                    precargarProducto(siguienteIndex);
                } else {
                    crearProductoVacio();
                }
            }

            setSeleccionado(null);
            if (onClose) onClose();
        } catch (error) {
            toast.error("❌ Error al guardar el producto");
            console.error("Error en submit:", error);
        }
    };

    const cerrarFormulario = () => {
        setSeleccionado(null);
        if (onClose) onClose();
    };

    return (
        <form className={est.formulario} onSubmit={handleSubmit}>
            <h3>{form.id ? "✏️ Editar Producto" : "➕ Agregar Producto"}</h3> // encabezado dependiente del llmado

            <label htmlFor="idProd">ID del Producto</label>
            <input id="idProd" name="idProd" type="number" value={form.idProd} onChange={handleChange} required />

            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange}  />

            <label htmlFor="descripcion">Descripción</label>
            <input id="descripcion" name="descripcion" value={form.descripcion} onChange={handleChange} />

            <label htmlFor="presentacion">Presentación</label>
            <input id="presentacion" name="presentacion" value={form.presentacion} onChange={handleChange} />

            <label htmlFor="Linea">Línea</label>
            <input id="Linea" name="Linea" value={form.Linea} onChange={handleChange} />

            <label htmlFor="imagen1">Imagen 1</label>
            <input id="imagen1" name="imagen1" value={form.imagen1} onChange={handleChange} />

            <label htmlFor="imagen2">Imagen 2</label>
            <input id="imagen2" name="imagen2" value={form.imagen2} onChange={handleChange} />

            <label htmlFor="genero">Género</label>
            <select id="genero" name="genero" value={form.genero} onChange={handleChange}>
                <option value="">Seleccione...</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Ambos">Ambos</option>
            </select>

            <label htmlFor="familia">Familia</label>
            <input id="familia" name="familia" value={form.familia} onChange={handleChange} />

            <label htmlFor="notas">Notas</label>
            <input id="notas" name="notas" value={form.notas} onChange={handleChange} />

            <label htmlFor="inspiracion">Inspiración</label>
            <input id="inspiracion" name="inspiracion" value={form.inspiracion} onChange={handleChange} />

            <label htmlFor="intensidad">Intensidad</label>
            <input id="intensidad" name="intensidad" value={form.intensidad} onChange={handleChange} />

            <label htmlFor="uso">Uso</label>
            <input id="uso" name="uso" value={form.uso} onChange={handleChange} />

            <label htmlFor="stock">Stock</label>
            <input id="stock" name="stock" type="number" value={form.stock} onChange={handleChange} />

            <label htmlFor="precio">Precio</label>
            <input id="precio" name="precio" type="number" value={form.precio} onChange={handleChange} />

            <div className={est.botones}>
                <button type="submit">
                    <FaSave /> {form.id ? "Guardar Cambios" : "Agregar Producto"}
                </button>
                <button type="button" onClick={cerrarFormulario}>
                    <FaTimes /> Cancelar
                </button>
            </div>
        </form>
    );
};

export default ProductoFormularioAdmin;
