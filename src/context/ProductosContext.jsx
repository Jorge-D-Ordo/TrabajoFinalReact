import { createContext, useState, useEffect } from "react";

export const ProductosContext = createContext()
export const ProductosProvider = ({children}) => {
    const [productos,setProductos] = useState([])
    const [listaPrecios,setListaPrecios] = useState([])
    const [productoListaCargado,setProductoListaCargado] = useState(true)
    const [listaPreciosCargado,setListaPreciosCargado] = useState(true)
    const [errorProd,setErrorProd] = useState(false)
    const [errorPrecio,setErrorPrecio] = useState(false)
    const [campaniaActual, setCampaniaActual] = useState("2025-05") /// ojo tengo que ingresar ese parametro
    useEffect(()=>{
        fetch('/datos/listaMillanelProductos.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
//            console.log("-----------------------------");            
//            console.log(datos);
//            console.log("-----------------------------"); 
            setProductos(datos);
            setProductoListaCargado(false);
        })
        .catch((err)=>{
            console.log('Error al cargar Listado de Productos:',err);
            setErrorProd(true);
            setProductoListaCargado(false); 
        });  
    }, []);
    useEffect(()=>{
        fetch('/datos/listaPreciosMillanel.json')
        .then(respuesta1 => respuesta1.json())
        .then(datos1 => {
//            console.log("-----------------------------");             
//            console.log(datos1);
//            console.log("-----------------------------"); 
            setListaPrecios(datos1);
            setListaPreciosCargado(false);
        })
        .catch((err)=>{
            console.log('Error al cargar Lista de Precios:',err);
            setErrorPrecio(true); 
            setListaPreciosCargado(false);
        });  
    }, []);
        
    const productosConPrecioPorCampania = (campania = campaniaActual) => {
        const preciosFiltrados = listaPrecios.filter(precio => {
            return precio.idCampania === campania ;
        });
    return productos
        .map(prod => {
            const precioEncontrado = preciosFiltrados.find(precio => precio.idProducto === prod.id);
            if (!precioEncontrado) return null;
            return {
                ...prod,
                ...precioEncontrado,
                precio: precioEncontrado.precio
            };
        })
        .filter(Boolean); // elimina los null
    };

    return(
        <ProductosContext.Provider value ={{
            productos,listaPrecios,productosConPrecioPorCampania,
            productoListaCargado,listaPreciosCargado,
            errorProd,errorPrecio,
            campaniaActual
            }}>    
            {children}        
        </ProductosContext.Provider>
    )
} 

