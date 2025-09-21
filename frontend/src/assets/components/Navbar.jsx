import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, NavLink } from "react-router-dom";
import { CartContext } from '../context/CartContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { useContext } from 'react';

const NavBar = () => {

  const { getQuantity } = useContext(CartContext);
  const { logout, isLogged } = useContext(UserContext);

  const setActiveClass = ({ isActive }) => (isActive ? "btn btn-outline-secondary mb-3 me-lg-3 mb-lg-0" : "btn btn-outline-primary mb-3 me-lg-3 mb-lg-0");

  return ( 
    <>
      <Navbar expand="lg" fixed="top" className="bg-body-tertiary bg-white shadow">
        <Container>
          <Navbar.Brand href="/" className='logo-luckiest'>
            Funko<span>M</span>anía
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-light'/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto py-3 py-lg-1">
            <NavLink
              to="/"
              className={ setActiveClass }
              >
              Inicio
            </NavLink>
              {isLogged ? 
                <>
                  <NavLink 
                    className={ setActiveClass }
                    variant="outline-secondary"
                    to="/tienda"
                  >
                    Tienda
                  </NavLink>
                  <NavLink 
                    className={ setActiveClass }
                    variant="outline-secondary"
                    to="/profile"
                  >
                    Perfil
                  </NavLink>
                  <Link to="/">
                    <Button 
                      
                      className="me-lg-3"
                      variant="outline-primary"
                      onClick={() => logout()} 
                      >Logout
                    </Button>
                  </Link>
                </> : 
                <>
                  <NavLink 
                    className={ setActiveClass }
                    variant="outline-secondary"
                    to="/register"
                    >
                      Registro
                  </NavLink>
                  <NavLink 
                    className={ setActiveClass }
                    variant="outline-secondary" 
                    to="/login"
                  >
                    Login
                  </NavLink>
                </>
              }
              <NavLink 
                className={ setActiveClass }
                variant="outline-secondary"
                to="/cart"
              >
                🛒 <sup>{ getQuantity() }</sup>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
   );
}
 
export default NavBar;