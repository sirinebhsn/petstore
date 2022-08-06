import { Fragment, useState } from "react";
import { Modal } from "react-bootstrap";
import Add from "./pets/AddPet";

export default function Navbar(){
    const [show, setShow] = useState(false);
    function handleShow() {
      setShow(true)
    }
    function handleClose() {
      setShow(false)
    }
    return(
        <Fragment>
        <div className="grid-container">
        <header className="row">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a class="navbar-brand" href="#">
                <img src="https://www.kindpng.com/picc/m/62-624815_transparent-pet-shop-png-pets-shop-logo-png.png" alt="" width="60" height="45" class="d-inline-block align-text-top"/>
                  Pet Store
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <span onClick={handleShow} style={{cursor: 'pointer' }}>
                    <p className="nav-link active" aria-current="page" >Add New Pet</p>
                    </span>
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
        </div>
           <Modal show={show} >
           <Modal.Header closeButton onClick={handleClose}>
             <Modal.Title>Add New Pet</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Add />
           </Modal.Body>
         </Modal>
         </Fragment>
    )
}