import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";

export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory()
  const renderList = () => {
    if (state) {
      return [
        <li key={0}>
          <Link to="/profile" >Profile</Link>
        </li>,
        <li  key={1}>
          <Link to="/create">Create Post</Link>
        </li>,
        <li  key={2}>
          <button
            className="btn waves-effect waves-light #c62828 red darken-2"
            onClick={() => {
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key={3}>
          <Link to="/signin">Login</Link>
        </li>,
        <li key={4}>
          <Link to="/signup">SingUp</Link>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper white" style={{ color: "black" }}>
        <Link to={state ? "/" : "/signin"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
}
