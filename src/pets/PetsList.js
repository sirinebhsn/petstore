import React, { useState, useEffect, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { Edit3, Trash2, Image } from 'react-feather';
import Swal from 'sweetalert2'
import Carou from '../Carousel';
import { Footer } from '../Footer';
import Navbar from '../Navbar';
import EditModal from './EditModal';
import Upload from './Upload';

export default function Pets(props) {

    const url = "https://petstore.swagger.io/v2/pet";
    const [pets, setPets] = useState([]);
    const [errorState, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedPet, setSelectedPet] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showUpload, setUpload] = useState(false);
    const handleClose = () => setShowModal(false);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    const fetchPetsByStatus = async (status) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${url}/findByStatus?status=${status || "available"}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            console.log(data)
            if (!response.ok) throw new Error(data.message);

            setPets(data);
        } catch (error) {
            setError(error.message);
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    };
    const getPet = async (petId) => {
        setSelectedPet(petId)
        setShowModal(true)

        const result = await fetch(
            `${url}/${petId}`,
            {
                method: "GET",
            }
        );
        console.log(petId)
        const data = await result.json();
    }
    const upload = async (petId) => {
        setSelectedPet(petId)
        setUpload(true)

        const result = await fetch(
            `${url}/${petId}`,
            {
                method: "GET",
            }
        );
        console.log(petId)
        const data = await result.json();
    }
    const deletePet = async (petId) => {
        try {
            const result = await fetch(
                `https://petstore.swagger.io/v2/pet/${petId}`,
                {
                    method: "DELETE",
                    mode: "cors"
                }
            );
            const data = await result.json();
            if (data.code === 200) {
                alert("deleted");
                window.location.reload()
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    useEffect(() => {
        fetchPetsByStatus();
    }, []);
    return (
        <Fragment>
            <Navbar />
            <Carou />

            <br />
            <br />
            <h4 className="text-center" >Available Pets List</h4>


            <div className="row" style={{justifyContent: 'center'}}>

                {loading && <h1>Loading</h1>}
                {errorState && errorState}
                {pets &&
                    pets.length > 0 &&
                    pets.map((pet, ind) => (


                        <div
                            key={ind}
                            className="card col-sm-3"
                            style={{ margin: 16, width: 18 + "rem" }}
                        >
                            <img
                                src={pet?.photoUrls}
                                className="card-img-top"
                                alt="..."
                                style={{ width: 260, height: 170 }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{pet.name}</h5>
                                <h5 className="card-title">{pet.id}</h5>

                                <p className="card-text"> <span className="badge bg-light text-dark">{pet.status}</span></p>
                                <p> Catgory: {pet?.category?.name}</p>

                                <p> <span className='badge  bg-info text-dark'>#{pet?.tags?.name}</span></p>

                                <span onClick={() => getPet(pet.id)}>
                                    <Edit3 size={20} color="#0681A2" />
                                </span>&nbsp;
                                <span onClick={() => upload(pet.id)}>
                                    <Image size={20} color="#06A2A2" />
                                </span>
                                <span onClick={() => {

                                    swalWithBootstrapButtons.fire({
                                        title: `Are you sure to delete ${pet.name}?`,
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonText: 'Yes, delete it!',
                                        cancelButtonText: 'No, cancel!',
                                        reverseButtons: true
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            swalWithBootstrapButtons.fire(

                                                `The Unit ${pet.name}`,
                                                'Is Deleted!',

                                            )
                                            deletePet(pet.id)

                                        }
                                        else if (

                                            /* Read more about handling dismissals below */
                                            result.dismiss === Swal.DismissReason.cancel
                                        ) {
                                            fetchPetsByStatus()
                                            swalWithBootstrapButtons.fire(
                                                'Cancelled',
                                                `The Pet ${pet.name} is safe :)`,
                                                'error'
                                            )
                                        }
                                    })
                                }}
                                >
                                    <Trash2 size={20} color='#A20617' />
                                </span>&nbsp;
                            </div>
                        </div>
                    ))}
            </div>
            <Footer />
            <Modal show={showModal} onHide={handleClose}>

                <Modal.Header closeButton >
                    <Modal.Title>Edit Pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditModal petId={selectedPet} />
                </Modal.Body>
            </Modal>
            <Modal show={showUpload} >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Upload petId={selectedPet} />
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};
