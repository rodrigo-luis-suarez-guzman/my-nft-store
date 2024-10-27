import React from 'react';
import { useCart } from '../context/CartContext';


const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  return (
    <div>
      <h2>Tu Carrito</h2>
      <ul>
        {state.purchases.length === 0 ? (
          <p>No hay artículos en tu carrito.</p>
        ) : (
          state.purchases.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>{item.name}</div>
              <div>Precio: ${item.price}</div>
              <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Cart;
