// import { Link } from "react-router-dom"

// function Header() {
//   return (
//    <>
//    <div className="Header">
//    <nav>
//         <ul className="Menu"><li><Link to='/'>Home</Link></li></ul>
//     </nav>
//     <ul className="UserRegistration" >
//                 <li><Link to='/SignUp'>Sign up</Link></li>
//                 <li><Link to='/SignIn'>Sign In</Link></li>
//      </ul>
//    </div>
   
//    </>
//   )
// }

// export default Header


import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.svg";
import "./Header.css";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
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
          <Nav.Link as={Link} to="/ForArtists">
            For Artists
          </Nav.Link>
          <Nav.Link as={Link} to="/ForListeners">
            For Listeners
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/SignUp">
            Sign up
          </Nav.Link>
          <Nav.Link as={Link} to="/SignIn">
            Sign In
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
