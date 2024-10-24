import { ethers } from 'ethers'; // Para Ethereum

interface NFTItem {
  id: string;
  name: string;
  imageUrl: string;
}

// Reemplaza con la dirección de tu contrato NFT y la ABI correspondiente
const contractAddress = '0xYourNFTContractAddress'; 
const contractABI = [
  // ABI del contrato NFT, aquí debes incluir la función de compra
  "function buyNFT(uint256 tokenId) external payable"
];

export const purchaseNFTWithETH = async (nft: NFTItem, address: string) => {
  if (!window.ethereum) {
    alert('Por favor, instala MetaMask para comprar NFTs.');
    return false;
  }

  try {
    // Conectar a MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Crear una instancia del contrato
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Suponiendo que el precio del NFT es 0.05 ETH, ajusta esto según tu lógica
    const price = ethers.utils.parseEther("0.05"); // precio en ETH

    // Realizar la compra
    const tx = await contract.buyNFT(nft.id, {
      value: price,
    });

    // Esperar la confirmación de la transacción
    await tx.wait();

    console.log('Compra exitosa:', tx);
    return true; // Indica que la compra fue exitosa
  } catch (error) {
    console.error('Error en la compra:', error);
    alert('Error en la compra. Por favor, inténtalo de nuevo.');
    return false; // Indica que la compra falló
  }
};
