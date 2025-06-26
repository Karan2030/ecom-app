import { Navbar, Container, Nav } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">ShopEase</Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/">Cart</Nav.Link>

                </Nav>
            </Container>
        </Navbar>
    );
}