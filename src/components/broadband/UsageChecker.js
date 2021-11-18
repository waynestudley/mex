import React from "react";
import { Formik } from "formik";
import i18n from "../../i18n";
import { getStorage, setStorage } from "../../utils/storage";

import "../../scss/components/broadband/UsageChecker.scss";

import { ReactComponent as BroadbandSvg } from "../../images/svg/broadband-icon.svg";
import { ReactComponent as PhoneSvg } from "../../images/svg/phone-icon.svg";
import { ReactComponent as SmartTVSvg } from "../../images/svg/smart-tv-icon.svg";
import { ReactComponent as Moviesvg } from "../../images/svg/tv-movies-icon.svg";
import { ReactComponent as SportsSvg } from "../../images/svg/tv-sports-icon.svg";
import { ReactComponent as EntertainmentSvg } from "../../images/svg/tv-entertainment-icon.svg";
import { ReactComponent as NetflixSvg } from "../../images/svg/netflix-logo.svg";
import { ReactComponent as PrimeSvg } from "../../images/svg/amazon-prime-video-logo.svg";
import { ReactComponent as NowSvg } from "../../images/svg/now-tv-logo.svg";

class UsageChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "" };
  }

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  convertToStorage = (value) => {
    if (value === "on" || value === true) {
      return true;
    } else if (Array.isArray(value) && value[0] === "on") {
      return true;
    } else {
      return false;
    }
  };

  convertFromStorage = (value) => {
    if (value === true || value === "true") {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div className="UsageChecker BBFormComponents">
        <div className="Panel">
          <Formik
            initialValues={{
              broadbandCheck: this.convertFromStorage(
                getStorage("Quote.broadbandCheck")
              ),
              phoneCheck: this.convertFromStorage(
                getStorage("Quote.phoneCheck")
              ),
              smartCheck: this.convertFromStorage(
                getStorage("Quote.smartCheck")
              ),
              entertainmentCheck: this.convertFromStorage(
                getStorage("Quote.entertainmentCheck")
              ),
              sportsCheck: this.convertFromStorage(
                getStorage("Quote.sportsCheck")
              ),
              moviesCheck: this.convertFromStorage(
                getStorage("Quote.moviesCheck")
              ),
              netflixCheck: this.convertFromStorage(
                getStorage("Quote.netflixCheck")
              ),
              primeCheck: this.convertFromStorage(
                getStorage("Quote.primeCheck")
              ),
              nowCheck: this.convertFromStorage(getStorage("Quote.nowCheck")),
            }}
            validate={(values) => {
              const errors = {};
              if (
                values.broadbandCheck === false &&
                values.phoneCheck === false &&
                values.smartCheck === false
              ) {
                errors.broadbandCheck = "";
                this.setState({ errorMessage: "Select one package type" });
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setStorage(
                "Quote.broadbandCheck",
                this.convertToStorage(values.broadbandCheck)
              );
              setStorage(
                "Quote.phoneCheck",
                this.convertToStorage(values.phoneCheck)
              );
              setStorage(
                "Quote.smartCheck",
                this.convertToStorage(values.smartCheck)
              );
              setStorage(
                "Quote.entertainmentCheck",
                this.convertToStorage(values.entertainmentCheck)
              );
              setStorage(
                "Quote.sportsCheck",
                this.convertToStorage(values.sportsCheck)
              );
              setStorage(
                "Quote.moviesCheck",
                this.convertToStorage(values.moviesCheck)
              );
              setStorage(
                "Quote.netflixCheck",
                this.convertToStorage(values.netflixCheck)
              );
              setStorage(
                "Quote.primeCheck",
                this.convertToStorage(values.primeCheck)
              );
              setStorage(
                "Quote.nowCheck",
                this.convertToStorage(values.nowCheck)
              );

              setSubmitting(false);

              this.goNextRoute();
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
                <h3>{i18n.t("NowTellUsWhatYouLikeInYourPackage")}</h3>
                <h4>{i18n.t("WhatMediaWouldYouLike")}</h4>
                {this.state.errorMessage && (
                  <h4 className="error-message">{this.state.errorMessage}</h4>
                )}
                <div className="UsageChecker__row">
                  <input
                    type="checkbox"
                    name="broadbandCheck"
                    id="broadbandCheck"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.broadbandCheck}
                  />
                  <label htmlFor="broadbandCheck">
                    {i18n.t("Broadband")}
                    <BroadbandSvg />
                  </label>
                 
                  <input
                    type="checkbox"
                    name="phoneCheck"
                    id="phoneCheck"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.phoneCheck}
                  />
                  <label htmlFor="phoneCheck">
                    {i18n.t("Phone")}
                    <PhoneSvg />
                  </label>

                  <input
                    type="checkbox"
                    name="smartCheck"
                    id="smartCheck"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.smartCheck}
                  />
                  <label htmlFor="smartCheck">
                    {i18n.t("SmartTV")}
                    <SmartTVSvg />
                  </label>                  
                </div>
                <h4>{i18n.t("WhatWouldYouLikeInTVPackage")}</h4>
                <div className="UsageChecker__row">
                  <input
                    type="checkbox"
                    name="entertainmentCheck"
                    id="entertainmentCheck"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.entertainmentCheck}
                  />
                  <label htmlFor="entertainmentCheck">
                    {i18n.t("Entertainment")}
                    <EntertainmentSvg />
                  </label>                 
                  <input
                    type="checkbox"
                    name="sportsCheck"
                    id="sportsCheck"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.sportsCheck}
                  />
                  <label htmlFor="sportsCheck">
                    {i18n.t("Sports")}
                    <SportsSvg />
                  </label>                
                  <input
                    type="checkbox"
                    name="moviesCheck"
                    id="moviesCheck"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.moviesCheck}
                  />
                  <label htmlFor="moviesCheck">
                    {i18n.t("Movies")}
                    <Moviesvg />
                  </label>               
                </div>
                <h4>{i18n.t("WhichOnDemandTVService")}</h4>
                <div className="UsageChecker__row">
                  <input
                    type="checkbox"
                    name="netflixCheck"
                    id="netflixCheck"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.netflixCheck}
                  />
                  <label htmlFor="netflixCheck">
                    Netflix
                    <NetflixSvg />
                  </label>                 
                  <input
                    type="checkbox"
                    name="primeCheck"
                    id="primeCheck"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.primeCheck}
                  />
                  <label htmlFor="primeCheck">
                    Prime
                    <PrimeSvg />
                  </label>
                  <input
                    type="checkbox"
                    name="nowCheck"
                    id="nowCheck"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.nowCheck}
                  />
                  <label htmlFor="nowCheck">
                    Now
                    <NowSvg />
                  </label>
                </div>
                <div className="submitWrapper">
                  <button type="submit" disabled={isSubmitting}>
                    {i18n.t("Continue")}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default UsageChecker;
