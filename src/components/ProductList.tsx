import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { connectMetaMask } from '../services/walletConnections';
import { toast } from 'react-toastify';
import NftDetailModal from './NftDetailModal';
import './ProductList.css';
import nft1 from '../assets/images/nft1.png';
import nft2 from '../assets/images/nft2.png';
import nft3 from '../assets/images/nft3.png';
import nft4 from '../assets/images/nft4.png';
import nft5 from '../assets/images/nft5.png';

// Definir los datos de los productos (NFTs)
const products = [
  { id: 1, name: 'Ghost Rider', price: 10, image: nft1, story: 'This is the brave Crypto Ghost Rider fighting evil in the metaverse...' },
  { id: 2, name: 'The Keep Calm and Hoodl ', price: 20, image: nft2, story: 'The Keep Calm and Hoodl is a mystical keeper of ancient secrets...' },
  { id: 3, name: 'Bitcoin Miner', price: 30, image: nft3, story: 'Bitcoin Miner dominates the elements of the cosmos with his powers...' },
  { id: 4, name: 'Moon Boy', price: 40, image: nft4, story: 'Moon Boy is a cyberspace adventurer and data protector...' },
  { id: 5, name: 'Crypto Morpheus', price: 50, image: nft5, story: 'Crypto Morpheus glows in the dark and keeps secrets...' },
];

// Definir las props para ProductList
interface ProductListProps {
  searchQuery: string; // Añadir searchQuery como prop
}

const ProductList: React.FC<ProductListProps> = ({ searchQuery }) => {
  const { dispatch } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNft, setSelectedNft] = useState<{ imageUrl: string; story: string } | null>(null);

  // Filtrar los productos en función del término de búsqueda recibido
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNFT = async (product: { id: number; name: string; price: number; image: string }) => {
    try {
      const account = await connectMetaMask();
      if (!account) {
        toast.error('Por favor, conecta tu MetaMask antes de realizar la compra.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          style: { background: '#FF5252', color: '#fff' },
        });
        return;
      }
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
      toast.success(`🎉 ${product.name} ha sido agregado al carrito!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        style: { background: '#4CAF50', color: '#fff' },
      });
    } catch (error) {
      console.error('Error al comprar NFT:', error);
      toast.error('Hubo un error al intentar comprar el NFT.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        style: { background: '#FF5252', color: '#fff' },
      });
    }
  };

  const handleCardClick = (product: { image: string; story: string }) => {
    setSelectedNft({ imageUrl: product.image, story: product.story });
    setModalOpen(true);
  };

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card" onClick={() => handleCardClick(product)}>
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>Price: {product.price} ETH</p>
          <button onClick={(e) => { e.stopPropagation(); handleBuyNFT(product); }} className="buy-button">
            Buy NFT
          </button>
        </div>
      ))}
      {selectedNft && (
        <NftDetailModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          imageUrl={selectedNft.imageUrl}
          story={selectedNft.story}
        />
      )}
    </div>
  );
};

export default ProductList;
