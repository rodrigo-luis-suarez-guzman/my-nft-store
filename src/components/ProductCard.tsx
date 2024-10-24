import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  addToCart: (id: string, name: string, price: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, addToCart }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", width: "200px", margin: "10px" }}>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <button onClick={() => addToCart(id, name, price)} style={{ background: "#ff9800", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
