import React, { useState, useEffect } from "react";

export default function Header(props) {
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    getUsername().then((username) => {
      setUser(username);
    });
  }, []);

  async function handleLogout() {
    const res = await fetch("/logout");
    const resLogout = await res.json();
    setMessage(resLogout.msg);
    setTimeout(() => window.location.href = "/signin", 2000);
  }

  return (
    <div class="container">
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="navUsername"
            aria-current="page"
            href="/profile"
          >
            Welcome {user}!
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="linkLogout" href="#" onClick={handleLogout}>
            Log Out
          </a>
        </li>
      </ul>
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
    </div>
  );
}

async function getUsername() {
  const res = await fetch("/getCurrentUser");
  if (res.status !== 200) {
    return;
  }
  const json = await res.json();
  if (!json.isLoggedIn) {
    window.location.href = "/signin";
    return;
  }
  return json.user.user;
}
