import { Navigate } from "react-router-dom"
const Logout = () => {
    localStorage.removeItem("sign")
    return (
        <Navigate to="/" replace={true} />
    );
  }
  
  export default Logout