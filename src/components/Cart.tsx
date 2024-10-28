// Cart.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  // Calcular el total
  const total = state.purchases.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {state.purchases.length === 0 ? (
        <p>There are no items in the cart.</p>
      ) : (
        <>
          <ul>
            {state.purchases.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Price:{item.price} ETH</p>
                  <p>Amount: {item.quantity}</p>
                </div>
                <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h3>Total: {total} ETH</h3> {/* Mostrar total */}
        </>
      )}
    </div>
  );
};

export default Cart;
