import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../../App";

export default function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/allPosts", {
      headers: {
        Authorization: "minnmawoo " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  //---------------------------Like && unLike--------------------//
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "minnmawoo " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "minnmawoo " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };
  //---------------------------------------------------------------//

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "minnmawoo " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    }).then(res=>res.json())
    .then(result=>{
      console.log(result);
      const newData = data.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setData(newData)
    })
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="image-card">
              <img className="img-card" src={item.photo} />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state.id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
              <p>{item.body}</p>
              {
                item.comments.map(record=>{
                  return(
                  <h6 key={record._id}><span style={{fontWeight:"600"}}>{record.postedBy.name} </span>{record.text}</h6>
                  )
                })
              }
              <form
                onSubmit={(e)=>{
                  e.preventDefault()
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <div style={{display: "flex"}}>
                <input type="text" placeholder="add comment"/>
                <button
                  class="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                >
                  
                  <i class="material-icons right">send</i>
                </button>
                </div>
                
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
