import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";

export default function Profile() {
  const [profile, setProfile] = useState({
    user: "",
    email: "",
    program: "",
    location: "",
    offers: "",
    skills: "",
  });

  useEffect(() => {
    getUser().then((profile) => {
      setProfile({
        user: profile.user,
        email: profile.email,
        location: profile.location,
        offers: profile.offers,
        program: profile.program,
        skills: profile.skills,
      });
    });
  }, []);

  function handleEdit(e) {
    e.preventDefault();
    console.log("handle edit");
    window.location.href = "/editprofile";
  }

  return (
    <div>
      <Header></Header>
      <div class="container-md">
        <div class="h1">About me</div>
        <table class="table table-default">
          <tbody>
            <tr>
              <th>User Name</th>
              <td>{profile.user}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{profile.email}</td>
            </tr>
            <tr>
              <th>Program</th>
              <td>{profile.program}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{profile.location}</td>
            </tr>
            <tr>
              <th>Offers</th>
              <td>{profile.offers}</td>
            </tr>
            <tr>
              <th>Skills</th>
              <td>{profile.skills}</td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-primary mx-5"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>
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
  return profile;
}
