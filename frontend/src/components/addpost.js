import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

/* This is the Addpost component that enables user to post new experience. */
export default function Addpost() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [signinError, setSigninError] = useState("");

  function handleChange(evt) {
    console.log(evt);
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
    });
  }

  async function onSubmit(evt) {
    evt.preventDefault();
    const data = {
      user: values.username,
      password: values.password,
    };
    const res = await fetch("./authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resUser = await res.json();
    if (resUser.isLoggedIn) {
      window.location.href = "/";
    } else {
      setSigninError(resUser.err);
    }
  }

  return (
    <div class="container">
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link" id="navUsername" aria-current="page" href="./">
            Welcome
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="linkLogout" href="/logout">
            Log Out
          </a>
        </li>
      </ul>
      <div class="mt-4 mb-4 d-flex justify-content-between">
        <div class="h1">Post a new experience</div>
      </div>
      <div
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
        id="msg"
      >
        <span id="msgContent"></span>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <form id="newdiary">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Title
          </label>
          <input
            name="title"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Interviewing with Twitter Inc"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Context
          </label>
          <textarea
            name="content"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="20"
          ></textarea>
        </div>
        <div class="d-grid gap-2 mt-5">
          <button id="save" class="btn btn-primary" type="button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
