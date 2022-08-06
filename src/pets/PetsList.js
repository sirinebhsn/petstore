import React, { useState, useEffect } from 'react';
import { Edit3, Trash2 } from 'react-feather';
import Swal from 'sweetalert2'

export default function Pets(props) {

    const url = "https://petstore.swagger.io/v2/pet";
    const [pets, setPets] = useState([]);
    const [errorState, setError] = useState();
    const [loading, setLoading] = useState(true);
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
    const deletePet = async (petId) => {
        try {
            const result = await fetch(
                `https://petstore.swagger.io/v2/pet/${petId}`,
                {
                    method: "DELETE",
                }
            );
            const data = await result.json();
            if (data.code === 200) {
                alert("deleted");
                fetchPetsByStatus();
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    useEffect(() => {
        fetchPetsByStatus();
    }, []);
    return (
        <div className="row">

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
                            src={pet.photoUrls}
                            className="card-img-top"
                            alt="..."
                            style={{ width: 260, height: 170 }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{pet.name}</h5>
                            <p className="card-text"> <span className="badge bg-light text-dark">{pet.status}</span></p>
                            <p> Catgory: {pet?.category?.name}</p>

                            <p> <span className='badge  bg-info text-dark'>#{pet?.tags[0]?.name}</span></p>
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
                                <Trash2 color='red' />
                            </span>
                            <span>
                                <Edit3 size={20} color="green" />
                            </span>
                        </div>
                    </div>
                ))}
        </div>
    );
};
