import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';
import { connectMetaMask, connectCoinbase } from '../services/walletConnections';
import './NavBar.css';
import logo from '../assets/images/Logo.svg';

interface NavBarProps {
  onOpenPurchaseList: () => void;
  onOpenCartModal: () => void;
  onOpenLoginModal: () => void; // Asegúrate de tener esta propiedad
}

const NavBar: React.FC<NavBarProps> = ({ onOpenPurchaseList, onOpenCartModal, onOpenLoginModal }) => {
  const { state } = useCart();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleConnectMetaMask = async () => {
    const account = await connectMetaMask();
    if (account) {
      setAddress(account);
      setLoginModalOpen(false);
    }
  };

  const handleConnectCoinbase = () => {
    connectCoinbase();
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className={`nav-buttons ${isMenuOpen ? 'active' : ''}`}>
        <button onClick={onOpenCartModal}>Carrito ({state.purchases.length})</button>
        <button onClick={onOpenPurchaseList}>Mis Compras</button>
        <button onClick={() => setLoginModalOpen(true)}>Iniciar Sesión</button>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onConnectMetaMask={handleConnectMetaMask}
        onConnectCoinbase={handleConnectCoinbase}
      />
      {address && <p>Conectado como: {address}</p>}
    </nav>
  );
};

export default NavBar;
