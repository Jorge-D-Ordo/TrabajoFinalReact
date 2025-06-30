import { useState, useContext } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import Ruteo from './rutas/Ruteo';
import Admin from './paginas/Admin';
/* import SincronizarProductosMockApi from './componentes/SincronizarProductosMockApi';   SOLO PARA RECARGAR DATA*/

/* <Route parh='/productos/:id/promo:campania element={<DetalleProducto/> en el uturo para ver detalles admin}  */

function App() {
  // const [count, setCount] = useState(0)
  // const {cart,productos,error} =useContext(CarritoContext)

  return (
    <>
      <BrowserRouter>
        {/*    <Ruteo  /> */}
        {/*  <OfertaLista /> */}
        <Admin />
        {/*  <SincronizarProductosMockApi /> SOLO PARA RECARGAR DATA   */}
      </BrowserRouter>
    </>
  )
}

export default App
