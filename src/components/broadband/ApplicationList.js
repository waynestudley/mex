import React, { Component } from "react";

import axios from "axios";
import LoadingSpinner from "../ui/LoadingSpinner";

import "../../scss/components/broadband/ApplicationList.scss";

class ApplicationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    axios
      .post(this.props.journey.api + "Media/GetApplicationList")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  formatDate = (dateUTC) => {
    var date = new Date(dateUTC);
    return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
  };

  getStatusDesc = (value) => {
    if (value === 0) {
      return "Pending";
    } else if (value === 1) {
      return "Complete";
    } else if (value === 2) {
      return "Rejected - Do not come back";
    } else if (value === 3) {
      return "Rejected - Do not come back";
    } else if (value === 4) {
      return "Complete";
    } else if (value === 5) {
      return "Rejected - Do not come back";
    } else if (value === 6) {
      return "Rejected - Do not come back";
    } else if (value === 7) {
      return "Complete";
    }
  };

  render() {
    return (
      <div className="BBFormComponents">
        <div className="Panel">
          <div className="">
          {this.state.data === null && <LoadingSpinner />}
          {this.state.data && (
            <>
              <h3 style={{ textAlign: "center" }}>
                Applications List - (Week)
              </h3>
              <table
                border="0"
                cellSpacing="0"
                cellPadding="2"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr style={{ fontWeight: "bolder" }}>
                    <td>Application Id</td>
                    <td>First Name</td>
                    <td>Surname</td>
                    <td>Postcode</td>
                    <td>Date Time</td>
                    <td>Application Status</td>
                    <td>Notes</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((item) => {
                    return (
                      <tr key={item.LeadId}>
                        <td>{item.LeadId}</td>
                        <td>{item.FirstName}</td>
                        <td>{item.Surname}</td>
                        <td>{item.Postcode === "null" ? "" : item.Postcode}</td>
                        <td>{this.formatDate(item.LeadCreated)}</td>
                        <td>{this.getStatusDesc(item.LeadStatusId)}</td>
                        <td>{item.LeadBuyerExternalId}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationList;
