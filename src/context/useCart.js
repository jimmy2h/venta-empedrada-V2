import { useContext } from 'react';
import { CartContext } from './cartContextObject';

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe utilizarse dentro de un <CartProvider>');
  }
  return ctx;
}

