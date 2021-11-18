import React from "react";
import axios from "axios";
import { getStorage, setStorage, setAxiosHeaders } from "../../utils/storage";

import LoadingSpinner from "../ui/LoadingSpinner";

class CreditCardSubmit extends React.Component {
  constructor() {
    super();
    this.state = { error: null, IframeUrl: null, LeadLogId: null };
  }
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };
  componentDidMount() {
    let dobArr = getStorage("CreditCard.dob").split("/");

    let postData = {
      PrefixName: getStorage("CreditCard.title"),
      FirstName: getStorage("CreditCard.firstName"),
      Surname: getStorage("CreditCard.lastName"),
      Email: getStorage("CreditCard.email"),
      MobilePhone: getStorage("CreditCard.phone"),
      CreditCardTypeId: getStorage("CreditCard.type"),
      DOBDay: dobArr[0],
      DOBMonth: dobArr[1],
      DOBYear: dobArr[2],
      MaritalStatusTypeId: getStorage("CreditCard.maritalStatus"),
      NumberOfDependants: getStorage("CreditCard.dependants"),
      Password: getStorage("CreditCard.password"),
      ResidentialStatusTypeId: getStorage("CreditCard.residentialStatus"),
      EmploymentStatusTypeId: getStorage("CreditCard.employmentStatus"),
      AnnualIncomeBeforeTax: getStorage("CreditCard.annualIncome"),
      MonthlyMortgageRentPayment: getStorage(
        "CreditCard.monthlyMortgagePayment"
      ),
      MonthlyChildcareCost: getStorage("CreditCard.monthlyChildcareCost"),
      EmailOptIn: getStorage("CreditCard.emailCheck"),
      TextOptIn: getStorage("CreditCard.smsCheck"),
      PhoneOptIn: getStorage("CreditCard.phoneCheck"),
      EmployerName: getStorage("CreditCard.employerName"),

      Addresses: [
        {
          CustomerAddressId: "",
          CustomerId: "",
          AddressType: "",
          DateCreated: "",
          Address1: getStorage("CreditCard.a1address1Field"),
          Address2: getStorage("CreditCard.a1address2Field"),
          BuildingNameField: getStorage("CreditCard.a1buildingNameField"),
          BuildingNumberField: getStorage("CreditCard.a1buildingNumberField"),
          ThoroughfareNameField: getStorage(
            "CreditCard.a1thoroughfareNameField"
          ),
          Town: getStorage("CreditCard.a1town"),
          County: getStorage("CreditCard.a1county"),
          PostCode: getStorage("CreditCard.a1postcode"),
          Surname: getStorage("CreditCard.lastName"),
          FirstName: getStorage("CreditCard.firstName"),
          PrefixName: getStorage("CreditCard.title"),
          PostcodeId: null,
          TimeAtAddressYears: getStorage("CreditCard.a1years"),
          TimeAtAddressMonth: "0",
          AddressIndex: "0",
        },

        {
          CustomerAddressId: "",
          CustomerId: "",
          AddressType: "",
          DateCreated: "",
          Address1: getStorage("CreditCard.a2address1Field"),
          Address2: getStorage("CreditCard.a2address2Field"),
          BuildingNameField: getStorage("CreditCard.a2buildingNameField"),
          BuildingNumberField: getStorage("CreditCard.a2buildingNumberField"),
          ThoroughfareNameField: getStorage(
            "CreditCard.a2thoroughfareNameField"
          ),
          Town: getStorage("CreditCard.a2town"),
          County: getStorage("CreditCard.a2county"),
          PostCode: getStorage("CreditCard.a2postcode"),
          Surname: getStorage("CreditCard.lastName"),
          FirstName: getStorage("CreditCard.firstName"),
          PrefixName: getStorage("CreditCard.title"),
          PostcodeId: null,
          TimeAtAddressYears: getStorage("CreditCard.a2years"),
          TimeAtAddressMonth: "0",
          AddressIndex: "1",
        },

        {
          CustomerAddressId: "",
          CustomerId: "",
          AddressType: "",
          DateCreated: "",
          Address1: getStorage("CreditCard.a3address1Field"),
          Address2: getStorage("CreditCard.a3address2Field"),
          BuildingNameField: getStorage("CreditCard.a3buildingNameField"),
          BuildingNumberField: getStorage("CreditCard.a3buildingNumberField"),
          ThoroughfareNameField: getStorage(
            "CreditCard.a3thoroughfareNameField"
          ),
          Town: getStorage("CreditCard.a3town"),
          County: getStorage("CreditCard.a3county"),
          PostCode: getStorage("CreditCard.a3postcode"),
          Surname: getStorage("CreditCard.lastName"),
          FirstName: getStorage("CreditCard.firstName"),
          PrefixName: getStorage("CreditCard.title"),
          PostcodeId: null,
          TimeAtAddressYears: getStorage("CreditCard.a3years"),
          TimeAtAddressMonth: "0",
          AddressIndex: "2",
        },
      ],
    };

    setAxiosHeaders();

    axios
      .post("https://api.simplyswitch.com/api/CreditCard/SubmitLead", postData)
      .then((response) => {
        console.log(response);
        /*
        {
          "LeadLogId":8090746,
          "Status":"accepted",
          "RedirectUrl":"https://qa2.moneyguru.com/partner?serviceId=edb70a8e-30ee-4da5-8e34-2faac28944ca&affiliateRef=99ba419d-76b2-4e05-8052-7f6baed0e8ec&section=all&cp=f2f-journey&v1=8090746&v2=f2f",
          "Token":"edb70a8e-30ee-4da5-8e34-2faac28944ca"}
        */
        //window.location.href = response.data.RedirectUrl;
        setStorage("CreditCard.LeadLogId", response.data.LeadLogId);
        this.setState({
          IframeUrl: response.data.RedirectUrl,
          LeadLogId: response.data.LeadLogId,
        });
      })
      .catch((err) => {
        console.dir(err);
        let msg = err.response.data.message;
        if (msg === undefined || msg === "") {
          msg = err.response.data;
        }
        this.setState({ error: msg });
        
      });
  }
  render() {
    return (
      <div className="CreditCardSubmit CreditCardFormComponents" style={{ textAlign: "center" }}>
        {this.state.LeadLogId !== null && <p>LeadLogId:{this.state.LeadLogId}</p>}
        {this.state.error !== null && <h2>{this.state.error}</h2>}
        {this.state.IframeUrl !== null && (
          <>
            <div style={{ position: "relative" }}>
              <iframe
                className="IframeClass"
                src={this.state.IframeUrl}
                style={{ width: "100%", minHeight: "500vh" }}
                title="results"
                frameborder="0"
                scrolling="no"
              ></iframe>
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "grey",
                  opacity: "0.2",
                }}
              ></div>
            </div>
          </>
        )}
        {this.state.error === null && this.state.IframeUrl === null && (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}

export default CreditCardSubmit;
