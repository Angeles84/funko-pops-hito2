import { useContext } from 'react';
//import pizzasCart from '../components/pizzasCart.js'
import { CartContext } from '../context/CartContext.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import pagado from '../img/pago-exitoso.gif'
import './pages.css' 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Cart = () => {
  const { cart, totalPrice, disminuirtCount, aumentarCount, cartCheckout, checkoutSuccess} = useContext(CartContext);
  const { isLogged } = useContext(UserContext);


  const pagarCarrito = async () => {
    await cartCheckout();
    const myModalEl = document.getElementById('exampleModal2');
    const myModal = new window.bootstrap.Modal(myModalEl);
    myModal.show();
  }

  return ( 
    <>
      <div className="container my-5 py-5">
        <h2 className="mb-4 h2-home mt-lg-5">Carrito de compras</h2>
        <ul className="list-group mb-4">
          {
            cart.length >= 1 ? 
            cart.map(pizza => (
              <li key={pizza.name} className="list-group-item">
                <div className='row align-items-center'>
                  <div className='col-6 col-md-4 col-lg-3'>
                    <img src={pizza.img} alt="pizza 1" className='w-50 img-fluid'/>
                  </div>
                  <div className='col-6 col-md-4 col-lg-3'>
                    <h5 className='mb-4'><b>Producto:</b></h5>
                    <h5 className=''><b>{pizza.name}</b></h5>
                  </div>
                  <div className='col-12 col-md-4 col-lg-3 mt-3 mt-md-0'>
                    <h5 className='mb-4'><b>Cantidad:</b></h5>
                    <button className='btn btn-outline-danger me-2' onClick={() => disminuirtCount(pizza)}>-</button>
                    <span className='fs-5 me-2'><b>{pizza.count}</b></span>
                    <button className='btn btn-outline-success' onClick={() => aumentarCount(pizza)}>+</button>
                  </div>
                  <div className='col-12 col-md-4 col-lg-3'>
                    <h5 className='mb-4'><b>Precio:</b></h5>
                    <span className='fs-5 me-3'><b>${(pizza.price * pizza.count).toLocaleString('es-CL')}</b></span>
                  </div>
                </div>
              </li>
            )) :
            <li className="list-group-item py-4">El carrito se encuentra vacío</li>
          }
        </ul>
        
        <div className='d-flex justify-content-between pt-2 pb-lg-5'>
          <Link to="/tienda">
            <Button 
              className="me-lg-3 btn-outline-seguircomprando"
              > <i className="fa-solid fa-arrow-left fa-lg pe-2"></i> Seguir comprando
            </Button>
          </Link>
          <div>
            <h3 className='mb-4'><b>Total: ${totalPrice && totalPrice.toLocaleString('es-CL')}</b></h3>
            <button className={ isLogged && cart.length > 0 ? 'btn btn-primary px-5' : 'btn btn-primary px-5 disabled'} onClick={() => pagarCarrito()}>
              Pagar <i className="fa-credit-card fa-lg fa-solid ps-3"></i>
            </button>
          </div>
        </div>
        
        {checkoutSuccess && <div className='text-center'><img src={pagado} alt="" className="img-fluid ancho-img"/></div>}
      </div>

      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel2">¡Tu compra ha sido realizada con éxito!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
       
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-success px-5" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Cart;