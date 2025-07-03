import { useState, useContext } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import  Ruteo  from './rutas/Ruteo';
import Admin from './paginas/Admin';
import ProductoFormularioAdmin from './estructura/ProductoFormularioAdmin';

/* <Route parh='/productos/:id/promo:campania element={<DetalleProducto/> en el uturo para ver detalles admin}  */

function App() {
  // const [count, setCount] = useState(0)
  // const {cart,productos,error} =useContext(CarritoContext)

  return (
    <>
      <BrowserRouter>
        {/*    <Ruteo  /> */}
        {/*  <OfertaLista /> */}
        {/*  <ProductoFormularioAdmin /> */}
        <Admin />
      </BrowserRouter>
    </>
  )
}

export default App
