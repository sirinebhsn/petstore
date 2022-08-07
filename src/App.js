import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./auth/Auth"
import Pets from "./pets/PetsList"
import Pending from './pets/Pending';
import Sold from './pets/Sold';


function App() {

  return (
    
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/sold" element={<Sold/>} />


          </Routes>
        </BrowserRouter>
   

  )
}

export default App