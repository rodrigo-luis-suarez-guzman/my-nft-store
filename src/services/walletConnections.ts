// walletConnections.ts

// MetaMask connection
export const connectMetaMask = async (): Promise<string | null> => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Solicita acceso a las cuentas de MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Devuelve la primera cuenta (dirección) conectada
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
  
  export const connectCoinbase = async (): Promise<string | null> => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Solicita acceso a las cuentas de MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Devuelve la primera cuenta (dirección) conectada
        return accounts[0];
      } catch (error) {
        console.error('Error al conectar connectCoinbase:', error);
        return null;
      }
    } else {
      console.error('connectCoinbase no está instalado.');
      return null;
    }
  };
  

