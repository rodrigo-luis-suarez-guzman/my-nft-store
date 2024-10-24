// src/components/Home.tsx
import React from 'react';
import ProductList from './ProductList';
import './Home.css'; // Importa el archivo CSS para estilizar

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Bienvenido a la tienda NFT</h1>
      <ProductList />
    </div>
  );
};

export default Home;
