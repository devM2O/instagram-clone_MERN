import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css'

export default function Signup() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const history = useHistory()

  const postData = () =>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      return M.toast({html: "Invalid Email", classes: "#ff5252 red accent-2"})
    }
    fetch("/signup", {
      method: "post",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error, classes: "#ff5252 red accent-2"})
      }else{
        M.toast({html: data.message, classes: "#388e3c green darken-2"})
        history.push('/signin')
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="username" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <input type="text" placeholder="email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="text" placeholder="password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={()=>postData()}
        >
          SignUP
        </button>
        <h5>
          <Link to="/signup">Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
}
