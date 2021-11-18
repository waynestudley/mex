import React from "react";
import i18n from "../i18n";

import journeys from "../data/journeys";

import { getStorage } from "../utils/storage";

import "../scss/components/Journeys.scss";

class Journeys extends React.Component {
  goNextRoute = () => {
    setTimeout(() => {
      this.props.history.push(this.props.nextRoute);
    }, 0);
  };

  selectJourney = (i) => {
    this.props.switchJourney(journeys[i]);
    this.props.history.push(this.props.nextRoute);
  };

  /*
3            CC Finance lead form                    Not live now
5            CC Broadband Wizard                     BB journey
8            BT Broadband Solus                      BT Broadband journey
9            Scottish Power                          Only a flag for energy (.NET MVC) journey
10           Telesale Broadband                      Not live now
11           Charity Broadband                       Not live now
13           Credit Cards                            Credit card journey already on V2
*/

  getVisibility = (item) => {
    let groups = getStorage("Login.LoginSecurityGroup").split(",");
    let found = false;
    for (let i = 0; i < groups.length; i++) {
      if (
        groups[i] !== "" &&
        Number(groups[i]) === Number(item.LoginSecurityGroup)
      ) {
        found = true;
        break;
      }
    }

    if (found) {
      return { display: "block" };
    } else {
      return { display: "none" };
    }
  };

  getNumOfJourneys = () => {
    let groups = getStorage("Login.LoginSecurityGroup").split(",");
    let numFound = 0;

    for (let x = 0; x < journeys.length; x++) {
      for (let i = 0; i < groups.length; i++) {
        if (
          groups[i] !== "" &&
          Number(groups[i]) === Number(journeys[x].LoginSecurityGroup)
        ) {
          numFound++;
          break;
        }
      }
    }

    return numFound;
  };

  triggerSingleJourney = () => {
    let groups = getStorage("Login.LoginSecurityGroup").split(",");

    for (let x = 0; x < journeys.length; x++) {
      for (let i = 0; i < groups.length; i++) {
        if (
          groups[i] !== "" &&
          Number(groups[i]) === Number(journeys[x].LoginSecurityGroup)
        ) {
          setTimeout(() => {
            this.selectJourney(x);
          }, 0);

          break;
        }
      }
    }
  };

  render() {
    if (this.getNumOfJourneys() === 1) {
      this.triggerSingleJourney();
      return null;
    } else {
      return (
        <div className="Journeys">
          <h4 style={{ textAlign: "center" }}> {i18n.t("SelectJourney")}</h4>

          {journeys.map((item, i) => (
            <button
              onClick={() => {
                this.selectJourney(i);
              }}
              key={"item" + i}
              style={this.getVisibility(item)}
            >
              {item.displayName}
            </button>
          ))}
        </div>
      );
    }
  }
}

export default Journeys;
