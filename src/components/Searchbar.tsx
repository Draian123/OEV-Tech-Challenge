import {
  //  useMemo,
  //  useRef,
   useState,
   useEffect } from "react"
import { styled } from "styled-components";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useShoppingList } from "./ShoppingListContext";
import AddProductFrom from "./AddProductForm";




const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  margin: 10px;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  border-radius: 5px;
  border: none;
  padding: 10px;
  background-color: #F0F0F5;
  margin-right: 10px;
`;

const AddButton = styled.button`
  background-color: #ccc;
  font-weight: 400;
  font-size: 14px;
  color: black;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover{
      background-color: #f5f5f5;
      color: #555;
    }
`;

const SuggestionList = styled.div`
    list-style: none;
    padding: 0;
    margin: 200px 0 0 0 ;
    border: 1px solid #ccc;
    border-top: none;
    width: 580px;
    height: 500px;
    max-height: 150px;
    overflow-y: auto;
    position: absolute;
    background-color: white;
`;

const SuggestionListLi = styled.div`
    padding: 8px 10px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    &:last-child{
      border-bottom: none;
    }
`;

interface Product {
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
  
  
  const SearchBar: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);

    const { addToShoppingList, removeFromFavorites, addToFavorites, favorites } = useShoppingList();
  
    const getProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products`);
        setSuggestions(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };


    const updateSuggestions = (inputValue: string) => {
      if (inputValue.trim() === '') {
        return [];
      }
  
      const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      return filteredSuggestions.slice(0, 3); // Limit suggestions to 3 items
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputValue = event.target.value;
      setInputValue(newInputValue);
    };

    //Do Not Reaped yourself btw
    const isFavorite = (product:Product)=>{
      if(favorites.some(item=>item.id === product.id)){
        return true;
      }
      return false;
    }
  
    const handleFavorite=( product:Product)=>{
      if(isFavorite(product)){
        return (event: React.MouseEvent) => {
          removeFromFavorites(product)
          event.preventDefault();
        }
      }
      else{
        return (event: React.MouseEvent) => {
          addToFavorites(product)
          event.preventDefault();
        }
      }
    }

    const addtoShoppingClick = (product: Product) => {
      return (event: React.MouseEvent) => {
        addToShoppingList(product)
        event.preventDefault();
      }
    }


    const filteredSuggestions = updateSuggestions(inputValue);

    useEffect(() => {
      getProducts()
    }, []);
  
    return (
      <Container>
        <SearchInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        {filteredSuggestions.length > 0 && inputValue.trim() !== '' && (
          <SuggestionList>
            {filteredSuggestions.map(suggestion => (
                <SuggestionListLi
                key={suggestion.id}
                >
                    <ProductCard product={suggestion} isFavorite={isFavorite} handleFavorite={handleFavorite} addtoShoppingClick={addtoShoppingClick}/>
               </SuggestionListLi>
            ))}
          </SuggestionList>
        )}
        <AddButton onClick={() => {
          if(showForm){
            setShowForm(false)
            return
          }else{
            setShowForm(true)
            return
          }
        }}>Add New Product</AddButton>
        {showForm&& <AddProductFrom/>}
      </Container>
    );
  };
  
  export default SearchBar;