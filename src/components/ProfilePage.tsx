// src/components/ProfilePage.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import PurchaseListModal from './PurchaseListModal';

const ProfilePage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCompletePurchase = () => {
    dispatch({ type: 'COMPLETE_PURCHASE' });
    handleCloseModal();
  };

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <button onClick={handleOpenModal}>Ver Compras Realizadas</button>
      <PurchaseListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        purchases={state.completedPurchases}
      />
      <button onClick={handleCompletePurchase}>Finalizar Compra</button>
    </div>
  );
};

export default ProfilePage;
