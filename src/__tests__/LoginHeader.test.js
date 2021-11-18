import React from "react";
import ReactDOM from "react-dom";
import LoginHeader from "../components/LoginHeader";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoginHeader />, div);
});
