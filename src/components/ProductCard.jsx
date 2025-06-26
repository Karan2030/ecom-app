import { Card } from "react-bootstrap";

export default function ProductCard({ product, onClick }) {
  return (
    // Product cardd
    <Card className="h-100 cursor-pointer" onClick={onClick}>
      <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'contain' }} />
      <Card.Body>
        <Card.Title style={{ fontSize: '1rem' }}>{product.title}</Card.Title>
        <Card.Text className="text-primary fw-bold">${product.price}</Card.Text>
        <Card.Text className="text-muted">Rating: {product.rating.rate}</Card.Text>
      </Card.Body>
    </Card>
  );
}