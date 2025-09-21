const Footer = () => {
  return ( 
    <>
      <div className="bg-morado py-4">
        <div className="container text-white">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 col-lg-4 pb-4 pb-lg-0">
              <h1 className="logo-luckiest-b mb-0">Funko<span>M</span>anía</h1>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ps-4 border-start border-end">
              <h5 className="mb-3">Servicio al cliente</h5>
              <p className="mb-1">Horario de atención:</p>
              <p className="mb-0">Lunes a Viernes de 09:00 a 18:00 hrs</p>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ps-4 pt-4 pt-md-0">
              <h5 className="mb-3">Contáctanos</h5>
              <p className="mb-1">super.ayuda@funkmania.cl</p>
              <p className="mb-0">+56 9 5 666 7777</p>
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default Footer;