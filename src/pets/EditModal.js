import axios from "axios";
import { use } from "i18next";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import './style.css'

const EditModal = ({ id }) => {

  const [pet, setPet] = useState([])
  const [name, setName] = useState("");
  const [photoUrls, setPhoto] = useState("");

  const [imgData, setImgData] = useState(pet.photoUrls);
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
  useEffect(() => {
    if (id) {
      axios.get(`${API_ENDPOINT}/api/auth/getUser/` + user_id).then(response =>
        setUser(response.data)
      )
    }

  }, [])
  const updateImage = () => {
    // e.preventDefault();
     const formData = new FormData();
     formData.append('user_image', user_image);
     console.log(formData)
     axios.post(`${API_ENDPOINT}/api/updatePicture/${user_id}`, formData).then(res => {
      if(res.data.status== 201){

          new Swal("success", res.data.message, "success")
          window.location.reload()
      }
 
     })
   }
 
 
  //console.log("User", user)

  //const [user_image, setImage] = useState("");
  const history=useHistory();
  const updateUser = async() => {
    await axios.put(`${API_ENDPOINT}/api/updateUser/${user_id}`, {
      user_name: user_name ? user_name : user.user_name,
      email: email ? email  : user.email,
      user_tel: user_tel ? user_tel : user.user_tel,
      password: password ? password : user.password,
      user_nid: user_nid ? user_nid: user.user_nid,
      user_pre_address: user_pre_address ? user_pre_address : user.user_pre_address,
      user_per_address: user_per_address ? user_per_address : user.user_per_address,


    }).then(response => {
      console.log(response.data)
      if (response.data.status == 200) {
        new Swal("Success", "User Updated successfully");
        window.location.reload()
        console.log(response.data)
      }
    }
    )
  }

const handleUpdate = () => {
  
  if (user_name || email || password || user_nid || user_per_address
    || user_pre_address || user_tel)
    updateUser() ;

} 
const functions = (e)=>{
  e.preventDefault()
  handleUpdate();
  updateImage();
  new Swal("Success", "User Updated successfully");
 

}
  return (

    <Card>
      <CardBody>

        <Form>
          <Row>
            <Col>

              <Label for="user_name">User Name</Label>
              <Input type="text"  id="user_name" defaultValue={user?.user_name} onChange={(e) => setName(e.target.value)}> </Input><br />

            </Col>
            <Col>

              <Label for="email">User Email</Label>
              <Input type="email"  id="email" defaultValue={user?.email} onChange={(e) => setEmail(e.target.value)}>  </Input><br />

            </Col>

          </Row>
          <Row>
            <Col>

              <Label for="user_tel">Phone Number</Label>
              <Input type="text" id="user_tel" defaultValue={user?.user_tel} onChange={(e) => setTelephone(e.target.value)} > </Input><br />

            </Col>
            <Col>

              <Label for="user_nid">User NID</Label>
              <Input type="text" id="user_nid" defaultValue={user?.user_nid} onChange={(e) => setNid(e.target.value)}>  </Input><br />

            </Col>

          </Row>
          <Row>
          <Col>
        
        <Label for="user_pre_address"> Present Address</Label>
        <Input type="text" id="user_pre_address" defaultValue={user?.user_pre_address} onChange={(e) => setPresentAdress(e.target.value)}> </Input><br/>
        
        </Col>
        <Col>
        
        <Label for="user_per_address">User Permenant Address</Label>
        <Input type="text"id="user_per_address" defaultValue={user?.user_per_address} onChange={(e) => setPermenantAdress(e.target.value)}>  </Input><br/>
        
        </Col>

          </Row>
          <Row>
          <Col>
        
        <Label for="password">User Password</Label>
        <Input type="text"  id="password" defaultValue={user?.password} onChange={(e) => setPassword(e.target.value)}>  </Input><br/>
        
        </Col>

          </Row>
          <div className='d-flex'>
          <div className='d-flex align-items-end mt-75 ms-1'>
            <div>
              <div className="previewProfilePic">
                <img className="owner-picture" style={{ width: 150, height: 150 }} src={imgData} />
              </div>
              <br />
              <input id="user_image"  type="file" onChange={onChangePicture} />

              <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
          </div>
        </div>
        <br />

       
          <Button color='primary' onClick={functions}className='me-1'>
            Edit
          </Button>
          

        </Form>

      </CardBody>

    </Card>
  );

}
export default EditModal;