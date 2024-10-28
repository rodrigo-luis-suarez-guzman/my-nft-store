// NFTPurchase.tsx
import React from 'react';

interface NFTItem {
  id: string;
  name: string;
  imageUrl: string; // Corregido: se eliminó la 'z' que causaba el error
}

const NFTPurchase: React.FC<{ nft: NFTItem }> = ({ nft }) => {
  const handlePurchase = () => {
    // Aquí puedes agregar la lógica para manejar la compra del NFT
    alert(`Has comprado el NFT: ${nft.name}`);
  };

  return (
    <div className="nft-purchase">
      <h2>{nft.name}</h2>
      <img src={nft.imageUrl} alt={nft.name} className="nft-image" />
      <button onClick={handlePurchase}>Comprar NFT</button>
      {/* Otros elementos de compra pueden ir aquí */}
    </div>
  );
};

export default NFTPurchase;
