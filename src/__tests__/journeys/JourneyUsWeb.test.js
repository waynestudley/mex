import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import JourneyUsWeb from "../../components/journeys/JourneyUsWeb";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const journey = { breadcrumb: [] };
  ReactDOM.render(
    <Router>
      <JourneyUsWeb journey={journey} />
    </Router>,
    div
  );
});
