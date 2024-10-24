// NFTPurchase.tsx
interface NFTItem {
    id: string;
    name: string;
    imageUrl: string; // Elimina la 'z' que está causando el error
  }
  
  const NFTPurchase: React.FC<{ nft: NFTItem }> = ({ nft }) => {
    return (
      <div>
        <h2>{nft.name}</h2>
        <img src={nft.imageUrl} alt={nft.name} />
        {/* Otros elementos de compra */}
      </div>
    );
  };
  
  export default NFTPurchase;
  