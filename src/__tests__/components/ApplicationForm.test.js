import React from "react";
import ReactDOM from "react-dom";

import ApplicationForm from "../../components/broadband/ApplicationForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const journey = { api: "" };
  ReactDOM.render(<ApplicationForm journey={journey} />, div);
});
