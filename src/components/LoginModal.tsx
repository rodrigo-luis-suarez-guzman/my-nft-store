// src/components/LoginModal.tsx

import React from 'react';
import './LoginModal.css';
import nftImage from '../assets/images/nft1.png'; // Imagen NFT como ejemplo

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectMetaMask: () => void;
  onConnectCoinbase: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onConnectMetaMask, onConnectCoinbase }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <img src={nftImage} alt="NFT Icon" className="nft-image" /> {/* Imagen NFT */}
        <h2>Iniciar Sesión</h2>
        <button onClick={onConnectMetaMask}>Conectar MetaMask</button>
        <button onClick={onConnectCoinbase}>Conectar Coinbase</button>
        <button className="close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default LoginModal;
