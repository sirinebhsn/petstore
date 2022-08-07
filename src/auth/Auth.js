import axios from "axios";
import React, { useState } from "react"
import  { useNavigate } from "react-router-dom";

export default function Auth(props) {
    //const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate()
    const login = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        axios.get(`https://petstore.swagger.io/v2/user/login`, formData).then(response => {

            if (response.data.code == 200) {
            
               navigate('/pets')
            }
        })
    }
    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: '#D6EAEA' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: 1 + 'rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="https://www.pngitem.com/pimgs/m/48-489202_we-care-for-many-kinds-of-animals-dog.png"
                                            alt="login form" class="img-fluid" style={{ height: 530 }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <form>

                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <img src="https://www.kindpng.com/picc/m/62-624815_transparent-pet-shop-png-pets-shop-logo-png.png" className="fas fa-cubes fa-2x me-3" style={{width:50, height:50}}/>
                                                    <span className="h1 fw-bold mb-0">Login</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 + 'px' }}>Sign into your account</h5>


                                                <div className="form-outline mb-4">
                                                    <label className="form-label" for="username">Username</label>

                                                    <input type="text" id="username" className="form-control form-control-lg"
                                                        onChange={(e) => setUsername(e.target.value)} />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" for="password">Password</label>

                                                    <input type="password" id="password"
                                                        onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" type="button" onClick={login}>Login</button>
                                                </div>

                                                <a className="small text-muted" href="#!">Forgot password?</a>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}