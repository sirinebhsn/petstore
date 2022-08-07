import { useState } from "react";
import { Button, Col, Form, FormLabel, Row } from "react-bootstrap";
import Swal from 'sweetalert2'



export default function Add() {
    const url = "https://petstore.swagger.io/v2/pet";
    const [imgData, setImgData] = useState('https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg');
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')

    /*const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setImage(e.target.files[0]);

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }

    };*/
    const addPet = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('status', status);

        let result = await fetch(`https://petstore.swagger.io/v2/pet`, {

            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify
                ({


                    name: name,
                    status: status,
                }
                ),
               

        });

        const data = await result.json();
        console.log(data)
        if (result.ok) {
            new Swal("Success", "Pet added Successfully", "success");
            window.location.reload()


            window.location.reload()
        }

    }
    return (

        <Form>
            <Row>
                <Col>

                    <FormLabel>Pet Name</FormLabel>
                    <input className="form-control" type="text" id="name" onChange={(e) => setName(e.target.value)} /> <br />

                </Col>
                <Col>

                    <FormLabel>Status</FormLabel>
                    <select id="status" className="form-select form-select-md" aria-label=".form-select-sm example" 
                    onChange={(e)=>setStatus(e.target.value)}>
                        <option >Select Status</option>
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="Sold">Sold</option>

                    </select><br />

                </Col>
            </Row>
            <Row>
                <Col>

                    <FormLabel>Category</FormLabel>
                    <select className="form-select form-select-md" aria-label=".form-select-sm example">
                        <option>Select Category</option>
                        <option value="Dogs">Dogs</option>
                        <option value="Cats">Cats</option>
                        <option value="Fishs">Fishs</option>
                        <option value="Birds">Birds</option>
                    </select><br />
                </Col>
                <Col>

                    <FormLabel>Tags</FormLabel>
                    <input className="form-control" type="text" id="tags" /> <br />

                </Col>
            </Row>
            <br />
            <div className='d-flex'>
                <div className='d-flex align-items-end mt-75 ms-1'>
                    <div>
                        <div className="previewProfilePic">
                            <img  style={{ width: 150, height: 150 }} src={imgData} />
                        </div>
                        <br />
                        <input id="photoUrls" type="file" />

                       
                    </div>
                </div>
            </div>
            <br />


            <Button color='primary' className='me-1' onClick={addPet}>
                Add Pet
            </Button>


        </Form>


    )
}