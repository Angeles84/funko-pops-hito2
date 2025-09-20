import { Container } from "react-bootstrap";
import fotoNotFound from '../img/foto-notfound.jpg'
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="pt-5 mt-5">
      <div className="row text-center">
        <div className="col-12 col-md-5 d-flex align-items-center">
        <span className="h5">Estás perdido? Vuelve al</span>
          <Link
            to="/"
            className="h5 text-success ms-1 ms-lg-2"
            >
              Inicio
          </Link>
        </div>
        <div className="col-12 col-md-7">
        <img src={fotoNotFound} alt="foto NotFound" className="px-md-5 img-fluid"/>
        </div>
      </div> 
    </Container>
  );
};
export default NotFound;