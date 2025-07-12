import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext.jsx';
import { ProductosProvider } from './context/ProductosContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
//import './index.css'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvider>
          <CarritoProvider>
            <AdminProvider>
              <App />
            </AdminProvider>
          </CarritoProvider>
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
