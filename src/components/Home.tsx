// src/components/Home.tsx
import React from 'react';
import ProductList from './ProductList';
import './Home.css'; // Importa el archivo CSS para estilizar

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Welcome to the NFT store</h1>
      <ProductList />
    </div>
  );
};

export default Home;
