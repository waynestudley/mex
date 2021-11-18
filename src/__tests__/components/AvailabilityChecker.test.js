import React from "react";
import ReactDOM from "react-dom";

import AvailabilityChecker from "../../components/broadband/AvailabilityChecker";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const journey = { api: "" };
  ReactDOM.render(<AvailabilityChecker journey={journey} />, div);
});
