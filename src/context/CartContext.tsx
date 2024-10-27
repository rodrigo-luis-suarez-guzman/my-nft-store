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
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

// Define los tipos de acción
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Purchase }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } };

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  purchases: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, purchases: [...state.purchases, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, purchases: state.purchases.filter(item => item.id !== action.payload.id) };
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

// Hook para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
