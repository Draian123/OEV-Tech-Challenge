import React, { useState } from 'react';
import { styled } from "styled-components";


const FormContainer = styled.form`
    width: 580px;
    height: 500px;
    max-height: 150px;
    position: absolute;
`;


interface FormData {
  title: string;
  price: number;
  description: string;
  favorite: boolean;
  image: File | null;
}

const AddProductFrom: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: 0,
    description: '',
    favorite: false,
    image: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
      //@ts-ignore: Unreachable code error
        image: event.target.files[0],
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(console.log);

  };

  return (
    <div>
        <div>
          <div>Create product</div>
          <div>
            X
          </div>
        </div>
        <FormContainer onSubmit={handleSubmit}>
          <div>
            <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" onChange={handleImageChange} />
          </div>
          <br />
          
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
            <br />

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} />
            <br />

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
            <br />

            <label htmlFor="favorite">Favorite:</label>
            <input type="checkbox" id="favorite" name="favorite" checked={formData.favorite} onChange={handleInputChange} />
            <br />

            <input type="submit" value="Submit" />
          </div>
        </FormContainer>
    </div>
  );
};

export default AddProductFrom;
