import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { initialise } from "../i18n";

import Init from "./Init";
import Login from "./Login";
import Journeys from "./Journeys";

import JourneyUsWeb from "./journeys/JourneyUsWeb";
import JourneyBTF2F from "./journeys/JourneyBTF2F";
import JourneyQCF2F from "./journeys/JourneyQCF2F";
import JourneyMEXFR from "./journeys/JourneyMEXFR";
import JourneyMGCreditCard from "./journeys/JourneyMGCreditCard";

import "../scss/app.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = { journey: null, i18nInit: false };
  }

  componentDidMount() {
    initialise(this.onInitialise);
  }

  onInitialise = () => {
    this.setState({ i18nInit: true });
  };

  switchJourney = (journey) => {
    let root = document.documentElement;

    root.style.setProperty("--brand-primary", journey.theme.brandPrimary);
    root.style.setProperty("--brand-secondary", journey.theme.brandSecondary);
    root.style.setProperty("--brand-tertiary", journey.theme.brandTertiary);
    root.style.setProperty("--brand-background", journey.theme.brandBackground);
    root.style.setProperty("--brand-heading", journey.theme.brandHeading);
    root.style.setProperty("--brand-body", journey.theme.brandBody);
    root.style.setProperty("--cta-heading", journey.theme.ctaHeading);
    root.style.setProperty("--cta-primary", journey.theme.ctaPrimary);
    root.style.setProperty("--cta-secondary", journey.theme.ctaSecondary);
    root.style.setProperty("--cta-body", journey.theme.ctaBody);

    this.setState({ journey: journey });
  };

  render() {
    return (
      <div className="App">
        {this.state.i18nInit === true && (
          <Router>
            <Route
              exact
              path="/"
              render={(renderProps) => (
                <Init {...renderProps} nextRoute="/login" />
              )}
            />
            <Switch>
              <Route
                exact
                path="/login"
                render={(renderProps) => (
                  <Login
                    {...renderProps}
                    nextRoute="/journey"
                    switchJourney={this.switchJourney}
                  />
                )}
              />
              <Route
                exact
                path="/journey"
                render={(renderProps) => (
                  <Journeys
                    {...renderProps}
                    nextRoute="/start"
                    switchJourney={this.switchJourney}
                  />
                )}
              />

              {this.state.journey && this.state.journey.name === "us_web" && (
                <JourneyUsWeb journey={this.state.journey} />
              )}

              {this.state.journey && this.state.journey.name === "bt_f2f" && (
                <JourneyBTF2F journey={this.state.journey} />
              )}

              {this.state.journey &&
                this.state.journey.name === "mg_credit_card_f2f" && (
                  <JourneyMGCreditCard journey={this.state.journey} />
                )}

              {this.state.journey && this.state.journey.name === "qc_f2f" && (
                <JourneyQCF2F journey={this.state.journey} />
              )}

              {this.state.journey && this.state.journey.name === "mex_fr" && (
                <JourneyMEXFR journey={this.state.journey} />
              )}

              {this.state.journey === null && (
                <Route
                  path="/"
                  render={(renderProps) => (
                    <Login {...renderProps} nextRoute="/journey" />
                  )}
                />
              )}
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
