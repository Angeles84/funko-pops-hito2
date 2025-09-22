import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/UserContext';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';

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
        <Container className="py-5 my-5">
        <h2 className="h2-home mt-5 mb-4">Mi Perfil</h2>
        <div className="row">
          <div className="col-12 col-md-2">
            <img src="src/assets/img/foto-user.png" alt="" className="foto-user"/>
          </div>
          <div className="col-12 col-md-10 ps-lg-5 align-items-center">
            <h1>¡Hola Juan Pérez!</h1>
            <h6 className="mt-4">{user?.email}</h6>
  
            <Link to="/">
              <Button variant="btn btn-warning mt-md-4" onClick={() => logout()}>
                Logout <i className="fa-solid fa-arrow-right-from-bracket fa-lg ps-2"></i>
              </Button>
            </Link>
          </div>

          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3 mt-5"
          >
            <Tab eventKey="home" title="Editar perfil">
              Tab content for Home
            </Tab>
            <Tab eventKey="profile" title="Mis compras">
              Tab content for Profile
            </Tab>
            <Tab eventKey="contact" title="Mis favoritos">
              Tab content for Contact
            </Tab>
          </Tabs>
        
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