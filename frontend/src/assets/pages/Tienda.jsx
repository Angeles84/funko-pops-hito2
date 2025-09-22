import CardPizza from "../components/CardPizza";
import HeaderTienda from "../components/HeaderTienda";
import './pages.css'
//import pizzas from '../components/pizzas.js'
import Form from 'react-bootstrap/Form';

import { useState, useEffect} from 'react'

const Tienda = () => {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    getData()
  }, []);

  const url = 'http://localhost:5000/api/pizzas';

  const getData = async () => {   
    const response = await fetch(url);
    const data = await response.json();
    setPizzas(data)
  }

  return ( 
    <>
      <HeaderTienda/>

      <div className="container-fluid pb-5 mt-4">
        <div className="container">
          
          <div className="row pb-4">
            <h5 className="ps-xl-5 pb-1 pt-2">Filtros</h5>
            <div className="col-12 col-md-6 col-lg-3 ps-xl-5">
              <Form.Select aria-label="Selecciona una categoría">
                <option>Categorías</option>
                <option value="1">Anime</option>
                <option value="2">DC Comics</option>
                <option value="3">Disney</option>
                <option value="4">Marvel</option>
              </Form.Select>
            </div>
            <div className="col-12 col-md-6 col-lg-3 ps-xl-5">
              <Form.Select aria-label="Selecciona una categoría">
                <option>Ordenar por</option>
                <option value="1">Precio de menor a mayor</option>
                <option value="2">Precio de mayor a menor</option>
              </Form.Select>
            </div>
          </div>
          <div className="row">
            {
              pizzas.map(pizza => (
                <div className="col-12 col-md-6 col-lg-4 px-xl-5" key={pizza.name}>
                  <CardPizza 
                    img={pizza.img}
                    name={pizza.name}
                    price={pizza.price}
                    desc={pizza.desc}
                    id={pizza.id}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Tienda;