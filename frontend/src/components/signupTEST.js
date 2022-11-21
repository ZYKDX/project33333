import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

/* This is the Signup component that enables user to sign up. */
export default function Signup() {
  const [values, setValues] = useState({
    user: "",
    password: "",
    email: "",
  });

  async function onSubmit(evt) {
    console.log("submitting");
    evt.preventDefault();
    const data = {
      user: values.user,
      password: values.password,
      email: values.email,
    };
    const res = await fetch("./signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(res);
    const resUser = await res.json();
    if (resUser.isLoggedIn) {
      window.location.href = "/";
    } else {
      //  ^([A-Za-z0-9]*[-_]?[A-Za-z0-9]+)*@northeastern.edu$
      // start/end with letter/number, contains at most one -_.
      var re = /^([A-Za-z0-9]*[-_]?[A-Za-z0-9]+)*@northeastern.edu$/;
      // TODO: handle signup failure.
      //showMessage(resUser.err);
      if(re.test(data.email)){
        alert("invlid name or password");
      }
      else{
        alert("invalid email address");
      }
    }
  }

  return (
    <div class="container mt-5">
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
      <h1 class="text-center">Create Account</h1>
      <form id="login" method="post" onSubmit={onSubmit}>
        <div class="form-outline mb-4">
          <input
            type="user"
            id="form2Example1"
            name="user"
            class="form-control"
            required="true"
            value={values.user}
            onChange={(e) => {
              setValues((values) => ({
                user: e.target.value,
                password: values.password,
                email: values.email,
              }));
            }}
          />
          <label class="form-label" for="form2Example1">
            User ID
          </label>
        </div>

        <div class="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            name="password"
            class="form-control"
            required={true}
            value={values.password}
            onChange={(e) => {
              setValues((values) => ({
                user: values.user,
                password: e.target.value,
                email: values.email,
              }));
            }}
          />
          <label class="form-label" for="form2Example2">
            Password
          </label>
        </div>

        <div class="form-outline mb-4">
          <input
            type="email"
            id="email"
            name="email"
            class="form-control"
            required={true}
            value={values.email}
            onChange={(e) => {
              setValues((values) => ({
                user: values.user,
                password: values.password,
                email: e.target.value,
              }));
            }}
          />
          <label class="form-label" for="form2Example3">
            NEU Email Address (This site is currently open to NEU students only)
          </label>
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          Sign Up
        </button>

        <div class="text-center">
          <p>
            Already have an account? <a href="./signin">Log In</a>
          </p>
        </div>
      </form>
    </div>
  );
}
