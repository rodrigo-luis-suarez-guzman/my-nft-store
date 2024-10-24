import React from 'react';
import { useCart } from '../context/CartContext';
import './CartModal.css';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();

  if (!isOpen) return null;

  const handlePurchase = () => {
    // Lógica para manejar la compra, moviendo ítems a "purchases"
    state.items.forEach(item => {
      dispatch({ type: 'PURCHASE_ITEMS', payload: item });
    });
    alert('Compra finalizada con éxito. NFTs comprados registrados.');
    onClose(); // Cierra el modal después de la compra
  };

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <button className="close-button" onClick={onClose}>Cerrar</button>
        <h2>Carrito de Compras</h2>
        {state.items.length === 0 ? (
          <p>No hay items en el carrito.</p>
        ) : (
          <ul className="cart-items">
            {state.items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price}</p>
                  <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item.id } })}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {state.items.length > 0 && (
          <button className="purchase-button" onClick={handlePurchase}>Realizar Compra</button>
        )}
      </div>
    </div>
  );
};

export default CartModal;
