import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/UserContext';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import bienvenida from '../img/e005516c2c0253a091106d79a95f9cc5.gif'

const Profile = () => {
  const { user, getUser, isLogged,logout } = useContext(UserContext);

  useEffect(() => {
   
    if (isLogged) {  
      getUser()
    }
  }, [isLogged,getUser]);

  return ( 
    <>
      {isLogged ? (
        <Container className="pt-5 mt-5">
        <h1 className="mt-4">Profile</h1>
        <div className="row">
          <div className="col-12 col-md-6">
            <h6 className="mb-5 mt-4">¡Bienvenida {user?.email}!</h6>
            <Link to="/"><Button variant="btn btn-warning mt-md-4" onClick={() => logout()}>🚪Logout</Button></Link>
          </div>
          <div className="col-12 col-md-6">
            <img src={bienvenida} alt="" className="img-fluid"/>
          </div>
        </div>
        </Container> 
      ) : (
        <Container className="pt-5 mt-5">
          <h1 className="mt-4">Profile</h1>
          <p>Debes loguearte para ver tu perfil</p>
        </Container>
      )}
    </>
   );
}
 
export default Profile;