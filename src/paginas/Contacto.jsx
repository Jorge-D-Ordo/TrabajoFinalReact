import React, { useState } from 'react';
import Header from '../estructura/Header';
import Footer from "../estructura/Footer";
import Aside from "../estructura/Aside";
import FormularioContacto from '../componentes/FormularioContacto';

const Contacto = () => {

    // Estado formulario y errores
    const [values, setValues] = useState({
        nombreCompleto: '',
        email: '',
        provincia: '0',
        telefono: '',
        mensaje: '',
    });

    const [errors, setErrors] = useState({});

    const nombreRegEx = /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+){0,7}$/;
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    const telRegEx = /^[0-9]{10,12}$/;

    // Manejar cambio inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Validar formulario
    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!nombreRegEx.test(values.nombreCompleto) || values.nombreCompleto.length < 3) {
            nuevosErrores.nombreCompleto = 'Obligatorio y solo permite letras, acentos, ñ y 1 espacio entre palabras. Mínimo 3 caracteres.';
        }
        if (!emailRegEx.test(values.email)) {
            nuevosErrores.email = 'No ingresó ningún mail o el formato es incorrecto.';
        }
        if (values.provincia === '0') {
            nuevosErrores.provincia = 'Debe elegir una provincia.';
        }
        if (values.telefono && !telRegEx.test(values.telefono)) {
            nuevosErrores.telefono = 'Ingrese un teléfono válido (10 a 12 dígitos sin espacios).';
        }
        if (values.mensaje.length < 5 || values.mensaje.length > 400) {
            nuevosErrores.mensaje = 'El mensaje debe tener entre 5 a 400 caracteres.';
        }

        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Manejar submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            alert("Formulario enviado correctamente.");
            console.log("Datos enviados:", values);
            // Aquí iría lógica para enviar al backend
        }
    };

    // Manejar reset
    const handleReset = () => {
        setValues({
            nombreCompleto: '',
            email: '',
            provincia: '0',
            telefono: '',
            mensaje: '',
        });
        setErrors({});
    };


    /************************************************************************************************************ */
    const mainStyle = {
        backgroundColor: '#f0f0f0',
        padding: '20px',
    };
    const contenedorStyle = {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        gap: '2%',
        justifyContent: 'center',
        alignItems: 'stretch',
    };
    const itemStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        margin: '0 auto',
        padding: '20px',
    };
    const formStyle = {
        width: '100%',
        margin: '2%',
        border: '3px solid rgb(128, 70, 139)',
        borderRadius: '8px',
        backgroundColor: '#fff',
    };
    const inputStyle = {
        display: 'flex',
        width: '90%',
        padding: '10px 4%',
        border: '1px solid #ccc',
        borderRadius: '5px',
        margin: '15px auto',
    };
    const textareaStyle = {
        padding: '40px 4%',
    };
    const errorStyle = {
        color: 'white',
        backgroundColor: 'red',
        textAlign: 'center',
        display: 'block',
        marginTop: '5px',
        borderRadius: '4px',
        padding: '5px',
    };
    const botonSucesoStyle = {
        display: 'flex',
        gap: '40px',
        flexDirection: 'row-reverse',
        width: '90%',
        margin: 'auto',
        justifyContent: 'space-between',
    };
    const botonStyle = {
        border: '3px solid rgb(229, 139, 247)',
        backgroundColor: 'rgb(238, 181, 250)',
        fontWeight: '600',
        borderRadius: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
    };
    const mapaStyle = {
        width: '100%',
    };
    const iframeStyle = {
        width: '100%',
        height: '300px',
        border: 'none',
    };


    return (
        <>
            <Header />
            <div style={{ paddingTop: '160px' }}>
                <h1>Contactos</h1>
                <h2>Podrás consultar tus dudas</h2>
            </div>
            <div style={{ display: 'flex' }}>
                <main style={{ flex: 3, ...mainStyle }}>
                    <h1>Contacto</h1>
                    <div style={contenedorStyle}>
                        <div style={itemStyle}>
                            <div style={formStyle} onSubmit={handleSubmit} onReset={handleReset} noValidate>
                                <h2>Comunicarse con nosotros:</h2>
                                <FormularioContacto />
                            </div>
                        </div>
                        <div style={itemStyle}>
                            <div style={mapaStyle}>
                                <h2>Visítanos en:</h2>
                                <p><strong>Dirección:</strong> Avenida Rivadavia 5450, CABA, CP 1405</p>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3283.330970078389!2d-58.444370925314786!3d-34.62107555841321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1728676103257!5m2!1ses!2sar"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación en Google Maps"
                                    style={iframeStyle}
                                />
                            </div>
                        </div>
                    </div>

                </main>
                <Aside style={{ flex: 1 }} />
            </div>
            <Footer />
        </>
    );
};

export default Contacto;