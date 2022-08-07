import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import axios from "axios";

const EditModal = ({ petId }) => {

  const [pet, setPet] = useState([])
  const [name, setName] = useState("");
  const [photoUrls, setPhoto] = useState("");

  const [imgData, setImgData] = useState(pet.photoUrls);
  useEffect(() => {
    getData()
   
       },[])
  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPhoto(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const updatePet = async() => {
    const response = await fetch(
      `https://petstore.swagger.io/v2/pet/${petId}`,
      {
          method: "PUT",
          mode: "cors",
          headers: {
              "Content-Type": "application/json",
          },
           body: JSON.stringify
          ({
            name: name ? name : pet.name,

          
        })
      
    })
    const data = await response.json();
    console.log(data)

  
  }

const handleUpdate = () => {
  
  if (name)
    updatePet() ;

} 

    async function getData(){
      if (petId) {
        const result = await fetch(
          `https://petstore.swagger.io/v2/pet/${petId}`,
          {
              method: "GET",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json",
              },
          }
          
      );
      const data = await result.json();
          setPet(data)
        }
    }

  console.log("Pet", pet)

 


  return (

        <Form>
        

              <label for="name">Pet Name</label>
              <input type="text"  className="form-control" id="name" defaultValue={pet?.name} onChange={(e) => setName(e.target.value)}/><br />
              <label for="tags">Tags</label>
              <input type="text" className="form-control" id="name" defaultValue={pet?.tags?.name} onChange={(e) => setName(e.target.value)}/><br />
              <label for="catgory">Category</label>
              <input type="text" className="form-control" id="name" defaultValue={pet?.category?.name} onChange={(e) => setName(e.target.value)}/><br />
              <label for="catgory">Status</label>
              <select id="status" className="form-select form-select-md" aria-label=".form-select-sm example" >
                        <option value={pet?.status} >{pet.status}</option>
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>

                    </select><br />

       
          <Button color='primary' className='me-1'onClick={handleUpdate}>
            Edit
          </Button>
          

        </Form>

  );

}
export default EditModal;