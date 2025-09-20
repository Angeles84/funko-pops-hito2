import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/UserContext.jsx';
import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPasword] = useState('');
  const [errorVacio, setErrorVacio] = useState(null)
  const [errorPasswordNotMacth, setPasswordNotMacth] = useState(null)
  const [errorPassworMoreSix, setPassworMoreSix] = useState(null)
  const {register, isLogged} = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!email.trim() || !password.trim() || !repeatPassword.trim() )   {
      setErrorVacio(true)
      return
    } else if (password.trim() != repeatPassword.trim() ){
      setPasswordNotMacth(true)
      return
    } else if ( password.trim().length < 6 ) {
      setPassworMoreSix(true)
      return
    } else if (!errorVacio && !errorPasswordNotMacth && !errorPassworMoreSix){
      const success = await register(email, password, repeatPassword);
        console.log('succes registre', success);
        setErrorVacio(false);
        setPasswordNotMacth(false);
        setPassworMoreSix(false);
        setEmail('');
        setPassword('');
        setRepeatPasword('');
    }
  }

  if (isLogged) {
    <Navigate to="/profile" />;
  }

  return ( 
    <>
      <div className="container-fluid bg-light-funko py-5">
        <div className="container mt-5 py-5">
          <div className='row'>
            <div className="col-12 col-md-4">
              <h2 className="h2-home">Registro</h2>
            </div>
            <div className='col-12 col-md-5'>
              <p className="mb-4">Debes registrarte para poder ver toda nuestra tienda y para poder comprar</p>

              { errorVacio && <p className="text-danger">Todos los campos son obligatorios</p> }
              { errorPasswordNotMacth && <p className="text-danger">La contraseñas deben ser iguales</p> }
              { errorPassworMoreSix && <p className="text-danger">La contraseña debe tener al menos 6 caracteres</p> }
              { errorVacio === false && errorPasswordNotMacth === false && errorPassworMoreSix === false ? <p className="text-success">Los datos han sido enviados correctamente!</p> : null }
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="inputEmail">
                  <Form.Label>Correo (*)</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />   
                </Form.Group>
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
                <Button type="submit" className="px-5 btn btn-primary mt-2">Enviar 🚀</Button>
              </Form>
            </div>

          </div>
        </div>
      </div>
    </>
   );
}
 
export default Register;