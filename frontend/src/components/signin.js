import React from "react";
import { useState } from "react";

/* This is the Signin component that enables user to sign in. */
export default function Signin() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [signinError, setSigninError] = useState("");

  function handleChange(evt) {
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
    console.log(data);
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
    <div class="container mt-5">
      {signinError !== "" && (
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
          id="msg"
        >
          <span id="msgContent">{signinError}</span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <h1 class="text-center">Welcome to NEU Align Career!</h1>
      <form id="login" method="post" onSubmit={onSubmit}>
        <div class="form-outline mb-4">
          <input
            type="user"
            name="username"
            class="form-control"
            required={true}
            value={values.username}
            onChange={handleChange}
          />
          <label class="form-label">User ID</label>
        </div>

        <div class="form-outline mb-4">
          <input
            type="password"
            name="password"
            class="form-control"
            required={true}
            value={values.password}
            onChange={handleChange}
          />
          <label class="form-label">Password</label>
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <div class="text-center">
          <p>
            Not a member? <a href="./signup">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}
