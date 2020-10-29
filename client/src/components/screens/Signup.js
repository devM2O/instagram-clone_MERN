import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
          SignUP
        </button>
        <h5>
          <Link to="/signup">Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
}
