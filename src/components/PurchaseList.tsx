import React from 'react';
import { useCart } from '../context/CartContext';
import './PurchaseList.css'; // Asegúrate de tener los estilos correctos

const PurchaseList: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
  const { state } = useCart(); // Accede al contexto del carrito

  if (!isOpen) return null;

  return (
    <div className="purchase-list-overlay">
      <div className="purchase-list">
        <button className="close-button" onClick={onClose}>Cerrar</button>
        <h2>Mis Compras</h2>
        <ul className="purchase-items">
          {state.purchases.length === 0 ? (
            <p>No has realizado compras todavía.</p>
          ) : (
            state.purchases.map((item) => (
              <li key={item.id} className="purchase-item">
                <img src={item.image} alt={item.name} className="purchase-image" />
                <div className="purchase-info">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price}</p> {/* Muestra el precio si lo deseas */}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default PurchaseList;
