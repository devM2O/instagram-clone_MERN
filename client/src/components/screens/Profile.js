import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

export default function Profile() {
  const [myPics, setPics] = useState([]);
  const {state, dispatch} = useContext(UserContext);

  useEffect(() => {
    fetch("/myPosts", {
      headers: {
        Authorization: "minnmawoo " + localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.myPosts);
      });
  }, []);
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state? state.pic: "loading..."}
          />
        </div>
        <div>
          <h4>{state?state.name:"loading"}</h4>
          <h5>{state?state.email:"loading"}</h5>
          <div style={{ display: "flex", width: "100%" }}>
            <h6 style={{ marginLeft: "5px" }}>{myPics.length} posts</h6>
            <h6 style={{ marginLeft: "5px" }}>{state? state.followers.length : "0"} followers</h6>
            <h6 style={{ marginLeft: "5px" }}>{state? state.following.length : "0"} following</h6>
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
