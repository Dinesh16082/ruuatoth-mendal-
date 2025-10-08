import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
    return (
        <Navbar expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand as={NavLink} to="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Home */}
                        <Nav.Link as={NavLink} to="/candidate-dashboard" className="nav-link">
                            Home
                        </Nav.Link>

                        {/* Jobs Dropdown */}
                        <NavDropdown title="Jobs" id="basic-nav-dropdown">
                            {/* If you implement this later, add route in App.js */}
                            {/* <NavDropdown.Item as={NavLink} to="/relatedjob">Related Jobs</NavDropdown.Item> */}
                            <NavDropdown.Item as={NavLink} to="/alljobs">All Jobs</NavDropdown.Item>
                        </NavDropdown>

                        {/* Applied Jobs */}
                        <Nav.Link as={NavLink} to="/history" className="nav-link">
                            Applied Jobs
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
