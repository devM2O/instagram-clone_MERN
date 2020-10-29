import React from "react";

export default function CreatePost() {
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
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload Photo</span>
          <input type="file" multiple />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
        Submit
      </button>
    </div>
  );
}
