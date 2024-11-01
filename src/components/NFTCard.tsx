// NFTCard.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Purchase } from '../context/CartContext';

const NFTCard: React.FC<{ nft: Purchase }> = ({ nft }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...nft, quantity: 1 } });
  };

  const handleBuyNow = () => {
    //  hacer la lógica de compra aquí
    handleAddToCart();
    // Redirigir o abrir un modal de compra.
  };

  return (
    <div className="nft-card">
      <img src={nft.image} alt={nft.name} />
      <h3>{nft.name}</h3>
      <p>{nft.price} ETH</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleBuyNow}>Buy</button>
    </div>
  );
};

export default NFTCard;
