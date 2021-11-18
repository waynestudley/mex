import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import JourneyMGCreditCard from "../../components/journeys/JourneyMGCreditCard";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const journey = { breadcrumb: [] };
  ReactDOM.render(
    <Router>
      <JourneyMGCreditCard journey={journey} />
    </Router>,
    div
  );
});
