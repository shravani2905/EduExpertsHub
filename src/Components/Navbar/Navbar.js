import React, { useState } from "react";
import { Link} from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
 

  return (
    <div className="navbar">
      <img
        src="https://w7.pngwing.com/pngs/182/390/png-transparent-faculty-staff-icon-text-orange-logo.png"
        width="50px"
        alt=""
      />
      <h3 className="heading">Edu Experts Hub</h3>
      <ul className="List">
        <li>
          <Link to="/home">
            <button className="btn nav button">Home</button>
          </Link>
        </li>
        <li>
          <Link to="/explore">
            <button className="btn nav button">EXPLORE</button>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <button className="btn nav button">Sign up</button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button className="btn nav button">Login</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;