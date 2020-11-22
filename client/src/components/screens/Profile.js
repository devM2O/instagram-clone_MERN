import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

export default function Profile() {
  const [myPics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch("/myPosts", {
      headers: {
        Authorization: "minnmawoo " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.myPosts);
      });
  }, []);
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "minn-maw-oo");
      fetch("https://api.cloudinary.com/v1_1/minn-maw-oo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          localStorage.setItem("user", JSON.stringify({...state, pic: data.url}))
          dispatch({type: "UPDATEPIC", payload: data.url})
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div style={{ margin: "18px 0px", borderBottom: "1px solid grey" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : "loading..."}
            />
          </div>
          <div>
            <h4>{state ? state.name : "loading"}</h4>
            <h5>{state ? state.email : "loading"}</h5>
            <div style={{ display: "flex", width: "100%" }}>
              <h6 style={{ marginLeft: "5px" }}>{myPics.length} posts</h6>
              <h6 style={{ marginLeft: "5px" }}>
                {state ? state.followers.length : "0"} followers
              </h6>
              <h6 style={{ marginLeft: "5px" }}>
                {state ? state.following.length : "0"} following
              </h6>
            </div>
          </div>
        </div>
        <div className="file-field input-field" style={{ marginLeft: "20px" }}>
          <div className="btn #64b5f6 blue darken-1">
            <span>change profile</span>
            <input
              type="file"
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div className="gallery">
        {myPics.map((item) => {
          return (
            <img
              className="item"
              src={item.photo}
              alt={item.title}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}
