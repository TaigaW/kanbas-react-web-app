import React from "react";
import Signup from "./Signup";
import Signin from "./Signin";

export default function AuthenticationPage() {
  return (
    <div>
      <h1>Authentication</h1>
      <Signup />
      <hr /> {/* Optional: Add a horizontal line to separate the components */}
      <Signin />
    </div>
  );
}
