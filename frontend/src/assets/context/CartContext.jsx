import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

const CartProvider  = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(null);
  const {token} = useContext(UserContext)

  const totalPrice = cart.reduce(
    (total, pizza) => total + pizza.price * pizza.count,
    0
  );

  const eliminarPizza = (pizza) => {
    const listaFiltrada = cart.filter(el => el.name !== pizza.name)
    setCart(listaFiltrada)
  }

  const disminuirtCount = (pizza) => {
    const nuevoCart = [...cart] 
    const index = nuevoCart.findIndex(el => el.name === pizza.name)
    if(nuevoCart[index].count >= 2 ) {
      nuevoCart[index].count = nuevoCart[index].count - 1
      setCart(nuevoCart)
    } else if (nuevoCart[index].count <= 1)
      eliminarPizza(pizza)
  }

  const aumentarCount = (pizza) => {
    const nuevoCart = [...cart] 
    const index = nuevoCart.findIndex(el => el.name === pizza.name)
    nuevoCart[index].count = nuevoCart[index].count + 1
    setCart(nuevoCart)
  }
  
  const addToCart = ({ id, price, name, img }) => {
    const productoEcontradoIndex = cart.findIndex((p) => p.name === name);
    const producto = { id, price, name, img, count: 1 };

    if (productoEcontradoIndex >= 0) {
      cart[productoEcontradoIndex].count++;
      setCart([...cart]);
    } else {
      setCart([...cart, producto]);
    }
  };

  const getQuantity = () => cart.reduce((total, pizza) => total + pizza.count, 0);

  const cartCheckout = async () => {
    const response = await fetch("http://localhost:5000/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cart: cart,
      }),
    });
    
    let data = await response.json();
    console.log('dataCart', data);
    if (data.message == 'Checkout successful') {
      setCart([]);
      setCheckoutSuccess(true);
      //alert('Pago exitoso!!')   
    } else {
      setCheckoutSuccess(false);
      alert(data?.error || data.message);
    }
  };

  return ( 
    <CartContext.Provider value={{cart, totalPrice, disminuirtCount, aumentarCount, getQuantity, addToCart, cartCheckout, checkoutSuccess}}>
      {children}
    </CartContext.Provider>
   );
}
 
export default CartProvider ;