import React from "react";
import axios from "axios";
import { Formik } from "formik";
import i18n from "../../i18n";
import { getStorage, setStorage, setAxiosHeaders } from "../../utils/storage";
import LoadingSpinner from "../ui/LoadingSpinner";

class PaymentChecker extends React.Component {
  constructor() {
    super();
    this.state = {
      ofcomBand: "",
      providerList: null,
    };
  }
  componentDidMount() {
    setAxiosHeaders();
    axios
      .post(this.props.journey.api + "Media/GetOfcomBand", {
        CurrentMediaPackageBroadband: getStorage("Quote.broadbandCheck"),
        CurrentMediaPackagePhone: getStorage("Quote.phoneCheck"),
        CurrentMediaPackageTV: getStorage("Quote.smartTVCheck"),

        CurrentMediaPackageMovies: getStorage("Quote.moviesCheck"),
        CurrentMediaPackageSports: getStorage("Quote.sportsCheck"),
        CurrentMediaPackageEntertainment: getStorage(
          "Quote.entertainmentCheck"
        ),

        CurrentStreamServicesNetflix: getStorage("Quote.netflixCheck"),
        CurrentStreamServicesPrime: getStorage("Quote.primeCheck"),
        CurrentStreamServicesNowTV: getStorage("Quote.nowCheck"),

        NumDevicesHighUse: getStorage("Quote.numDevicesHighUse"),
        NumDevicesMediumUse: getStorage("Quote.numDevicesMediumUse"),
        NumDevicesLowUse: getStorage("Quote.numDevicesLowUse"),
      })
      .then((response) => {
        this.setState({ ofcomBand: response.data.Name });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };
  render() {
    return (
      <div className="BBFormComponents">
        <div className="Panel">
          <div className="Module__primary">
            {this.state.ofcomBand === "" && <LoadingSpinner />}
            {this.state.ofcomBand !== "" && (
              <>
                Your OfCom Usage Band is : {this.state.ofcomBand}
                <Formik
                  initialValues={{
                    currentMonthlyPayment:
                      getStorage("Quote.currentMonthlyPayment") || "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.currentMonthlyPayment) {
                      errors.currentMonthlyPayment = "Required";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setStorage(
                      "Quote.currentMonthlyPayment",
                      values.currentMonthlyPayment
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
                      <h3>{i18n.t("FinallyTellUsWhatYouCurrentlyPay")}</h3>
                      <label>
                        {i18n.t("HowMuchDoYouCurrentlySpendPerMonth")}
                      </label>
                      <div className="form__group--inline horizontal">
                        <div
                          className="currencylabel"
                          style={{ flex: "0 0 8%" }}
                        >
                          {this.props.journey.currency}
                        </div>
                        <input
                          type="text"
                          name="currentMonthlyPayment"
                          style={{
                            flex: "0 0 50%",
                            margin: "0",
                          }}
                          onChange={handleChange}
                          value={values.currentMonthlyPayment}
                          onBlur={handleBlur}
                        />
                      </div>{" "}
                      <div className="FormError">
                        {errors.currentMonthlyPayment &&
                          touched.currentMonthlyPayment &&
                          errors.currentMonthlyPayment}
                      </div>
                      <br />
                      <div className="submitWrapper">
                        <button type="submit" disabled={isSubmitting}>
                          {i18n.t("Continue")}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentChecker;
