import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import React from "react";


export default function Menu(props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='mt-0'>
      <Container>
      <LinkContainer to="/"><Navbar.Brand >Início</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              <NavDropdown title="Formulários" id="collapsible-nav-dropdown">
              <LinkContainer to="/cadastroFuncionario"><NavDropdown.Item >Funcionário</NavDropdown.Item></LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
}

