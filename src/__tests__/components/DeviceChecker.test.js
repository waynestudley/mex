import React from "react";
import ReactDOM from "react-dom";

import DeviceChecker from "../../components/broadband/DeviceChecker";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const journey = { api: "" };
  ReactDOM.render(<DeviceChecker journey={journey} />, div);
});
