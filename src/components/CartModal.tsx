import React from 'react';
import { useCart } from '../context/CartContext';
import './CartModal.css'; // Asegúrate de importar los estilos

const CartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart(); // Asegúrate de acceder al estado aquí

  if (!isOpen) return null;

  const handlePurchase = () => {
    // Lógica para manejar la compra
    state.purchases.forEach(item => {
      // Elimina el artículo del carrito después de la compra
      dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item.id } });
    });
    alert('Compra finalizada con éxito. NFTs comprados registrados.');
    onClose(); // Cierra el modal después de la compra
  };

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <h2>Carrito de Compras</h2>
        {state.purchases.length === 0 ? (
          <p>No hay items en el carrito.</p>
        ) : (
          <ul className="cart-items">
            {state.purchases.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>${item.price} x {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {state.purchases.length > 0 && (
          <button className="purchase-button" onClick={handlePurchase}>Realizar Compra</button>
        )}
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CartModal;
