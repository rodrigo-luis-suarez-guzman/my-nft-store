// src/components/PurchaseListModal.tsx

import React from 'react';
import './PurchaseListModal.css';

interface Purchase {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface PurchaseListModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchases: Purchase[];
}

const PurchaseListModal: React.FC<PurchaseListModalProps> = ({ isOpen, onClose, purchases }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Purchases Made</h2>
        {purchases.length > 0 ? (
          <ul className="purchase-list">
            {purchases.map((purchase) => (
              <li key={purchase.id} className="purchase-item">
                <img src={purchase.image} alt={purchase.name} className="purchase-image" />
                <div>
                  <h3>{purchase.name}</h3>
                  <p>Price: {purchase.price} ETH</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't made any purchases yet.</p>
        )}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PurchaseListModal;
