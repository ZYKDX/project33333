import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";

export default function EditProfile() {
    const [values, setValues] = useState({
        title: "",
        content: "",
      });

  useEffect(() => {
    getUser().then((values) => {
      setValues({
        title: values.title,
        content: values.content
      });
    });
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    setValues({
      ...values,
      [evt.target.name]: value,
    });
    console.log(values);
  }

  async function onSubmit(evt) {
    console.log("onsubmit");
    evt.preventDefault();
    const data = {
        title: values.title,
        content: values.content
    };
    const res = await fetch("./updatePost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      setTimeout(() => (window.location.href = "/post"), 2000);
    }
  }

  return (
    <div class="container-md">
      <Header></Header>
      <div class="h1">Edit Profile</div>
      <form method="post" onSubmit={onSubmit}>
        <div class="mb-3">
          <label class="form-label">User Name</label>
          <input
            name="user"
            class="form-control"
            disabled="disabled"
            value={profile.user}
            onChange={handleChange}
          ></input>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            name="email"
            class="form-control"
            id="username"
            disabled="disabled"
            value={profile.email}
            onChange={handleChange}
          ></input>
        </div>
        <div class="mb-3">
          <label class="form-label">Program</label>
          <input
            name="program"
            class="form-control"
            value={profile.program}
            onChange={handleChange}
          ></input>
        </div>
        <div class="mb-3">
          <label class="form-label">Location</label>
          <input
            name="location"
            class="form-control"
            value={profile.location}
            onChange={handleChange}
          ></input>
        </div>
        <div class="mb-3">
          <label class="form-label">Offers</label>
          <input
            name="offers"
            class="form-control"
            value={profile.offers}
            onChange={handleChange}
          ></input>
        </div>
        <div class="mb-3">
          <label class="form-label">Skills</label>
          <input
            name="skills"
            class="form-control"
            value={profile.skills}
            onChange={handleChange}
          ></input>
        </div>
        <div class="d-grid gap-2 mt-5">
          <button type="submit" class="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

async function getUser() {
  const cur = await fetch("/getCurrentUser");
  if (cur.status !== 200) {
    return;
  }
  const loggedin = await cur.json();
  if (!loggedin.isLoggedIn) {
    window.location.href = "/";
    return;
  }
  const res = await fetch("./getUser");
  const profile = await res.json();
  console.log(profile);
  return profile;
}
