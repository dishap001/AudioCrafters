/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.svg";
import "./Header.css";
import { useEffect, useState } from "react";


function Header() {
  const [signedIn, setSignedIn] = useState(false);

  const navigate = useNavigate();


  const checkSignIn = async () => {
    const storedUser = localStorage.getItem("isSignIn") || ''; // Use empty string as default
    console.log('Stored user:', storedUser);
    setSignedIn(!!storedUser);
    console.log('Stored user in useEffect:', storedUser); // Access it here if needed
  };
  
  useEffect(() => {
    checkSignIn();

  }, []);
  

const SignOut =  () => {

   localStorage.removeItem("isSignIn");
  setSignedIn(false);
  navigate("/");
};

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Navbar.Brand as={Link} to="/">
        <img
          alt="Logo"
          src={logo}
          width="200"
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>

          {signedIn && (
            <>
              <Nav.Link as={Link} to="/ForArtists">
                For Artists
              </Nav.Link>
            </>
          )}

          <Nav.Link as={Link} to="/ForListeners">
            For Listeners
          </Nav.Link>
        </Nav>
        <Nav>
          {!signedIn && (
            <>
              <Nav.Link as={Link} to="/SignUp">
                Sign up
              </Nav.Link>
              <Nav.Link as={Link} to="/SignIn">
                Sign In
              </Nav.Link>
            </>
          )}
          {signedIn && (
            <>
              <Nav.Link as={Link} to="/SignIn" onClick={SignOut}>
                Sign Out
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
