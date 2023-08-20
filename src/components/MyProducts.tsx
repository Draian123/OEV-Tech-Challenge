import { styled } from "styled-components";
import { useShoppingList } from "./ShoppingListContext";
import HeartOutlinedIcon from "./icons/HeartOutlinedIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import TrashIcon from "./icons/TrashIcon";
import PlusIcon from "./icons/PlusIcon";
import MinusIcon from "./icons/MinusIcon";
import { useState,useEffect } from "react";


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

const Container = styled.div`
  width: 500px;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const TopContainer = styled.div`
  width: 100%;
  background-color: white;
  color: grey;
  font-weight: 400;
  border-radius: 15px;
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  margin: 10px;
`;

const TotalsContainer = styled.div`
  border-top: 1px solid #ccc;
  font-size: 14px;
  font-weight: 500;
  padding: 20px 0 0 0;
  color: grey;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
`;

const ShippingCostContainer = styled.div`
  color: grey;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
`;

const TrashButtonContainer = styled.button`
  background-color: white;
  border: none
`;

const FavoriteButton = styled.button`
  border: 0;
  background-color: white;
  width: 35px ;
  padding: 10px;

  cursor: pointer;
`;

const DeleteAllButton = styled.button`
  font-size: 13px;
  font-weight: 300;
  border: none;
  color: #C3C3C3;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmOrderButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px 12px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    background-color: #ccc;
    border: none;
    border-radius: 20px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;

    &:hover{
      background-color: #f5f5f5;
      color: #555;
    }
`;

const ConfirmOrderContainer = styled.div`
  margin: 10px 0 0 0;
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;


const ImageContainer = styled.div`
  border-radius: 10px;
  width: 100px;
  height: 70px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-right: 10px
`;

const QuantityButton = styled.button`
  border: none;
  background: none;
  display:flex;
  justify-content: center;
  align-items: center;
  width: 25px ;
  height: 25px;
  cursor: pointer;
`;

const QuantityContainer = styled.div`
border: 1px solid #F0F0F5;
background-color: white;
margin:0 5px;
width: 80px;
display: flex;
align-items: center;
justify-content: space-between;
  border: 1px solid #F0F0F5;
  background:none;
`;

const ShoppingListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 10px;
  height: 80px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  font-size: 14px;
  font-weight: 500;

`;
const CardTexts = styled.div`
  width: 180px;
  height: 70px;
`;
const CardPrice = styled.div`
  color: black;
  font-size: 14px;
  fonr-weight: 600;
`;



export default function MyProducts() {

    const {favorites, shoppingList, clearShoppingList, removeFromShoppingList, addToFavorites, removeFromFavorites } = useShoppingList();
    


    const initialCounts:number[] = shoppingList?.map(() => 0); // Initial count for each object
  //could be solved with context [{ count: Number, product: Product }]
    const [counts, setCounts] = useState<number[]>(initialCounts);
    const [subTotal, setSubtotal] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)



    const handleIncrement = (index: number) => {
      const updatedCounts = [...counts];
      updatedCounts[index] += 1;
      setCounts(updatedCounts);
    };

    const handleDecrement = (index: number) => {
      const updatedCounts = [...counts];
      if(updatedCounts[index]>0){
        updatedCounts[index] -= 1;
        setCounts(updatedCounts);
      }
    };

    const calculateSubtotal = ()=>{
      let pricesAdded = 0;
      shoppingList.forEach((product, index)=>{
        console.log(counts[index])
        pricesAdded += product.price * counts[index]
      })
      setSubtotal(pricesAdded)
    }

    const calculateTotal = ()=>{
      //tax and shippingcost
        let addedShipping = subTotal*1.19 + 20
        setTotal(addedShipping)
    }

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

    const deleteOneClick = (product: Product) => {
      return (event: React.MouseEvent) => {
        removeFromShoppingList(product)
        event.preventDefault();
      }
    }

    useEffect(() => {
      setCounts(initialCounts)
    }, [shoppingList]);
    
    useEffect(() => {
      calculateSubtotal()
      calculateTotal()
    }, [counts, subTotal]);

    if(shoppingList.length === 0){
      return     <Container>
      <TopContainer>
          <h5>No Items in the shopping list</h5>
      </TopContainer>
      </Container>
    }


  return (
    <Container>
        <TopContainer>
            <h5>My Products</h5>
            <DeleteAllButton onClick={clearShoppingList}>Delete All</DeleteAllButton>
        </TopContainer>
        <div>
          {shoppingList.map((product, index)=>{
            return(
            <ShoppingListItem key={product?.id}>
              <ImageContainer>
                <img src={product.thumbnail} alt="test" style={{maxHeight:"100%", maxWidth: "100px", borderRadius: "10px"}} />
              </ImageContainer>
              <CardTexts>
                <CardHeader>{product.title}</CardHeader>
                {product.title}
                <CardPrice>{product.price}€</CardPrice>
              </CardTexts>
              <FavoriteButton onClick={handleFavorite(product)}>    
                {isFavorite(product) ? <HeartSolidIcon/> : <HeartOutlinedIcon/>}
              </FavoriteButton>
                <div>
                  <QuantityContainer>
                    <QuantityButton onClick={() => handleDecrement(index)}>
                      <MinusIcon/>
                    </QuantityButton>
                    {counts[index]}
                    <QuantityButton onClick={() => handleIncrement(index)}>
                      <PlusIcon/>
                    </QuantityButton>
                  </QuantityContainer>
                </div>
                <TrashButtonContainer onClick={deleteOneClick(product)}><TrashIcon/></TrashButtonContainer>
            </ShoppingListItem>
            )
          })}
        </div>
            <TotalsContainer>
                <div>Subtotal</div>
                <div></div>
                <div></div>
                <CardPrice>{subTotal.toFixed(2)}€</CardPrice>
            </TotalsContainer>
            <ShippingCostContainer>
                <div>Shipping</div>
                <div></div>
                <div></div>
                <CardPrice>20.00€</CardPrice>
            </ShippingCostContainer>
            <TotalsContainer>
                <div>Total(+19% Tax)</div>
                <div></div>
                <div></div>
                <CardPrice>{total.toFixed(2)}€</CardPrice>
            </TotalsContainer>
            <ConfirmOrderContainer>
              <ConfirmOrderButton>
                  Confirm Order 
              </ConfirmOrderButton>
            </ConfirmOrderContainer>
    </Container>
  )
}
