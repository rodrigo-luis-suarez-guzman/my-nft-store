import React from "react";

interface PurchaseListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseListModal: React.FC<PurchaseListModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // No mostrar el modal si no está abierto

  return (
    <div>
      <h2>Lista de Compras</h2>
      {/* Aquí podrías mostrar la lista de compras */}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default PurchaseListModal;
