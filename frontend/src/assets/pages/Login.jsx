import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/UserContext.jsx';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [errorVacio, setErrorVacio] = useState(null)
  const [errorPassworMoreSix, setPassworMoreSix] = useState(null)
  const {isLogged, login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!email.trim() || !password.trim() )   {
      setErrorVacio(true)
      return
    } else if ( password.trim().length < 6 ) {
      setPassworMoreSix(true)
      return
    } else if (!errorVacio && !errorPassworMoreSix) {
      const success = await login(email, password);
      console.log('logueado', success);
      setErrorVacio(false);
      setPassworMoreSix(false);
      setEmail('');
      setPassword('');
    }
  }

  if (isLogged) {
    <Navigate to="/tienda" />;
  }

  return ( 
    <>
      <div className="container-fluid bg-light-funko py-5">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12 col-md-4">
              <h2 className="h2-home">Login</h2>
            </div>
            <div className="col-12 col-md-5">
              <p className="mb-4">Debes logearte para poder ver toda nuestra tienda y para poder comprar</p>
              
              { errorVacio && <p className="text-danger">Todos los campos son obligatorios</p> }
              { errorPassworMoreSix && <p className="text-danger">La contraseña debe tener al menos 6 caracteres</p> }
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="inputEmail">
                  <Form.Label>Correo (*)</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Ej: juan.perez@gmail.com" 
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />   
                </Form.Group>
                <Form.Group className="mb-3" controlId="inputPassword">
                  <Form.Label>Contraseña (*)</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="*********" 
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
                <Button type="submit" className="px-5 btn btn-primary mt-2">
                  Enviar <i className="fa-solid fa-paper-plane fa-lg ps-2"></i>
                </Button>
              </Form>
            </div>

          </div>
        </div>
      </div>
    </>
   );
}
 
export default Login;