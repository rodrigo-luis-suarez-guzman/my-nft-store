// CartModal.tsx
import React from 'react';
import { useCart, Purchase } from '../context/CartContext';
import './CartModal.css';
import '../App.css';


const CartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();

  if (!isOpen) return null;

  const handlePurchase = () => {
    if (state.purchases.length > 0) {
      dispatch({ type: 'COMPLETE_PURCHASE' }); // Mueve todos los artículos a compras completadas
      alert('Compra realizada con éxito');
      onClose();
    } else {
      alert('No hay artículos en el carrito para comprar.');
    }
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <button className="close-button" onClick={onClose}>Cerrar</button>
        <h2>Carrito de Compras</h2>
        {state.purchases.length === 0 ? (
          <p>No hay items en el carrito.</p>
        ) : (
          <ul className="cart-items">
            {state.purchases.map((item: Purchase) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price}</p>
                </div>
                <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
        {state.purchases.length > 0 && (
          <button className="purchase-button" onClick={handlePurchase}>Realizar Compra</button>
        )}
      </div>
    </div>
  );
};

export default CartModal;



