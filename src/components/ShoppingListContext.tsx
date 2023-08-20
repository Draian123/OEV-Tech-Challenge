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
  // objectArray: [{count: number, product: Product}]
  // updateCount:()=> void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

interface ShoppingListProviderProps {
  children: ReactNode;
}
// interface ObjectWithCount {
//   count: number;
//   product: Product;
// }

export const ShoppingListProvider: React.FC<ShoppingListProviderProps> = ({ children }) => {
  const [shoppingList, setShoppingList] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  // const [objectArray, setObjectArray] = useState<ObjectWithCount[]>([
  //   { count: 0, product: {
  //     id: 0,
  //     title: "",
  //     description: "",
  //     price: 0,
  //     discountPercentage: 0,
  //     rating: 0,
  //     stock: 0,
  //     brand: "",
  //     category: "",
  //     thumbnail: "",
  //     images: [""]
  //   }},
  //   // You can add more objects to the initial array if needed
  // ]);

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

  // const updateCount = (index:number) => {
  //   setObjectArray(prevArray => [
  //     { ...prevArray[index], count: prevArray[index].count + 1 },
  //     ...prevArray.slice(1) // Keep the rest of the objects unchanged
  //   ]);
  // };

  const contextValue: ShoppingListContextType = {
    shoppingList,
    favorites,
    addToShoppingList,
    removeFromShoppingList,
    addToFavorites,
    removeFromFavorites,
    clearShoppingList,
    // // @ts-ignore: Unreachable code error
    //  objectArray,
    //  // @ts-ignore: Unreachable code error
    // updateCount
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