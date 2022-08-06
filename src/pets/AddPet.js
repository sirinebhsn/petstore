import { useState } from "react";
import { Button, Card, Col, Form, FormLabel, Row } from "react-bootstrap";
import Swal from 'sweetalert2'
import axios from "axios";


export default function Add(){
    const [imgData, setImgData] = useState('https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg');
    const [name, setName]= useState('')
    const [status, setStatus]= useState('')
    const onChangePicture = e => {
        if (e.target.files[0]) {
          console.log("picture: ", e.target.files);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setImgData(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
     
      };
      const addPet = async() => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('status', status);
        let result= await fetch("https://petstore.swagger.io/v2/pet",{
       
                method: 'post',
                body: formData
                });
    
   
      }
    return(
  
          <Form>
            <Row>
              <Col>
  
                <FormLabel for="name">Pet Name</FormLabel>
                <input type="text"  id="name"  onChange={(e) => setName(e.target.value)}/> <br />
  
              </Col>
              <Col>
  
                <FormLabel for="status">Status</FormLabel>
                <input type="text"  id="status"  onChange={(e) => setStatus(e.target.value)}/>  <br />
  
              </Col>


  
            </Row>
          
      
  
        <br/>
            <div className='d-flex'>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
                <div className="previewProfilePic">
                  <img className="owner-picture" style={{ width: 150, height: 150 }} src={imgData}/>
                </div>
                <br />
                <input id="user_image"  type="file" onChange={onChangePicture}/>
  
                <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
              </div>
            </div>
          </div>
          <br />
  
         
            <Button color='primary'className='me-1' onClick={addPet}>
             Add Pet
            </Button>
            
  
          </Form>
  
    
    )
}