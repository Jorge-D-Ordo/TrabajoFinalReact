import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'
import { ProductosProvider } from './context/ProductosContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
//import './index.css'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ProductosProvider>
      <CarritoProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </CarritoProvider>
    </ProductosProvider>
  </StrictMode>,
)
