import React from "react";
import { useState, useEffect } from "react";
import Postentry from "./postentry";
import Header from "./header";

export default function Dashboard(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/listPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setList(res);
      });
  }, []);

  function handleClickShare(e) {
    e.preventDefault();
    console.log("handle click share");
    window.location.href = "/newpost";
  }

  return (
    <div>
      <Header></Header>
      <div class="container">
        <div class="mt-4 mb-4 d-flex justify-content-between">
          <div class="h1">Welcome to NEU Align Career!</div>
          <div>
            <button
              class="btn btn-primary me-md-2 justify-content-md-end"
              id="newpost"
              type="button"
              onClick={handleClickShare}
            >
              Share my experience
            </button>
          </div>
        </div>
        <div id="content"></div>
        <div id="list" class="list-group">
          {list.map((i, index) => (
            <Postentry
              id={i._id}
              author={i.author}
              title={i.title}
              content={i.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
