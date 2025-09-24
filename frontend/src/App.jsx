
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './assets/components/Navbar'
import Footer from './assets/components/Footer';
import Pizza from './assets/pages/Pizza';
import Home from './assets/pages/Home';
import Cart from './assets/pages/Cart';
import Register from './assets/pages/Register';
import Login from './assets/pages/Login';
import Profile from "./assets/pages/Profile";
import Tienda from "./assets/pages/Tienda";
import Admin from "./assets/pages/Admin";
import NotFound from "./assets/pages/NotFound";
import CartProvider from "./assets/context/CartContext";
import { UserContext } from './assets/context/UserContext';
import { useContext } from 'react';

function App() {

  const { isLogged } = useContext(UserContext);

  return (
    <>
      <CartProvider>
        <NavBar/>

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={isLogged ? <Navigate to="/tienda"/> : <Login/> }
          >
          </Route>
          <Route
            path="/register"
            element={isLogged ? <Navigate to="/profile" /> : <Register />}
          >
          </Route>
          <Route
            path="/cart"
            element={<Cart/>}
          >
          </Route>
          <Route
            path="/pizza/:id"
            element={<Pizza/>}
          >
          </Route>
         
          <Route
            path="/tienda"
            element={isLogged ? <Tienda /> : <Navigate to="/login" />}
          >
          </Route>
          <Route
            path="/admin"
            element={isLogged ? <Admin /> : <Navigate to="/login" />}
          >
          </Route>
          <Route
            path="/profile"
            element={isLogged ? <Profile /> : <Navigate to="/login" />}
          >
          </Route>
          <Route
            path="*"
            element={<NotFound/>}
            >
          </Route>
          <Route
            path="/404"
            element={<NotFound/>}
          >
          </Route>
        </Routes>
      </CartProvider>
      <Footer/>
    </>
  )
}

export default App
