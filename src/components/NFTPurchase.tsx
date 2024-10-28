// NFTPurchase.tsx
import React from 'react';

interface NFTItem {
  id: string;
  name: string;
  imageUrl: string;
}

const NFTPurchase: React.FC<{ nft: NFTItem }> = ({ nft }) => {
  const handlePurchase = () => {
    // Aquí puedes agregar la lógica para manejar la compra del NFT ^^
    alert(`Has comprado el NFT: ${nft.name}`);
  };

  return (
    <div className="nft-purchase">
      <h2>{nft.name}</h2>
      <img src={nft.imageUrl} alt={nft.name} className="nft-image" />
      <button onClick={handlePurchase}>Comprar NFT</button>
      {/* Agregar mas dettalles de compra aqui  */}
    </div>
  );
};

export default NFTPurchase;
