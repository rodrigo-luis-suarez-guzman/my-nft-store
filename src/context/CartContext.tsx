// CartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Purchase {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  purchases: Purchase[];
  completedPurchases: Purchase[]; // Para almacenar el historial de compras
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  purchases: [],
  completedPurchases: [],
};

const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, purchases: [...state.purchases, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, purchases: state.purchases.filter(item => item.id !== action.payload.id) };
    case 'COMPLETE_PURCHASE':
      return {
        ...state,
        completedPurchases: [...state.completedPurchases, ...state.purchases],
        purchases: [], // Limpiar carrito después de completar la compra
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
