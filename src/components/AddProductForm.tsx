import React, { useState } from 'react';
// import { styled } from "styled-components";


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
    <div className="container">
        <div className='rowContainer'>
          <div className='inlineBlock'>Create product</div>
          <div className='inlineBlock'>
            X
          </div>
        </div>
        <form className='.rowContainer' onSubmit={handleSubmit}>
          <div>
              <input type="file" id="image" name="image" placeholder='Image' onChange={handleImageChange} />
          </div>
          <br />
          
          <div>
            <div>
              <input type="text" id="title" name="title" placeholder='Title' value={formData.title} onChange={handleInputChange} />
            </div>

            <div>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} />
            </div>

            <div className="description" >
              <textarea placeholder='description' id="description" name="description" value={formData.description} onChange={handleInputChange} />
            </div>

            <div>
              <label htmlFor="favorite">Favorite:</label>
              <input type="checkbox" id="favorite" name="favorite" checked={formData.favorite} onChange={handleInputChange} />
            </div>
            
            <div className='submitButtonContainer '>
              <input className='submitButton' type="submit" value="Add new product"  />
            </div>
          </div>
        </form>
    </div>
  );
};

export default AddProductFrom;
