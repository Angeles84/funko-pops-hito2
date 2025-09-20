import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";


const CardPizza = ({name, price, ingredients, img, id}) => {

  const { addToCart } = useContext(CartContext)
  const pizza = { name, ingredients, price, img, id };

  return ( 
    <>
      <Card className='mb-5 card-funko shadow'>
        <Card.Img variant="top" src={img} />
        <Card.Body className='card-funko-body'>
          <Card.Title className='text-center pt-2 pb-3 card-funko-title'>{name} ${price.toLocaleString('es-CL')}</Card.Title>
          <div className='d-flex justify-content-between'>
            <Link to={`/pizza/${id}`}><Button variant='outline-warning' >Ver más 👀</Button></Link>
            <Button variant="warning" onClick={() => addToCart(pizza)}>Agregar 🛒</Button>
          </div>
       </Card.Body>
      </Card>
    </>
  );
}
 
export default CardPizza;