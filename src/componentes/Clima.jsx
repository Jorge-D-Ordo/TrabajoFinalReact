import React, { useEffect, useState } from 'react';

const ptosCardinales = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'
];

const Clima = () => {
    const [data, setData] = useState(null);
    const apiKey = '8b2e17f3b249e84f6d81bc14f257219d';
    const lat = -34.616667;
    const lon = -58.45;

    useEffect(() => {
        async function fetchWeather() {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`);
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error("Error al obtener datos del clima:", error);
        }
        }

        fetchWeather();
    }, []);

    const gradosADireccion = (deg) => {
        const index = Math.trunc((deg / 22.5) + 0.5);
        return ptosCardinales[index % 16];
    };

    if (!data) return <p>Cargando clima...</p>;

    return (
        <div className="tarjeta-clima">
        <h2>Ubicación: {data.name}</h2>

        <div>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Icono del clima" />
            <p><strong>Cielo:</strong> {data.weather[0].description}</p>
        </div>

        <div>
            <p><strong>Temperatura:</strong> {data.main.temp} °C</p>
            <p><strong>Sensación térmica:</strong> {data.main.feels_like} °C</p>
            <p><strong>Humedad:</strong> {data.main.humidity} %</p>
            <p><strong>Presión:</strong> {data.main.pressure} hPa</p>
        </div>

        <div>
            <p>
            <strong>Viento:</strong> {data.wind.speed} m/s ({gradosADireccion(data.wind.deg)})
            </p>
        </div>

        <div>
            <p>
            <strong>Lluvia:</strong> {data.rain ? data.rain['1h'] : 0} mm/h
            </p>
        </div>
        </div>
    );
    };

    export default Clima;
