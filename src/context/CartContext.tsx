import React, { createContext, useReducer, ReactNode, useContext } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string; // Agregar imagen
  quantity: number;
}

interface CartState {
  items: CartItem[];
  purchases: CartItem[]; // Asegúrate de tener esta propiedad
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
  | { type: 'PURCHASE_ITEMS'; payload: CartItem }; // Agregar payload

const initialState: CartState = { items: [], purchases: [] }; // Inicializa compras

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    case 'PURCHASE_ITEMS':
      return { ...state, purchases: [...state.purchases, action.payload], items: [] }; // Mueve el artículo a compras
    default:
      return state;
  }
};

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook para usar el CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
