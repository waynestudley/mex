import React from "react";
import ReactDOM from "react-dom";
import Journey from "../components/Journeys";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Journey />, div);
});
