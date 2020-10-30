import React, {useState} from "react";
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const history = useHistory()

  const postDetails = () => {
//-----------------------use cloud API-------------------------------//
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "minn-maw-oo")
    fetch("https://api.cloudinary.com/v1_1/minn-maw-oo/image/upload", {
      method: "post",
      body: data
    })
    .then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err);
    })
//-----------------------send to backend-------------------------------//
    fetch("/createPost", {
      method: "post",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        title,
        body,
        pic: url
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.error){
        M.toast({html: data.error, classes: "#ff5252 red accent-2"})
      }else{
        M.toast({html: "successfully posted", classes: "#388e3c green darken-2"})
        history.push('/')
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        padding: "20px",
        textAlign: "center",
        maxWidth: "500px",
      }}
    >
      <input type="text" 
        placeholder="title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <input type="text" 
        placeholder="body" 
        value={body}
        onChange={(e)=>setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload Photo</span>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={()=>postDetails()}
      >
        Submit
      </button>
    </div>
  );
}
