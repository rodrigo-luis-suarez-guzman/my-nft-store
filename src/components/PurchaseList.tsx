// PurchaseList.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

const PurchaseList: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
  const { state } = useCart(); // Accede al estado del contexto

  if (!isOpen) return null;

  return (
    <div>
      <h2>Shopping list</h2>
      {state.purchases.length === 0 ? (
        <p>You haven't made any purchases yet.</p>
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
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PurchaseList;
