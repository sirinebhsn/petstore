import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./auth/Auth"
import Pets from "./pets/PetsList"


function App() {

  return (
      

        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/pets" element={<Pets />} />
          </Routes>
        </BrowserRouter>
   

  )
}

export default App