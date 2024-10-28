import { PublicKey } from '@solana/web3.js';

// MetaMask connection
export const connectMetaMask = async (): Promise<string | null> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error('Error al conectar MetaMask:', error);
      return null;
    }
  } else {
    console.error('MetaMask no está instalado.');
    return null;
  }
};

// Coinbase connection
export const connectCoinbase = async (): Promise<string | null> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error('Error al conectar Coinbase:', error);
      return null;
    }
  } else {
    console.error('Coinbase Wallet no está instalado.');
    return null;
  }
};

// Phantom connection
export const connectPhantom = async (): Promise<string | null> => {
  const provider = (window as any).solana;
  if (provider && provider.isPhantom) {
    try {
      const connection = await provider.connect();
      console.log('Phantom conectado:', connection.publicKey.toString());
      return connection.publicKey.toString();
    } catch (error) {
      console.error('Error al conectar Phantom:', error);
      return null;
    }
  } else {
    console.error('Phantom Wallet no está instalada.');
    return null;
  }
};
