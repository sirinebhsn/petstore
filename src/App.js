import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Auth from "./auth/Auth"
import Pets from "./pets/PetsList"
import { Fragment, useState } from "react"
import { Modal } from "react-bootstrap"
import Add from './pets/AddPet';

function App() {
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow(true)
  }
  function handleClose() {
    setShow(false)
  }
  return (
    <Fragment>
    <div className="grid-container">
      <header className="row">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">PET STORE</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button className="nav-link active" aria-current="page" onClick={handleShow}>Add New Pet</button>
                </li>
              </ul>
              
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <br />
      
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/pets" element={<Pets />} />
        </Routes>
      </BrowserRouter>
    </div>
    <Modal show={show} >
  <Modal.Header closeButton onClick={handleClose}>
    <Modal.Title>Add New Pet</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Add/>
  </Modal.Body>
  </Modal>
    </Fragment>
  )
}

export default App