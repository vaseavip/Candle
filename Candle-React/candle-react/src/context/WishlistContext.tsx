import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

import type { Product } from '../types/Product';

interface WishlistContextType {
  wishlist: Product[];
  isInWishlist: (id: number) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wishlist');

    return saved ? JSON.parse(saved) : [];
  });

  function isInWishlist(id: number) {
    return wishlist.some((item) => item.id === id);
  }

  function toggleWishlist(product: Product) {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product],
    );
  }

  function removeFromWishlist(id: number) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, isInWishlist, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used inside WishlistProvider');
  }

  return context;
}
