import React from "react";
//import { Link } from "react-router-dom";
import i18n from "../../i18n";

import { getStorage } from "../../utils/storage";

class ThankYou extends React.Component {
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };
  getLeadLogId = () => {
    let id = getStorage("Quote.LeadLogId");
    if (id === "0") {
      return "Submit Error Duplicate Lead";
    } else {
      //clearAllStorageKey("Quote");
      return id;
    }
  };
  render() {
    return (
      <div className="BBFormComponents">
        <div className="Panel">
          <div className="Module__primary">
            {this.props.isBtAgent ===
              false && (
                <>
                  <h3>Thank You</h3>
                  <p>{this.getLeadLogId()}</p>
                </>
              )}
            {this.props.isBtAgent ===
              true && (
                <>
                  <h3>Thank You</h3>
                  <p>
                    A BT member will be in touch with you shortly to arrange
                    your perfect package. Your Broadband application reference
                    is: {this.getLeadLogId()}
                  </p>
                  {i18n.t("Name")}: {getStorage("Quote.firstName")}{" "}
                  {getStorage("Quote.lastName")}
                  <br />
                  {i18n.t("Phone")}: {getStorage("Quote.phone")}
                  <br />
                  {i18n.t("Package")}: {getStorage("Quote.SelectedPackageName")}
                  <br />
                  {i18n.t("Address")}: {getStorage("Quote.address1")},{" "}
                  {getStorage("Quote.address2")}, {getStorage("Quote.town")},{" "}
                  {getStorage("Quote.county")}
                </>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default ThankYou;
