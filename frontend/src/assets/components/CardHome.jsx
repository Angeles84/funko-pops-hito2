import Card from 'react-bootstrap/Card'

const CardHome = ({name, price, img, }) => {


  return ( 
    <>
      <Card className='mb-5 card-funko'>
        <Card.Img variant="top" src={img} />
        <Card.Body className='card-funko-body'>
          <div className='d-flex justify-content-between px-3'>
            <Card.Title className='text-center py-3 card-funko-title mb-0'>{name}</Card.Title>
            <Card.Title className='text-center py-3 card-funko-title mb-0'>${price.toLocaleString('es-CL')}</Card.Title>
          </div>
       </Card.Body>
      </Card>
    </>
  );
}
 
export default CardHome;