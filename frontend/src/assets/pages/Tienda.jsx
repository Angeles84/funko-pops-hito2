import CardPizza from "../components/CardPizza";
import Header from "../components/Header";
import './pages.css'
//import pizzas from '../components/pizzas.js'

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
      <Header/>

      <div className="container-fluid py-5 my-5">
        <div className="container">
          <div className="row">
            {
              pizzas.map(pizza => (
                <div className="col-12 col-md-6 col-lg-4 px-lg-5" key={pizza.name}>
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