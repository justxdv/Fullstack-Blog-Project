import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import "./singlePost.css";
import { useLocation } from "react-router";
import axios from "axios";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/uploads/";

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.description);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log("error in delete", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        username: user.username,
        title,
        description:desc,
      });
      window.location.reload();
    } catch (error) {
      console.log("error in update", error);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}

            {post.username === user?.username && (
            <div className="singlePostEdit">
              <i
                className="singlePostIcon fa-regular fa-pen-to-square"
                onClick={() => setUpdateMode(true)}
              ></i>
              <i
                className="singlePostIcon fa-solid fa-trash-can"
                onClick={handleDelete}
              ></i>
            </div>
          )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <b>{post.username}</b>
          </span>
          <span className="singlePostDate">1 hour ago...</span>
        </div>

        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDesc">{post.description}</p>
        )}

        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
