import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState, useEffect} from 'react'
import './pages.css' 
import Modal from 'react-bootstrap/Modal';

const Admin = () => {
  
  const [nombreFunko, setNombreFunko] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imgFunko1, setImgFunko1] = useState('')
  const [imgFunko2, setImgFunko2] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState(0);
  const [errorVacio, setErrorVacio] = useState(null)
  const [funkos, setFunkos] = useState([])

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
  const funkoToEdit = funkos.find(funko => funko.id === id);
  if (funkoToEdit) {
    setNombreFunko(funkoToEdit.name);  // ojo: en la API se llama "name", no "nombre"
    setDescripcion(funkoToEdit.desc);
    setImgFunko1(funkoToEdit.img);
    setImgFunko2(funkoToEdit.img2);
    setCategoria(funkoToEdit.categoria);
    setPrecio(funkoToEdit.price);
    setEditingId(id); // 👈 marca que estamos editando este funko
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  if(!nombreFunko.trim() || !descripcion.trim() || !imgFunko1.trim() || !imgFunko2.trim() || !categoria.trim() || !precio) {
    setErrorVacio(true);
    return;
  }

  const funkoData = {
    id: editingId,  // si es edición ya viene con id
    name: nombreFunko,
    desc: descripcion,
    img: imgFunko1,
    img2: imgFunko2,
    categoria,
    price: Number(precio),
  };

  try {
    if (editingId) {
      // EDITAR (PUT)
      await fetch(`${url}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(funkoData),
      });
    } else {
      // AGREGAR (POST)
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(funkoData),
      });
    }

    // refresca la lista
    getData();

    // limpia el formulario
    setNombreFunko('');
    setDescripcion('');
    setImgFunko1('');
    setImgFunko2('');
    setCategoria('');
    setPrecio(0);
    setEditingId(null); // 👈 vuelve al modo agregar
    setErrorVacio(false);
  } catch (error) {
    console.error("Error al guardar funko:", error);
  }
};
  
  useEffect(() => {
    getData()
  }, []);

  const url = 'http://localhost:5000/api/pizzas';

  const getData = async () => {   
    const response = await fetch(url);
    const data = await response.json();
    setFunkos(data)
  }

  return ( 
    <>
      <div className="container-fluid bg-light-funko py-5">
        <div className="container mt-5 pt-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <h2 className="h2-home mb-4">Administración de Funkos</h2>
                { errorVacio && <p className="text-danger">Todos los campos son obligatorios</p> }
              <div className="col-12 col-md-5 pe-lg-5">
                <Form.Group className="mb-3" controlId="inputNombreFunko">
                  <Form.Label>Nombre del Funko (*)</Form.Label>
                  <Form.Control 
                    type="nombrefunko" 
                    placeholder="Ej: Juan" 
                    name="nombreFunko"
                    onChange={(e) => setNombreFunko(e.target.value)}
                    value={nombreFunko}
                  /> 
                </Form.Group>
                <Form.Group className="mb-3" controlId="inputPrecio">
                  <Form.Label>Precio (*)</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="12990" 
                    name="precio"
                    onChange={(e) => setPrecio(e.target.value)}
                    value={precio}
                  /> 
                </Form.Group>
                <Form.Group className="mb-3" controlId="inputCategoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control 
                    type="categoria" 
                    placeholder="Ej: Anime" 
                    name="categoria"
                    onChange={(e) => setCategoria(e.target.value)}
                    value={categoria}
                  /> 
                </Form.Group>
              </div>
              
              <div className="col-12 col-md-7 ps-lg-5">
                <Form.Group className="mb-3" controlId="inputImgFunko1">
                  <Form.Label>URL imagen 1 (*)</Form.Label>
                  <Form.Control 
                    type="imgFunko1" 
                    placeholder="Ej: https://firebasestorage.googleapis.com/v0/b/angie-s-store-d8fd0.appspot.com/o/wolverine-1.jpg" 
                    name="imgFunko1"
                    onChange={(e) => setImgFunko1(e.target.value)}
                    value={imgFunko1}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="inputImgFunko2">
                  <Form.Label>URL imagen 2 (*)</Form.Label>
                  <Form.Control 
                    type="imgFunko2" 
                    placeholder="Ej: https://firebasestorage.googleapis.com/v0/b/angie-s-store-d8fd0.appspot.com/o/wolverine-2.jpg" 
                    name="imgFunko2"
                    onChange={(e) => setImgFunko2(e.target.value)}
                    value={imgFunko2}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="inputDescripcion">
                  <Form.Label>Descripción del Funko (*)</Form.Label>
                  <Form.Control 
                    type="descripcion" 
                    placeholder="Ej: Ariel, la Sirenita, es una princesa de Disney y la hija menor del rey Tritón, gobernante de los mares. Curiosa y soñadora, anhela conocer el mundo humano y no teme romper las reglas para seguir su corazón...." 
                    name="descripcion"
                    onChange={(e) => setDescripcion(e.target.value)}
                    value={descripcion}
                    as="textarea" rows={3}
                  />
                </Form.Group>
                <Button type="submit" className="px-5 btn btn-primary mt-2">
                  {editingId ? "Actualizar Funko" : "Agregar Funko"} <i className="fa-solid fa-floppy-disk fa-lg ps-2"></i>
                </Button>
              </div>
            </div>         
          </Form>

          <h3 className='mt-5 mb-4'>Tabla de Funkos</h3>
          <div className='contenedor-tabla-responsive'>
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Imagen 1</th>
                  <th>Imagen 2</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                funkos.map(funkos => (
                  <tr key={funkos.name}>
                    <td>{funkos.name}</td>
                    <td>{funkos.categoria}</td>
                    <td>{funkos.price}</td>
                    <td><img src={funkos.img} alt="" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                    <td><img src={funkos.img2} alt="" style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                    <td>{funkos.desc}</td>
                    <td className='d-flex align-items-center flex-row'>
                      <Button variant="warning" onClick={() => handleEdit(funkos.id)}><i className="fa-solid fa-pencil fa-lg"></i></Button>
                      <Button variant="danger" data-bs-toggle="modal" data-bs-target="#exampleModal" className='ms-2'><i className="fa-solid fa-trash fa-lg"></i></Button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
          </div>

          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">¿Estás seguro de eliminar el Funko?</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal">Cancelar</button>
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
                </div>
              </div>
            </div>
</div>
        </div>
      </div>
    </>
   );
}
 
export default Admin;