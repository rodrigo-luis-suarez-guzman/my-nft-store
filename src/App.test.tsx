// src/App.tsx
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import CartModal from './components/CartModal';
import LoginModal from './components/LoginModal';
import PurchaseListModal from './components/PurchaseListModal';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import { UserProvider } from './context/UserContext';
import { CartProvider, useCart } from './context/CartContext';
import { connectMetaMask, connectCoinbase, connectPhantom } from './services/walletConnections';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [purchaseListOpen, setPurchaseListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Añadido para manejar el estado de búsqueda

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <UserProvider>
      <CartProvider>
        <AppContent
          cartModalOpen={cartModalOpen}
          loginModalOpen={loginModalOpen}
          purchaseListOpen={purchaseListOpen}
          setCartModalOpen={setCartModalOpen}
          setLoginModalOpen={setLoginModalOpen}
          setPurchaseListOpen={setPurchaseListOpen}
          onSearch={handleSearch}
          searchQuery={searchQuery} // Pasamos searchQuery a AppContent
        />
      </CartProvider>
    </UserProvider>
  );
};

interface AppContentProps {
  cartModalOpen: boolean;
  loginModalOpen: boolean;
  purchaseListOpen: boolean;
  setCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPurchaseListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (query: string) => void;
  searchQuery: string; // Añadida esta prop para la búsqueda
}

const AppContent: React.FC<AppContentProps> = ({
  cartModalOpen,
  loginModalOpen,
  purchaseListOpen,
  setCartModalOpen,
  setLoginModalOpen,
  setPurchaseListOpen,
  onSearch,
  searchQuery,
}) => {
  const { state } = useCart();
  const purchases = state.completedPurchases;

  // Manejo de conexión de wallets
  const handleConnectMetaMask = async () => {
    const account = await connectMetaMask();
    if (account) {
      toast.success('Conectado a MetaMask', { position: 'top-right', autoClose: 3000 });
      setLoginModalOpen(false);
    }
  };

  const handleConnectCoinbase = async () => {
    const account = await connectCoinbase();
    if (account) {
      toast.success('Conectado a Coinbase Wallet', { position: 'top-right', autoClose: 3000 });
      setLoginModalOpen(false);
    }
  };

  const handleConnectPhantom = async () => {
    const account = await connectPhantom();
    if (account) {
      toast.success('Conectado a Phantom Wallet', { position: 'top-right', autoClose: 3000 });
      setLoginModalOpen(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <NavBar
        onOpenPurchaseList={() => setPurchaseListOpen(true)}
        onOpenCartModal={() => setCartModalOpen(true)}
        onOpenLoginModal={() => setLoginModalOpen(true)}
        onSearch={onSearch}
      />
      <ProductList searchQuery={searchQuery} /> {/* Pasamos searchQuery a ProductList */}
      <Footer />
      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onConnectMetaMask={handleConnectMetaMask}
        onConnectCoinbase={handleConnectCoinbase}
        onConnectPhantom={handleConnectPhantom}
      />
      <PurchaseListModal
        isOpen={purchaseListOpen}
        onClose={() => setPurchaseListOpen(false)}
        purchases={purchases}
      />
    </>
  );
};

export default App;
