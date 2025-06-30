// <Gracias a ChatGtp pude importar el formulario propio del curso anterior,
//      con sus validaciones de HTML,CSS y JS a formato React
//      el pincipal cambio fue eliminar el manejo directo del DOM 

import React, { useState } from 'react';

const FormularioContacto = () => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        email: '',
        provincia: '0',
        telefono: '',
        mensaje: '',
    });

    const [errors, setErrors] = useState({});

    // ✅ Validación individual por campo
    const validateField = (name, value) => {
        let error = '';
        const nombreCompletoRegEx = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+){0,7}$/;
        const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
        const telefonoRegEx = /^[0-9]{10,12}$/;

        switch (name) {
            case 'nombreCompleto':
                if (!nombreCompletoRegEx.test(value.trim()) || value.trim().length < 3) {
                    error = 'Debe ingresar un nombre válido con al menos 3 caracteres.';
                }
                break;
            case 'email':
                if (!emailRegEx.test(value.trim())) {
                    error = 'Formato de correo electrónico inválido.';
                }
                break;
            case 'provincia':
                if (value === '0') {
                    error = 'Seleccione una provincia válida.';
                }
                break;
            case 'telefono':
                if (value && !telefonoRegEx.test(value.trim())) {
                    error = 'Ingrese un teléfono válido de 10 a 12 dígitos.';
                }
                break;
            case 'mensaje':
                if (value.trim().length < 5 || value.trim().length > 400) {
                    error = 'El mensaje debe tener entre 5 y 400 caracteres.';
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    // ✅ Manejo de cambio con validación en vivo
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        validateField(name, value);
    };

    // ✅ Validación total (solo al enviar)
    const isFormValid = () => {
        let isValid = true;
        Object.entries(formData).forEach(([name, value]) => {
            validateField(name, value);
            if (value.trim() === '' || errors[name]) {
                isValid = false;
            }
        });
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            alert('Formulario enviado correctamente.');
            console.log(formData);
            handleReset();
        }
    };

    const handleReset = () => {
        setFormData({
            nombreCompleto: '',
            email: '',
            provincia: '0',
            telefono: '',
            mensaje: '',
        });
        setErrors({});
    };


    const formStyle = {
        display: 'grid',
        gap: '1rem',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
    };

    const inputStyle = {
        width: '100%',
        padding: '0.8rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
    };

    const textareaStyle = {
        ...inputStyle,
        resize: 'vertical',
        minHeight: '100px',
    };

    const selectStyle = { ...inputStyle };

    const errorTextStyle = {
        color: 'red',
        fontSize: '0.875rem',
    };

    const buttonStyle = {
        padding: '0.8rem 1.5rem',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        color: 'white',
    };

    const submitStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff',
    };

    const resetStyle = {
        ...buttonStyle,
        backgroundColor: '#dc3545',
    };

    const buttonGroupStyle = {
        display: 'flex',
        gap: '1rem',
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <div>
                <input
                    type="text"
                    name="nombreCompleto"
                    value={formData.nombreCompleto}
                    onChange={handleChange}
                    placeholder="Nombre completo"
                    style={inputStyle}
                />
                {errors.nombreCompleto && <small style={errorTextStyle}>{errors.nombreCompleto}</small>}
            </div>

            <div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    style={inputStyle}
                />
                {errors.email && <small style={errorTextStyle}>{errors.email}</small>}
            </div>

            <div>
                <select
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleChange}
                    style={selectStyle}
                >
                    <option value="0">Seleccionar</option>
                    <option value="2">CABA</option>
                    <option value="6">Buenos Aires</option>
                    <option value="10">Catamarca</option>
                    <option value="22">Chaco</option>
                    <option value="26">Chubut</option>
                    <option value="14">Córdoba</option>
                    <option value="18">Corrientes</option>
                    <option value="30">Entre Ríos</option>
                    <option value="34">Formosa</option>
                    <option value="38">Jujuy</option>
                    <option value="42">La Pampa</option>
                    <option value="46">La Rioja</option>
                    <option value="50">Mendoza</option>
                    <option value="54">Misiones</option>
                    <option value="58">Neuquén</option>
                    <option value="62">Río Negro</option>
                    <option value="66">Salta</option>
                    <option value="70">San Juan</option>
                    <option value="74">San Luis</option>
                    <option value="78">Santa Cruz</option>
                    <option value="82">Santa Fe</option>
                    <option value="86">Santiago del Estero</option>
                    <option value="94">Tierra del Fuego</option>
                    <option value="90">Tucumán</option>
                </select>
                {errors.provincia && <small style={errorTextStyle}>{errors.provincia}</small>}
            </div>

            <div>
                <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    style={inputStyle}
                />
                {errors.telefono && <small style={errorTextStyle}>{errors.telefono}</small>}
            </div>

            <div>
                <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Mensaje"
                    style={textareaStyle}
                />
                {errors.mensaje && <small style={errorTextStyle}>{errors.mensaje}</small>}
            </div>

            <div style={buttonGroupStyle}>
                <button type="submit" style={submitStyle}>Enviar</button>
                <button type="button" onClick={handleReset} style={resetStyle}>Cancelar</button>
            </div>
        </form>
    );
};

export default FormularioContacto;