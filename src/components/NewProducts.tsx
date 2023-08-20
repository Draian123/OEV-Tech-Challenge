import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useShoppingList } from "./ShoppingListContext";
import LeftArrow from "./icons/LeftArrow";
import RightArrow from "./icons/RightArrow";
import ProductCard from "./ProductCard";


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
  images: string[],
  }

const Container = styled.div`
  display: inline-block;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin: 10px;
`;

const Heading = styled.div`
  margin: 0 0 0 25px;
`; 

const NewProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-bottom: 1px solid #F0F0F5;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButtons = styled.button`
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color:white;
  border-radius: 50px;
  border: none;
  padding: 5px;
  margin: 0 5px;
  &:hover{
      background-color: #f5f5f5;
      color: #555;
    }
`;

const ProductsPerPage = 6;

export default function NewProducts() {
  const { addToShoppingList, removeFromFavorites, addToFavorites, favorites } = useShoppingList();

  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ProductsPerPage;
  const endIndex = startIndex + ProductsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / ProductsPerPage);


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products`);
      setProducts(response.data.products);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getProducts();
  }, []);

  if (isFetching) {
    return <div>Loading...</div>;
  }
   
  return (
    <Container>
      <Heading>New Products</Heading>
      <NewProductsContainer>
      {displayedProducts.map((product:Product) =>{
        return <ProductCard product={product} handleFavorite={handleFavorite} isFavorite={isFavorite} addtoShoppingClick={addtoShoppingClick}/>
      })}
      </NewProductsContainer>
      <br />
      <ButtonContainer>
        <PageButtons onClick={handlePrevPage} disabled={currentPage === 1}>
          <LeftArrow/>
        </PageButtons>
        <span>
          {currentPage} / {totalPages}
        </span>
        <PageButtons onClick={handleNextPage} disabled={currentPage === totalPages}>
          <RightArrow/>
        </PageButtons>
      </ButtonContainer>
    </Container>
  )
}
