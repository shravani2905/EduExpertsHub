import "./Userdashboard.css";
import { useLocation } from "react-router-dom";
function Userdashboard() {
  let { state } = useLocation();

  return (
    <div className="propertiesdata">
      <h2 className="user">Welcome, {state.username}</h2>
      
    </div>
  );
}

export default Userdashboard;