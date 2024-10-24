// src/services/walletConnections.ts

export const connectMetaMask = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log('Connected to MetaMask:', account);
      return account; // Devuelve la cuenta conectada
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  } else {
    alert('MetaMask no está instalado. Por favor, instálalo para continuar.');
  }
};

export const connectCoinbase = async () => {
  // Aquí puedes usar la API oficial de Coinbase o redirigir al usuario
  window.location.href = 'https://keys.coinbase.com/onboarding';
};
