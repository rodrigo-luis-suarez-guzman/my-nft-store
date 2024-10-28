import React from 'react';
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectMetaMask: () => void;
  onConnectCoinbase: () => void;
  onConnectPhantom: () => void; // Agregado para Phantom
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onConnectMetaMask,
  onConnectCoinbase,
  onConnectPhantom, // Agregado para Phantom
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Iniciar Sesión</h2>
        <button className="futuristic-button" onClick={onConnectMetaMask}>Conectar MetaMask</button>
        <button className="futuristic-button" onClick={onConnectCoinbase}>Conectar Coinbase</button>
        <button className="futuristic-button" onClick={onConnectPhantom}>Conectar Phantom</button> {/* Botón para Phantom */}
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default LoginModal;
