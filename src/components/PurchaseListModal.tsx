// PurchaseListModal.tsx
import React from 'react';
import { Purchase } from '../context/CartContext';
import './CartModal.css'; // Asegúrate de importar los estilos

interface PurchaseListModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchases: Purchase[];
}

const PurchaseListModal: React.FC<PurchaseListModalProps> = ({ isOpen, onClose, purchases }) => {
  if (!isOpen) return null;

  return (
    <div>
      <h2>Lista de Compras</h2>
      {purchases.length === 0 ? (
        <p>No has realizado compras todavía.</p>
      ) : (
        <ul>
          {purchases.map((item) => (
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

export default PurchaseListModal;
