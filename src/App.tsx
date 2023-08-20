// import React, { createContext, useContext, useState } from 'react';
import { styled } from "styled-components";
import NewProducts from './components/NewProducts'
import Searchbar from './components/Searchbar'
import MyProducts from './components/MyProducts'
import { ShoppingListProvider } from './components/ShoppingListContext';

const Container = styled.div`
  display:flex;
  width: 85%;
  margin: 0 auto;
  @media (max-width: 1400px) {
        flex-direction: column;
      }
`; 

const LeftContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 55%;
  @media (max-width: 1300px) {
        width: 560px;
      }
`; 
const RightContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 40%;
`; 

const Heading = styled.div`
  display:block;
  font-size: 25px;
  font-weight: 600;
  width: 100%;
  margin: 10px 0;
`; 

function App() {


  return (
    <ShoppingListProvider>
      <Container>
        <Heading >My shopping list</Heading>  
      </Container>
      <Container>
        <LeftContainer>
          <div>
            <Searchbar/>
            <NewProducts/>
          </div>
        </LeftContainer>
          <RightContainer>
            <MyProducts/>
          </RightContainer>
      </Container>
    </ShoppingListProvider>
  )
}

export default App
