import { useMemo, useRef, useState, useEffect } from "react"
import { styled } from "styled-components";



const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  margin: 10px;
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

interface SearchResult {
    id: number;
    name: string;
  }
  
  
  const SearchBar: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<SearchResult[]>([
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'Orange' },
      { id: 4, name: 'Mango' },
      { id: 5, name: 'Pineapple' },
      { id: 6, name: 'Grapes' },
      { id: 7, name: 'Strawberry' },
      { id: 8, name: 'Blueberry' },
      { id: 9, name: 'Watermelon' },
      { id: 10, name: 'Cherry' },
    ]);
  
    const updateSuggestions = (inputValue: string) => {
      if (inputValue.trim() === '') {
        return [];
      }
  
      const filteredSuggestions = suggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      return filteredSuggestions.slice(0, 3); // Limit suggestions to 3 items
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newInputValue = event.target.value;
      setInputValue(newInputValue);
    };
  
    const handleSuggestionClick = (suggestion: SearchResult) => {
      setInputValue(suggestion.name);
      setSuggestions([]);
    };
  
    const filteredSuggestions = updateSuggestions(inputValue);
  
    return (
      <Container>
        <SearchInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        {filteredSuggestions.length > 0 && inputValue.trim() !== '' && (
          <ul className="suggestion-list">
            {filteredSuggestions.map(suggestion => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
        <AddButton>Add New Product</AddButton>
      </Container>
    );
  };
  
  export default SearchBar;