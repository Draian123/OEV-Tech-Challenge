import React, { createContext, useContext, useState, ReactNode } from 'react';

type Product = {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[]
  }


interface ShoppingListContextType {
  shoppingList: Product[];
  favorites: Product[];
  addToShoppingList: (product: Product) => void;
  removeFromShoppingList: (product: Product) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (product: Product) => void;
  clearShoppingList: () => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

interface ShoppingListProviderProps {
  children: ReactNode;
}

export const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({ children }) => {
  const [shoppingList, setShoppingList] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToShoppingList = (product: Product):void => {
    //if its already in array then do nothing
    const isObjectInArray = shoppingList.some(obj => obj.id === product.id);
    if(isObjectInArray){
      return
    }
    setShoppingList([...shoppingList, product]);
  };

  const removeFromShoppingList = (product: Product) => {
    setShoppingList(shoppingList.filter(item => item !== product));
  };

  const addToFavorites = (product: Product) => {
    setFavorites([...favorites, product]);
  };

  const removeFromFavorites = (product: Product) => {
    setFavorites(favorites.filter(item => item !== product));
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };

  const contextValue: ShoppingListContextType = {
    shoppingList,
    favorites,
    addToShoppingList,
    removeFromShoppingList,
    addToFavorites,
    removeFromFavorites,
    clearShoppingList,
  };

  return (
    <ShoppingListContext.Provider value={contextValue}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = (): ShoppingListContextType => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};