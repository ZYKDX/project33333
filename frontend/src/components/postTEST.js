import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";

export default function Post() {
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    getPost().then((post) => {
      setPost({
        title: post.title,
        content: post.content,
        author: post.author,
      });
    });
  }, []);

  useEffect(() => {
    getUsername().then((username) => {
      setUser(username);
    });
  }, []);

  async function handleDelete(e) {
    e.preventDefault();
    const p = new URLSearchParams(window.location.search);
    const res = await fetch("/deletePost?id=" + p.get("id"));
    const json = await res.json();
    setMessage(json.msg);
    setTimeout(() => window.location.replace("/"), 2000);
  }

  function handleEdit(evt)
  {
    handleChange(evt);
  }
  function handleChange(evt)
  {
    const value = evt.target.value;
    setPost({
      ...post,
      [evt.target.name]: value,
    });
      console.log(post);
  } 

  return (
    <div class="container-md">
      <Header></Header>
      {message !== "" && (
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
          id="msg"
        >
          <span id="msgContent">{message}</span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div>
        <h1 id="title" class="text-center mb-4">
          {post.title}
        </h1>
        <h5 id="content" class="mb-4">
          {post.content}
        </h5>
        <div class="d-flex justify-content-center">
          {post.author === user ? (
            <div>
              <button 
                id="edit" 
                type="button" 
                class="btn btn-primary mx-5"
                onClick={handleEdit} 
              >
                Edit
              </button>
              <button
                id="delete"
                type="button"
                class="btn btn-danger mx-5"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          ) : (
            
            // how to get the author's email here?
            <details>
              <summary>Contact Author</summary>
              {post.author}
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

async function getPost() {
  const p = new URLSearchParams(window.location.search);
  const res = await fetch("./getPost?id=" + p.get("id"));
  const post = await res.json();
  return post;
}

async function getUsername() {
  const res = await fetch("/getCurrentUser");
  if (res.status !== 200) {
    return;
  }
  const json = await res.json();
  if (!json.isLoggedIn) {
    window.location.href = "/";
    return;
  }
  return json.user.user;
}
