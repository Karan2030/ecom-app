import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Container, Button, Alert } from "react-bootstrap";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  // dummy cart
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <Container className="p-4">
        <img src={product.image} alt={product.title} className="d-block mx-auto" style={{ height: '300px', objectFit: 'contain' }} />
        <h2 className="mt-3">{product.title}</h2>
        <p>{product.description}</p>
        <p className="fw-bold">Price: ${product.price}</p>
        <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
        {added && <Alert className="mt-3" variant="success">Added to cart!</Alert>}
      </Container>
    </div>
  );
}