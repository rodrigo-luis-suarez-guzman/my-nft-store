// CartModal.tsx
import React from 'react';
import { useCart, Purchase } from '../context/CartContext'; // Importar la interfaz Purchase
import './CartModal.css'; // Asegúrate de importar los estilos

const CartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart(); // Asegúrate de acceder al estado aquí

  if (!isOpen) return null;

  const handlePurchase = () => {
    state.purchases.forEach((item: Purchase) => { // Especificar el tipo aquí
      // Lógica para manejar la compra
      alert(`Compraste: ${item.name}`);
      dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item.id } }); // Eliminar del carrito después de la compra
    });
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } }); // Despachar acción para eliminar el ítem
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
            {state.purchases.map((item: Purchase) => ( // Especificar el tipo aquí también
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
