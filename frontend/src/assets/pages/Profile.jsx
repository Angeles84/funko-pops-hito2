import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/UserContext';
import { CartContext } from "../context/CartContext";
import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import CardPizza from "../components/CardPizza";

const Profile = () => {
  const { user, getUser, isLogged,logout } = useContext(UserContext);
  const { purchases } = useContext(CartContext);

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [urlFoto, setUrlFoto] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPasword] = useState('');

  const [funkosFavoritos, setFunkosFavoritos] = useState([])

  const url = 'http://localhost:5000/api/pizzas';

  const getData = async () => {   
    const response = await fetch(url);
    const data = await response.json();
    const favoritos = data.filter(item => item.favorito === true);
    setFunkosFavoritos(favoritos);
  }

  useEffect(() => {
    getData()
    if (isLogged) {  
      getUser()
    }
  }, [isLogged,getUser]);

  return ( 
    <>
      {isLogged ? (
        <Container className="py-5 my-5">
        <h2 className="h2-home mt-4 mb-5">Mi Perfil</h2>
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
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3 mt-5"
          >
            <Tab eventKey="home" title="Editar perfil">
              <Form>
                <div className="row">
                  <div className="col-12 col-md-6 pe-lg-5">
                    <Form.Group className="mb-3" controlId="inputNombre">
                      <Form.Label>Nombre (*)</Form.Label>
                      <Form.Control 
                        type="nombre" 
                        placeholder="Ej: Juan" 
                        name="nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                      /> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="inputApellido">
                      <Form.Label>Apellido (*)</Form.Label>
                      <Form.Control 
                        type="apellido" 
                        placeholder="Ej: Pérez" 
                        name="apellido"
                        onChange={(e) => setApellido(e.target.value)}
                        value={apellido}
                      /> 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="inputURL">
                      <Form.Label>URL de la foto de perfil</Form.Label>
                      <Form.Control 
                        type="urlfoto" 
                        placeholder="Ej: https://firebasestorage.googleapis.com/v0/b/angie-s-store-d8fd0.appspot.com/o/wolverine-2.jpg" 
                        name="urlfoto"
                        onChange={(e) => setUrlFoto(e.target.value)}
                        value={urlFoto}
                      /> 
                    </Form.Group>
                  </div>
                 
                  <div className="col-12 col-md-6 ps-lg-5">
                    <Form.Group className="mb-3" controlId="inputPassword">
                      <Form.Label>Contraseña (*)</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder="******" 
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="inputRepeatPassword">
                      <Form.Label>Confirmar contraseña (*)</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder="******" 
                        name="password"
                        onChange={(e) => setRepeatPasword(e.target.value)}
                        value={repeatPassword}
                      />
                    </Form.Group>
                    <p className='pt-3'><b>Requisitos para la contraseña:</b>  debe tener 6 caracteres</p>
                  </div>
                </div>
                <Button type="submit" className="px-5 btn btn-primary mt-2">
                  Guardar cambios <i className="fa-solid fa-floppy-disk fa-lg ps-2"></i>
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="profile" title="Mis compras">
              {purchases.length === 0 ? (
                <p>Aún no has realizado ninguna compra 🛒</p>
                ) : (
                  <div className="row pt-2">
                    {purchases.map((item, index) => (
                      <div className="col-12 col-md-6 col-lg-4 px-lg-5" key={index}>
                        <CardPizza
                          img={item.img}
                          name={item.name}
                          price={item.price}
                          desc={item.desc}
                          id={item.id}
                        />
                      </div>
                    ))}
                  </div>
                )}
            </Tab>
            <Tab eventKey="contact" title="Mis favoritos">
              {funkosFavoritos.length === 0 ? (
                <p className="pt-2">Todavía no tienes favoritos ⭐</p>
              ) : (
                <div className="row pt-2">
                  {funkosFavoritos.map(funko => (
                    <div className="col-12 col-md-6 col-lg-4 px-lg-5" key={funko.id}>
                      <CardPizza 
                        img={funko.img}
                        name={funko.name}
                        price={funko.price}
                        desc={funko.desc}
                        id={funko.id}
                      />
                    </div>
                  ))}
                </div>
              )}
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