import React, { useState } from 'react';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer'; 
import { connectMetaMask, connectCoinbase, connectPhantom } from './services/walletConnections';

const App: React.FC = () => {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const handleConnectMetaMask = async () => {
    const account = await connectMetaMask();
    if (account) setAddress(account);
  };

  const handleConnectCoinbase = async () => {
    const account = await connectCoinbase();
    if (account) setAddress(account);
  };

  const handleConnectPhantom = async () => {
    const account = await connectPhantom();
    if (account) setAddress(account);
  };

  return (
    <div className="App">
      <NavBar
        onOpenPurchaseList={() => console.log('Abrir lista de compras')}
        onOpenCartModal={() => setCartModalOpen(true)}
        onOpenLoginModal={() => setLoginModalOpen(true)}
      />
      <ProductList />
      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onConnectMetaMask={handleConnectMetaMask}
        onConnectCoinbase={handleConnectCoinbase}
        onConnectPhantom={handleConnectPhantom}
      />
      <Footer /> 
    </div>
  );
};

export default App;
