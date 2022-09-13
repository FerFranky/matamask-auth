import {Routes,Route, Navigate} from "react-router-dom";
import Inicio from "./../pages/Inicio"
import Firmas from "./../pages/Firmas"
import Logout from "./../components/Logout"
const Rutas = () => {
  return (
    <Routes>
            <Route path="/" element={<Inicio />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/firmas" element={<Firmas />}/>
    </Routes>
  )
}

export default Rutas