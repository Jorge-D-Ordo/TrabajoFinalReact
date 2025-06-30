/* import { useEffect } from "react";

const MAX_PRODUCTOS = 30;
const MOCKAPI_URL = "https://68573e0121f5d3463e54ccee.mockapi.io/api/V1/ListadoEjemplo";

// Función para pausar la ejecución n milisegundos
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function SincronizarProductosMockApi() {
    useEffect(() => {
        const sincronizar = async () => {
            try {
                console.log("📥 Iniciando sincronización...");

                const resProductos = await fetch("/datos/listaMillanelProductos.json");
                if (!resProductos.ok) throw new Error("❌ Error al cargar listaMillanelProductos.json");
                const productosJSON = await resProductos.json();

                const resPrecios = await fetch("/datos/listaPreciosMillanel.json");
                if (!resPrecios.ok) throw new Error("❌ Error al cargar listaPreciosMillanel.json");
                const preciosJSON = await resPrecios.json();

                const preciosCampania = preciosJSON.filter(p => p.idCampania === "2025-05");

                const productosNormalizados = productosJSON
                    .slice(0, MAX_PRODUCTOS)
                    .map(prod => {
                        const precioMatch = preciosCampania.find(p => p.idProducto === prod.id);
                        return {
                            ...prod,
                            idProd: prod.id,
                            precio: precioMatch?.precio ?? 0,
                        };
                    });

                const resMock = await fetch(MOCKAPI_URL);
                if (!resMock.ok) throw new Error("❌ Error al obtener productos desde MockAPI");
                const productosMockAPI = await resMock.json();

                const productosMockLimitados = productosMockAPI.slice(0, productosNormalizados.length);

                const limpiar = obj => {
                    const copia = { ...obj };
                    delete copia.id;
                    return JSON.stringify(copia);
                };

                const sonIguales =
                    productosNormalizados.length === productosMockLimitados.length &&
                    productosNormalizados.every(local =>
                        productosMockLimitados.some(mock => limpiar(mock) === limpiar(local))
                    );

                if (sonIguales) {
                    console.log("✅ Productos sincronizados. No se detectaron cambios.");
                    alert("✅ Productos ya sincronizados. No se realizaron cambios.");
                    return;
                }

                // Eliminar productos con delay para no saturar
                for (const producto of productosMockAPI) {
                    await fetch(`${MOCKAPI_URL}/${producto.id}`, { method: "DELETE" });
                    await sleep(300);  // pausa 300ms entre cada DELETE
                }

                // Subir productos con delay para no saturar
                for (const producto of productosNormalizados) {
                    await fetch(MOCKAPI_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(producto),
                    });
                    await sleep(300);  // pausa 300ms entre cada POST
                }

                alert("✅ Productos sincronizados con éxito");
                console.log("✅ Sincronización finalizada.");
            } catch (error) {
                console.error("❌ Error en la sincronización:", error);
                alert("❌ Error al sincronizar productos");
            }
        };

        sincronizar();
    }, []);

    return <p>Sincronizando productos...</p>;
}
    */


import { useEffect } from "react";

const MAX_PRODUCTOS = 30;
const MOCKAPI_URL = "https://68573e0121f5d3463e54ccee.mockapi.io/api/V1/ListadoEjemplo";
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function SincronizarProductosMockApi() {
    useEffect(() => {
        const sincronizar = async () => {
            try {
                console.log("📥 Iniciando sincronización...");

                // Cargar datos locales
                const resProductos = await fetch("/datos/listaMillanelProductos.json");
                if (!resProductos.ok) throw new Error("❌ Error al cargar listaMillanelProductos.json");
                const productosJSON = await resProductos.json();

                const resPrecios = await fetch("/datos/listaPreciosMillanel.json");
                if (!resPrecios.ok) throw new Error("❌ Error al cargar listaPreciosMillanel.json");
                const preciosJSON = await resPrecios.json();

                const preciosCampania = preciosJSON.filter(p => p.idCampania === "2025-05");

                // Normalizar productos
                const productosNormalizados = productosJSON.slice(0, MAX_PRODUCTOS).map(prod => {
                    const precioMatch = preciosCampania.find(p => p.idProducto === prod.id);
                    return {
                        ...prod,
                        idProd: prod.id,
                        precio: precioMatch?.precio ?? 0,
                    };
                });

                // Obtener productos actuales desde MockAPI
                const resMock = await fetch(MOCKAPI_URL);
                if (!resMock.ok) throw new Error("❌ Error al obtener productos desde MockAPI");
                const productosMockAPI = await resMock.json();

                // Función de comparación profunda sin 'id'
                const limpiar = obj => {
                    const copia = { ...obj };
                    delete copia.id;
                    return JSON.stringify(Object.entries(copia).sort());
                };

                // Actualizar o crear productos
                for (let i = 0; i < productosNormalizados.length; i++) {
                    const productoLocal = productosNormalizados[i];
                    const productoMock = productosMockAPI[i];

                    if (productoMock) {
                        const localStr = limpiar(productoLocal);
                        const mockStr = limpiar(productoMock);

                        if (localStr !== mockStr) {
                            // Actualizar producto
                            console.log(`🔄 Actualizando producto ${productoLocal.nombre}`);
                            await fetch(`${MOCKAPI_URL}/${productoMock.id}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(productoLocal),
                            });
                            await sleep(300);
                        } else {
                            console.log(`✅ Sin cambios: ${productoLocal.nombre}`);
                        }
                    } else {
                        // Crear nuevo producto
                        console.log(`➕ Creando producto nuevo: ${productoLocal.nombre}`);
                        await fetch(MOCKAPI_URL, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(productoLocal),
                        });
                        await sleep(300);
                    }
                }

                // Eliminar productos sobrantes en MockAPI
                if (productosMockAPI.length > MAX_PRODUCTOS) {
                    const sobrantes = productosMockAPI.slice(MAX_PRODUCTOS);
                    for (const sobrante of sobrantes) {
                        console.log(`🗑️ Eliminando producto sobrante: ${sobrante.nombre}`);
                        await fetch(`${MOCKAPI_URL}/${sobrante.id}`, {
                            method: "DELETE",
                        });
                        await sleep(300);
                    }
                }

                alert("✅ Sincronización finalizada correctamente.");
                console.log("✅ Todos los productos sincronizados.");

            } catch (error) {
                console.error("❌ Error en la sincronización:", error);
                alert("❌ Error al sincronizar productos");
            }
        };

        sincronizar();
    }, []);

    return <p>Sincronizando productos...</p>;
}

