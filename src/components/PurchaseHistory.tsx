// src/components/PurchaseHistory.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

const PurchaseHistory: React.FC = () => {
  const { state } = useCart();

  return (
    <div>
      <h2>Mis Compras</h2>
      {state.completedPurchases.length > 0 ? (
        <ul>
          {state.completedPurchases.map((purchase, index) => (
            <li key={index}>
              <img src={purchase.image} alt={purchase.name} style={{ width: '50px' }} />
              <p>{purchase.name} - {purchase.price} ETH x {purchase.quantity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes compras registradas.</p>
      )}
    </div>
  );
};

export default PurchaseHistory;
