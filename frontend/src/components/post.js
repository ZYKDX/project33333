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
  const [email, setEmail] = useState("@northeastern.edu");

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

  // 
  useEffect(() => {
    getEmail().then((email) => {
      setEmail(email);
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
              <a href="/editpost">
              <button id="edit" type="button" class="btn btn-primary mx-5">
                Edit
              </button>
              </a>
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
            <details>
              <summary>Contact Author</summary>
              {"Author:"+post.author+" Email:"+email}
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

// 
async function getEmail(author){
  const res = await fetch("./getEmail?id=" + author);
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
