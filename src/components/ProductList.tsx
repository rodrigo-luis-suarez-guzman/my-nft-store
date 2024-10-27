import React from 'react';
import { useCart } from '../context/CartContext';
import { connectMetaMask } from '../services/walletConnections';
import './ProductList.css';
import nft1 from '../assets/images/nft1.png';
import nft2 from '../assets/images/nft2.png';
import nft3 from '../assets/images/nft3.png';
import nft4 from '../assets/images/nft4.png';
import nft5 from '../assets/images/nft5.png';

// Datos de los productos (NFTs)
const products = [
  { id: 1, name: 'NFT 1', price: 10, image: nft1 },
  { id: 2, name: 'NFT 2', price: 20, image: nft2 },
  { id: 3, name: 'NFT 3', price: 30, image: nft3 },
  { id: 4, name: 'NFT 4', price: 40, image: nft4 },
  { id: 5, name: 'NFT 5', price: 50, image: nft5 },
];

// Componente ProductList
const ProductList: React.FC = () => {
  const { dispatch } = useCart();

  // Maneja la compra de un NFT
  const handleBuyNFT = async (product: { id: number; name: string; price: number; image: string }) => {
    try {
      const account = await connectMetaMask();

      if (!account) {
        alert('Por favor, conecta tu MetaMask antes de realizar la compra.');
        return;
      }

      console.log(`Compraste ${product.name} por $${product.price} ETH`);

      // Agregar el NFT al carrito
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } }); // Asegúrate de que la acción esté definida en el contexto
    } catch (error) {
      console.error('Error al comprar NFT:', error);
      alert('Hubo un error al intentar comprar el NFT.');
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>Price: {product.price} ETH</p>
          <button onClick={() => handleBuyNFT(product)}>Comprar NFT</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
