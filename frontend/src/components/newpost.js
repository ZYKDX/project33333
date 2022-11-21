import React from "react";
import { useState } from "react";
import Header from "./header";

export default function Newpost() {
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    title: "",
    content: "",
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
      title: values.title,
      content: values.content,
    };
    const res = await fetch("./createPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      const json = await res.json();
      setMessage(json.msg);
      setTimeout(() => window.location.replace("/"), 2000);
    }
  }

  return (
    <div>
      <Header></Header>
      <div class="container">
        <div class="mt-4 mb-4 d-flex justify-content-between">
          <div class="h1">Post a new experience</div>
        </div>
        <form onSubmit={onSubmit}>
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input
              name="title"
              class="form-control"
              placeholder="Interviewing with Twitter Inc"
              required={true}
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Content</label>
            <textarea
              name="content"
              class="form-control"
              rows="20"
              required={true}
              value={values.username}
              onChange={handleChange}
            ></textarea>
          </div>
          <div class="d-grid gap-2 mt-5">
            <button id="save" class="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
