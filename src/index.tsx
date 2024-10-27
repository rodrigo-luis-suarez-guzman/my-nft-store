// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './context/CartContext'; // Asegúrate de importar el CartProvider

import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App /> {/* Envuelve App con CartProvider */}
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
