// Cart.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart(); // Accede a state y dispatch

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } }); // Eliminar el ítem del carrito
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {state.purchases.length === 0 ? (
        <p>No hay items en el carrito.</p>
      ) : (
        <ul>
          {state.purchases.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Precio: ${item.price}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
