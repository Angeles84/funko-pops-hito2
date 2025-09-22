import CardHome from "../components/CardHome";
import Header from "../components/Header";
import './pages.css'
//import pizzas from '../components/pizzas.js'

import { useState, useEffect} from 'react'

const Home = () => {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    getData()
  }, []);

  const url = 'http://localhost:5000/api/pizzas';

  const getData = async () => {   
    const response = await fetch(url);
    const data = await response.json();
    setPizzas(data.slice(0, 6));
  }

  return ( 
    <>
      <Header/>
      <div className="container">
        <div className="row pt-5 align-items-center">
          <div className="col-12 col-lg-6 pe-md-5">
            <h2 className="mb-4 h2-home">¿Cómo empezar a coleccionarlos?</h2>
            <p>Comenzar tu colección de Funko Pops es una aventura emocionante para cualquier fanático de películas, series, videojuegos o cómics. Lo primero es elegir los personajes que más te apasionen y que representen tus gustos. Luego, busca las figuras disponibles en tiendas confiables o en ediciones especiales que hagan tu colección única.</p>
            <p className="mb-0">A medida que agregues nuevos Pops, podrás organizar tu colección por temáticas, series o favoritos, y descubrir la diversión de completar sets y encontrar rarezas. Con paciencia y entusiasmo, tu colección se convertirá en un reflejo de tu personalidad y en una galería que podrás disfrutar y compartir con otros fans.</p>
          </div>
          <div className="col-12 col-lg-6 pt-3 pt-lg-0">
            <iframe className="b-radius" width="100%" height="315" src="https://www.youtube.com/embed/iL1uCWw3ayw?si=FKKCEk-fyB8Pfbd0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-light-funko pt-5 pb-2 my-5">
        <div className="container">
          <h2 className="ms-lg-4 h2-home">Algunos de nuestros productos</h2>
          <p className="ms-lg-4 mb-4">Debes logearte para poder comprar</p>
          <div className="row">
            {
              pizzas.map(pizza => (
                <div className="col-12 col-md-6 col-lg-4 px-lg-5" key={pizza.name}>
                  <CardHome 
                    img={pizza.img}
                    name={pizza.name}
                    price={pizza.price}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row pb-5 align-items-center">
          <div className="col-12 col-lg-6">
            <iframe className="b-radius" width="100%" height="315" src="https://www.youtube.com/embed/-vMVWxGN9ws?si=Y_D9yBMoWo9DtKGu" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className="col-12 col-lg-6 ps-lg-5 pt-4 py-md-4">
            <h2 className="h2-home">¿Cual es la cultura Funko Pop?</h2>
            <p>La cultura Funko Pop gira en torno a la pasión por coleccionar figuras que representan películas, series, videojuegos, cómics y todo tipo de íconos de la cultura pop. No se trata solo de tener las figuras, sino de compartir intereses, descubrir ediciones limitadas, rarezas y exclusivas, y conectarse con otros fans que valoran los mismos personajes. Es un fenómeno social y de entretenimiento donde cada Pop refleja gustos personales, recuerdos y aficiones, convirtiéndose en una forma de expresión, nostalgia y comunidad dentro del coleccionismo.</p>      
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Home;