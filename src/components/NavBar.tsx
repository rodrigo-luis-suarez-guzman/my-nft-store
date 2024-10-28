import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';
import { connectMetaMask, connectCoinbase, connectPhantom } from '../services/walletConnections';
import './NavBar.css';
import logo from '../assets/images/Logo.svg';
import { toast } from 'react-toastify';

interface NavBarProps {
  onOpenPurchaseList: () => void;
  onOpenCartModal: () => void;
  onOpenLoginModal: () => void;
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

  const handleConnectCoinbase = async () => {
    const account = await connectCoinbase();
    if (account) {
      setAddress(account);
      setLoginModalOpen(false);
    }
  };

  const handleConnectPhantom = async () => {
    const account = await connectPhantom();
    if (account) {
      setAddress(account);
      setLoginModalOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const totalQuantity = state.purchases.length;
  const totalValue = state.purchases.reduce((total, item) => total + item.price, 0).toFixed(2);

  const handleLoginClick = () => {
    if (address) {
      toast.info("Ya estás conectado. Si deseas cambiar la wallet, desconéctate primero.");
    } else {
      setLoginModalOpen(true);
    }
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
        <button onClick={onOpenCartModal}>
          Carrito ({totalQuantity} - {totalValue} ETH)
        </button>
        <button onClick={onOpenPurchaseList}>Mis Compras</button>
        <button onClick={handleLoginClick}>Iniciar Sesión</button>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onConnectMetaMask={handleConnectMetaMask}
        onConnectCoinbase={handleConnectCoinbase}
        onConnectPhantom={handleConnectPhantom}
      />
      {address && (
        <div className="wallet-info">
          <p>Conectado como:</p>
          <p className="wallet-address">{address.slice(0, 6)}...{address.slice(-4)}</p>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
