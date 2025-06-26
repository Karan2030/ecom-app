import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Pagination, Button } from "react-bootstrap";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [sortOption, setSortOption] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const updated = e.target.checked
      ? [...selectedCats, value]
      : selectedCats.filter((cat) => cat !== value);
    setSelectedCats(updated);
  };

  const handleSortChange = (e) => setSortOption(e.target.value);
  // sorting
  const sortedFiltered = filtered
    .filter((p) =>
      selectedCats.length ? selectedCats.includes(p.category) : true
    )
    .sort((a, b) => {
      if (sortOption === "price") return a.price - b.price;
      if (sortOption === "popularity") return b.rating.rate - a.rating.rate;
      return a.title.localeCompare(b.title);
    });

  const totalPages = Math.ceil(sortedFiltered.length / itemsPerPage);
  const paginated = sortedFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // pagination logic
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Header />
      <Container fluid className="mt-4">
        <Row>
          <Col md={3}><Sidebar categories={categories} onFilterChange={handleFilterChange} /></Col>
          <Col md={9}>
            <Form.Select
              className="mb-3"
              aria-label="Sort Products"
              onChange={handleSortChange}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="popularity">Sort by Popularity</option>
            </Form.Select>
            <Row xs={1} sm={2} md={3} className="g-4">
              {paginated.map((product) => (
                <Col key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-center mt-4">
              <Pagination>{paginationItems}</Pagination>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}