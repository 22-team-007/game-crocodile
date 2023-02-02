import {Container, Nav, Navbar} from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/" as="div">Текущий</Nav.Link>
            <Nav.Link href="/all" as="div">Весь</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
