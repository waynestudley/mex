import React from "react";
import ReactDOM from "react-dom";
import Breadcrumb from "../components/Breadcrumb";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Breadcrumb />, div);
});
