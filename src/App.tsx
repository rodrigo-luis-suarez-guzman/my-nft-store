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
import { connectMetaMask, connectCoinbase } from './services/walletConnections';
import { ToastContainer, toast } from 'react-toastify'; // Importar ToastContainer y toast
import 'react-toastify/dist/ReactToastify.css'; // Importar el CSS de Toastify
import './App.css';

const App = () => {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [purchaseListOpen, setPurchaseListOpen] = useState(false);

  // Mueve CartProvider a un nivel superior para acceso global
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
}

const AppContent: React.FC<AppContentProps> = ({
  cartModalOpen,
  loginModalOpen,
  purchaseListOpen,
  setCartModalOpen,
  setLoginModalOpen,
  setPurchaseListOpen,
}) => {
  const { state } = useCart(); // Obtener el estado del contexto
  const purchases = state.completedPurchases; // Obtener las compras completadas

  const handleConnectMetaMask = async () => {
    try {
      const account = await connectMetaMask();
      if (account) {
        console.log('MetaMask conectado:', account);
        setLoginModalOpen(false);
        toast.success('Conectado a MetaMask'); // Mensaje de éxito al conectar
      }
    } catch (error) {
      console.error('Error al conectar MetaMask:', error);
      toast.error('Error al conectar a MetaMask'); // Mensaje de error al conectar
    }
  };

  const handleConnectCoinbase = async () => {
    try {
      const account = await connectCoinbase();
      if (account) {
        console.log('Coinbase conectado:', account);
        setLoginModalOpen(false);
        toast.success('Conectado a Coinbase'); // Mensaje de éxito al conectar
      }
    } catch (error) {
      console.error('Error al conectar Coinbase:', error);
      toast.error('Error al conectar a Coinbase'); // Mensaje de error al conectar
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <NavBar
        onOpenPurchaseList={() => setPurchaseListOpen(true)}
        onOpenLoginModal={() => setLoginModalOpen(true)}
        onOpenCartModal={() => setCartModalOpen(true)}
      />
      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onConnectMetaMask={handleConnectMetaMask}
        onConnectCoinbase={handleConnectCoinbase}
      />
      <PurchaseListModal
        isOpen={purchaseListOpen}
        onClose={() => setPurchaseListOpen(false)}
        purchases={purchases} // Pasa las compras completadas aquí
      />
      <ProductList /> {/* Asegúrate de incluir esto para mostrar los NFTs */}
      <Footer />
    </>
  );
};

export default App;