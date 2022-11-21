import React from "react";
import Dashboard from "./dashboard";
import Signin from "./signin";

export default function Homepage(props) {
  return <div>{props.user === undefined ? <Signin /> : <Dashboard />}</div>;
}
