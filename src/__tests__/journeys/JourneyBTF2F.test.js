import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import JourneyBTF2F from "../../components/journeys/JourneyBTF2F";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const journey = { breadcrumb: [] };
  ReactDOM.render(
    <Router>
      <JourneyBTF2F journey={journey} />
    </Router>,
    div
  );
});
