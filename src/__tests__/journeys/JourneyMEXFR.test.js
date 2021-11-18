import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import JourneyMEXFR from "../../components/journeys/JourneyMEXFR";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const journey = { breadcrumb: [] };
  ReactDOM.render(
    <Router>
      <JourneyMEXFR journey={journey} />
    </Router>,
    div
  );
});
