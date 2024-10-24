// src/components/Cart.tsx
import React from 'react';
import { useCart } from '../context/CartContext'; // Asegúrate de importar useCart

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  return (
    <div>
      {state.items.length === 0 ? (
        <p>No hay items en el carrito</p>
      ) : (
        state.items.map((item: { id: number; name: string; price: number; quantity: number }) => (
          <div key={item.id}>
            <p>{item.name} - ${item.price} (Cantidad: {item.quantity})</p>
            <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
