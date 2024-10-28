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
  onSearch: (query: string) => void; // Nueva función de búsqueda
}

const NavBar: React.FC<NavBarProps> = ({ onOpenPurchaseList, onOpenCartModal, onOpenLoginModal, onSearch }) => {
  const { state } = useCart();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para el valor de búsqueda

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

  // Manejo de la búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value); // Llama a la función de búsqueda con el valor actualizado
  };

  // Cálculo del total y la cantidad en el carrito
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
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar NFT..."
        className="navbar-search-input"
      />
      <div className={`nav-buttons ${isMenuOpen ? 'active' : ''}`}>
        <button onClick={onOpenCartModal}>
          Cart ({totalQuantity} - {totalValue} ETH)
        </button>
        <button onClick={onOpenPurchaseList}>My Purchases</button>
        <button onClick={handleLoginClick}>Login</button>
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
          <p>Connected As</p>
          <p className="wallet-address">{address.slice(0, 6)}...{address.slice(-4)}</p>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
