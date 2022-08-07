import { useState } from "react";
import { Button, Col, Form, FormLabel, Row } from "react-bootstrap";
import Swal from 'sweetalert2'



export default function Upload({ petId }) {
    const url = "https://petstore.swagger.io/v2/pet";
    const [imgData, setImgData] = useState('https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg');
    const [additionalMetadata, setMetadata] = useState('')
    const [file, setFile] = useState('')

    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setFile(e.target.files[0]);

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }

    };
    const addPet = async () => {
        const formData = new FormData();
        formData.append('additionalMetadata', additionalMetadata);
        formData.append('file', file);

        let result = await fetch(`https://petstore.swagger.io/v2/pet/${petId}/uploadImage`, {

            method: 'POST',
          
            body:formData
            


        });

        const data = await result.json();
        console.log(data)
        if (result.ok) {
            new Swal('Picture uploaded Successfully')
            window.location.reload()
        }

    }
    return (

        <Form >
            <Row>
                <Col>

                    <FormLabel>Additional Metadata</FormLabel>
                    <input className="form-control" type="text" id="additonalMetadata" onChange={(e) => setMetadata(e.target.value)} /> <br />

                </Col>

            </Row>

            <br />
            <div className='d-flex'>
                <div className='d-flex align-items-end mt-75 ms-1'>
                <div>
                        <div className="previewProfilePic">
                            <img style={{ width: 150, height: 150 }} src={imgData} />
                        </div>
                        <br />
                        <input type='file' className="form-control"
                            onChange={onChangePicture}
                            placeholder="file" /><br />
</div>
                </div>
            </div>
            <br />


            <Button color='primary' className='me-1' onClick={addPet}>
                Upload Picture
            </Button>


        </Form>


    )
}