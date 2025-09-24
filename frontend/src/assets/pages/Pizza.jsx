import { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Pizza = () => {

  const [pizza, setPizza] = useState([])
  const { id } = useParams();
  const { addToCart } = useContext(CartContext)

  const url = `http://localhost:5000/api/pizzas/${id}`;

  useEffect(() => {
    getData()
  }, [url]);

  const getData = async () => {   
    const response = await fetch(url);
    const data = await response.json();
    setPizza(data)
  }
  return ( 
    <div className='mt-5 py-5 container'>
      <div className='row pt-3 align-items-center'>
        <div className="col-12 col-md-5">
          <Carousel className='carousel-dark'>
            <Carousel.Item interval={8000}>
              <img
                className="d-block w-100"
                src={pizza.img}
                alt="First slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={8000}>
              <img
                className="d-block w-100"
                src={pizza.img2}
                alt="First slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-12 col-md-7 col-xl-6 ps-lg-4">
          <h2 className="h2-home mb-4">{pizza.name}</h2>
          <p className="card-text mb-4">{pizza.desc}</p>
          <h3 className='mb-2 mb-lg-4'>$ {pizza.price && pizza.price.toLocaleString('es-CL')}</h3>
           
          <div className='pt-4'>             
            <Link to="/tienda">
              <Button 
                className="btn-outline-morado"
                > <i className="fa-solid fa-arrow-left fa-lg pe-2"></i> Volver a la tienda
              </Button>
            </Link>
            <button className='btn btn-primary px-5 ms-3 ms-xl-4 mt-4 mt-lg-0' onClick={() => addToCart(pizza)}>
              Agregar <i className="fa-cart-shopping fa-lg fa-solid ps-2"></i>
            </button>
          </div>
        </div>
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
    </div>
  );
}
 
export default Pizza;