import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState} from 'react'


const CardPizza = ({name, price, ingredients, img, id}) => {

  const { addToCart } = useContext(CartContext)
  const pizza = { name, ingredients, price, img, id };

  const [liked, setLiked] = useState(false);

  const darLike = () => {
    setLiked(!liked); // alterna entre true y false
  };

  return ( 
    <>
      <Card className='mb-5 card-funko shadow'>
        <Card.Img variant="top" src={img}/>
        <Card.Body className='card-funko-body'>
          <div className='d-flex justify-content-between pt-2 pb-4 mb-1'>
            <Card.Title className='text-center card-funko-title pt-1 mb-0'>
              {name} ${price.toLocaleString('es-CL')}
            </Card.Title>
            <button className='boton-estrella' onClick={darLike}>
              <i
                className={`fa-star fa-xl ${liked ? "fa-solid" : "fa-regular"}`}
              ></i>
            </button>
          </div>
          
          <div className='d-flex justify-content-between'>
            <Link to={`/pizza/${id}`}>
              <Button variant='outline-warning' >Ver más 
                <i
                  className="fa-eye fa-lg fa-solid ps-2"
                ></i> 
              </Button>
            </Link>
            <Button variant="warning" onClick={() => addToCart(pizza)}>Agregar
              <i
                className="fa-cart-shopping fa-lg fa-solid ps-1"
              ></i>
            </Button>
          </div>
       </Card.Body>
      </Card>
    </>
  );
}
 
export default CardPizza;