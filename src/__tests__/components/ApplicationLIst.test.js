import React from "react";
import ReactDOM from "react-dom";

import ApplicationList from "../../components/broadband/ApplicationList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const journey = { api: "" };
  ReactDOM.render(<ApplicationList journey={journey} />, div);
});
