// PurchaseList.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

const PurchaseList: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
  const { state } = useCart(); // Accede al estado del contexto

  if (!isOpen) return null;

  return (
    <div>
      <h2>Lista de Compras</h2>
      {state.purchases.length === 0 ? (
        <p>No has realizado compras todavía.</p>
      ) : (
        <ul>
          {state.purchases.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>{item.name}</div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default PurchaseList;
