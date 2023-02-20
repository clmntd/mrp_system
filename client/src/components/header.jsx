import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  return (
    <Navbar style={{ backgroundColor: "#f8f9fa", height: "75px" }}>
      <Navbar.Collapse className="justify-content-end px-5">
        <Navbar.Text>{/* Welcome! */}</Navbar.Text>
        <NavDropdown
          title="&nbsp; Welcome!"
          id="basic-nav-dropdown"
          menuVariant="dark"
          align="end"
        >
          <NavDropdown.Item href="/">Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
