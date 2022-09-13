import {Routes,Route, Navigate} from "react-router-dom";
import Inicio from "./../pages/Inicio"
import Firmas from "./../pages/Firmas"
import Logout from "./../components/Logout"
const Rutas = () => {
  return (
    <Routes>
            <Route path="/matamask-auth" element={<Inicio />}/>
            <Route path="/matamask-auth/logout" element={<Logout />}/>
            <Route path="/matamask-auth/firmas" element={<Firmas />}/>
    </Routes>
  )
}

export default Rutas