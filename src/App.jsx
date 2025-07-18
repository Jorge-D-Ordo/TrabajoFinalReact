import { useState, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Ruteo from './rutas/Ruteo';
import Admin from './paginas/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
/* <Route parh='/productos/:id/promo:campania element={<DetalleProducto/> en el uturo para ver detalles admin}  */

function App() {
  // const [count, setCount] = useState(0)
  // const {cart,productos,error} =useContext(CarritoContext)

  return (
    <>
      <Ruteo />

      {/*  <OfertaLista /> */}
      {/*  <Admin /> */}

      <ToastContainer />

    </>
  )
}

export default App
