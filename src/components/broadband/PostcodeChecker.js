import React from "react";
import { Formik } from "formik";
import axios from "axios";
import i18n from "../../i18n";

import { setStorage, setAxiosHeaders } from "../../utils/storage";
import LoadingSpinner from "../ui/LoadingSpinner";

import "../../scss/components/broadband/PostcodeChecker.scss";

/*
Need to impliment this

// cancelToken and source declaration

 const CancelToken = axios.CancelToken;
 let source = CancelToken.source();

 source && source.cancel('Operation canceled due to new request.');

 // save the new request for cancellation
 source = axios.CancelToken.source();

 axios.post(url, postData, {
     cancelToken: source.token
 })
 .then((response)=>{
     return response && response.data.payload);
 })
 .catch((error)=>{
     return error;
 });

*/

class PostcodeChecker extends React.Component {
  constructor() {
    super();
    this.state = { packageData: null, providerList: null };
    this.lookupInterval = null;
  }

  componentDidMount() {
    setAxiosHeaders();
    axios
      .post(
        this.props.journey.api +
          "Media/GetPromotionalPackageList?countryId=" +
          this.props.journey.countryId
      )
      .then((response) => {
        this.setState({ packageData: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    clearTimeout(this.lookupInterval);
  }

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  selectAddress(obj) {
    setStorage("Quote.address1", obj.Address1);
    setStorage("Quote.address2", obj.Address2);
    setStorage("Quote.county", obj.County);
    setStorage("Quote.town", obj.Town);
    this.goNextRoute();
  }

  lookupPostcode = (postcode) => {
    clearTimeout(this.lookupInterval);

    this.lookupInterval = setTimeout(() => {
      this.lookupPostcodeDelay(postcode);
    }, 500);
  };
  lookupPostcodeDelay = (postcode) => {
    axios
      .get(
        this.props.journey.api +
          "Address/PostcodeLookupBtGbg?postcode=" +
          postcode.toUpperCase()
      )
      .then((response) => {
        this.setState({ postcodeList: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="PostcodeChecker BBFormComponents">
        <div className="Hero">
          <div className="Panel">
            <h2 style={{ textAlign: "center" }}>
              {i18n.t("PostcodeCheckerLine1")}
              <strong>
                {" "}
                {i18n.t("PostcodeCheckerLine2")}
                <br />
                {i18n.t("PostcodeCheckerLine3")}
              </strong>{" "}
              {i18n.t("PostcodeCheckerLine4")}
              <br />
              <strong>{i18n.t("PostcodeCheckerLine5")}</strong>
            </h2>
          </div>
          <div className="Panel">
            <Formik
              initialValues={{ postcode: "" }}
              validate={(values) => {
                const errors = {};

                if (!values.postcode) {
                  errors.postcode = i18n.t("Required");
                } else {
                  setStorage("Quote.postcode", values.postcode);
                  this.lookupPostcode(values.postcode);
                }
                return errors;
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <label>{i18n.t("Postcode")}</label>
                  <input
                    type="text"
                    name="postcode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.postcode}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    autoComplete="off"
                  />
                  <div className="FormError">
                    {errors.postcode && touched.postcode && errors.postcode}
                  </div>
                  <div className="AddressWrapper">
                    {this.state.postcodeList &&
                      this.state.postcodeList.map((address, index) => (
                        <div
                          key={"addressId" + index}
                          onClick={() => this.selectAddress(address)}
                          style={{ position: "relative" }}
                        >
                          <p>{address.Address1 + " " + address.Address2}</p>
                          {this.props.isBtAgent && address.Speed && (
                            <img
                              style={{
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                right: "0px",
                                width: "5vw",
                              }}
                              src={
                                process.env.PUBLIC_URL +
                                "/imagesPackage/bt_logo_white.png"
                              }
                              alt="bt logo"
                            />
                          )}
                        </div>
                      ))}
                  </div>
                  <br />
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="Panel">
          {this.state.packageData === null && <LoadingSpinner />}
          <div className="PostcodeChecker__featureContainer">
            {this.state.packageData !== null &&
              this.state.packageData.map((item, i) => (
                <div className="PostcodeChecker__feature" key={"key" + i}>
                  <div className="PostcodeChecker__featureTitle">
                    {i === 0 && <span>{i18n.t("FeaturedFibrePackage")}</span>}
                    {i === 1 && <span>{i18n.t("FeaturedBroadbandOnly")}</span>}
                    {i === 2 && (
                      <span>{i18n.t("FeaturedBroadbandPackage")}</span>
                    )}
                    {i === 3 && (
                      <span>{i18n.t("FeaturedBroadbandPackage")}</span>
                    )}
                  </div>
                  <div className="PostcodeChecker__featureBody">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/imagesPackage/" +
                        item.MediaProvider.ProviderLogo
                      }
                      alt="provider"
                    />
                    <br />
                    <span>{item.PackageName}</span>
                    <br />
                    <span>
                      £{item.MonthlyCost} a month for{" "}
                      {item.ContractLengthMonths} {i18n.t("months")}
                    </span>
                    <br />
                    <span>
                      {i18n.t("AverageDownloadSpeedsOf")} {item.MaxSpeed}{" "}
                      {i18n.t("Mbs")}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PostcodeChecker;
