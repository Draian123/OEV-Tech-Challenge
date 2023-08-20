import HeartOutlinedIcon from "./icons/HeartOutlinedIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import PlusIcon from "./icons/PlusIcon";
// import { useEffect, useState } from "react";
import { styled } from "styled-components";

const ListItemContainer = styled.div`
  display: flex;
  font-size: 10px;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  margin: 5px;
  height: 150px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  border-radius: 10px;
  width: 120px!important;
  height: 120px;
  display: flex;
  align-items: flex-start;
`;

const CardGroup = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
  width: 100%;
  background-color: white;
  padding-left:10px
`;

const ProductHeading = styled.span`
  font-size: 11px;
  font-weight: bold;
  display: flex;
  width: 100%;
  background-color: white;
  border-radius: 15px;
  align-items: space-between;
  justify-content: space-between;
`;

const CardText = styled.div`
    height: 50px;
    overflow: hidden;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border: 0;
  background-color: #ccc;
  border-radius: 25px;
  width: 35px ;
  padding: 10px;
  cursor: pointer;
  &:hover{
      background-color: #f5f5f5;
      color: #555;
    }

`;

const AddToShoppingCartButton = styled.button`
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    font-size: 10px;
    color: #333;
    background-color: #ccc;
    border: none;
    border-radius: 20px;
    transition: background-color 0.3s, color 0.3s;

    &:hover{
      background-color: #f5f5f5;
      color: #555;
    }
`;

const PlusIconContainer = styled.div`
  margin: 0 8px 0 0;
  background-color: black;
  border-radius:15px;
  color: white;
  padding: 3px;
  display:flex;
  justify-content: center;
`;

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


interface ProductCardProps {
    product: Product,
    handleFavorite: Function,
    isFavorite: Function,
    addtoShoppingClick: Function
  }

export default function ProductCard({product,handleFavorite,isFavorite,addtoShoppingClick}:ProductCardProps) {
    return (<>
    <ListItemContainer key={product.id}>
      <ImageContainer>
        <img src={product.thumbnail} style={{maxHeight:"120px", maxWidth: "120px", borderRadius: "10px" }} alt="image" />
      </ImageContainer>
      <CardGroup>
        <ProductHeading>
          <div>{product.title}</div>
          <div>{product.price.toFixed(2)}€</div>
        </ProductHeading>
        <CardText>
          {product.description}
        </CardText>
        <ButtonGroup>
          <FavoriteButton onClick={handleFavorite(product)}>    
              {isFavorite(product) ? <HeartSolidIcon/> : <HeartOutlinedIcon/>}
          </FavoriteButton>
            <AddToShoppingCartButton onClick={addtoShoppingClick(product)}>
              <PlusIconContainer>
                <PlusIcon/>
              </PlusIconContainer>
              <div>
                Add to list
              </div>  
            </AddToShoppingCartButton>
        </ButtonGroup>
      </CardGroup>

    </ListItemContainer>
    </>)
}
