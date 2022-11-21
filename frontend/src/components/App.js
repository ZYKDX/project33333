import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./signin";
import Signup from "./signup";
import Homepage from "./homepage";
import Addpost from "./addpost";
import Profile from "./profile";
import EditProfile from "./editprofile";
import Post from "./post";
import NewPost from "./newpost";

export default function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    getUsername().then((username) => {
      setUser(username);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Homepage user={user} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addpost" element={<Addpost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/post" element={<Post />} />
        <Route path="/newpost" element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

async function getUsername() {
  const res = await fetch("/getCurrentUser");
  if (res.status === 200) {
    const users = await res.json();
    const username = users.user;
    return username;
  }
}
