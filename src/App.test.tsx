import React, { useState } from 'react';
import NavBar from './components/NavBar';
import CartModal from './components/CartModal';
import LoginModal from './components/LoginModal';
import PurchaseListModal from './components/PurchaseListModal';
import ProductList from './components/ProductList'; 
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { connectMetaMask, connectCoinbase } from './services/walletConnections'; // Asegúrate de importar tus funciones de conexión
import './App.css';

const App = () => {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [purchaseListOpen, setPurchaseListOpen] = useState(false);

  const handleConnectMetaMask = async () => {
    try {
      const account = await connectMetaMask();
      if (account) {
        console.log('MetaMask conectado:', account);
        setLoginModalOpen(false); // Cerrar modal al conectar
      }
    } catch (error) {
      console.error('Error al conectar MetaMask:', error);
    }
  };

  const handleConnectCoinbase = async () => {
    try {
      const account = await connectCoinbase(); // Implementa esta función en walletConnections
      if (account) {
        console.log('Coinbase conectado:', account);
        setLoginModalOpen(false); // Cerrar modal al conectar
      }
    } catch (error) {
      console.error('Error al conectar Coinbase:', error);
    }
  };

  return (
    <UserProvider>
      <CartProvider>
        <NavBar
          onOpenPurchaseList={() => setPurchaseListOpen(true)}
          onOpenLoginModal={() => setLoginModalOpen(true)}
          onOpenCartModal={() => setCartModalOpen(true)}
        />
        <CartModal
          isOpen={cartModalOpen}
          onClose={() => setCartModalOpen(false)}
        />
        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onConnectMetaMask={handleConnectMetaMask}
          onConnectCoinbase={handleConnectCoinbase}
        />
        <PurchaseListModal
          isOpen={purchaseListOpen}
          onClose={() => setPurchaseListOpen(false)}
        />
        <ProductList /> {/* Asegúrate de incluir esto para mostrar los NFTs */}
      </CartProvider>
    </UserProvider>
  );
};

export default App;
