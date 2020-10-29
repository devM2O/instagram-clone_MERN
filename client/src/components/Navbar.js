import React from "react";
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper white" style={{color: "black"}}>
        <Link to="/" className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">SingUp</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
