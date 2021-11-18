import React from "react";
import axios from "axios";
import { Formik, Field } from "formik";
import i18n from "../../i18n";
import { getStorage, setStorage, setAxiosHeaders } from "../../utils/storage";
import LoadingSpinner from "../ui/LoadingSpinner";

import "../../scss/components/broadband/AvailabilityChecker.scss";

class AvailabilityChecker extends React.Component {
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
      .get(
        this.props.journey.api +
          "Media/GetProviderList?countryId=" +
          this.props.journey.countryId
      )
      .then((response) => {
        this.setState({ providerList: response.data });
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
      <div className="AvailabilityChecker BBFormComponents">
        <div className="Panel">
          <div className="Module__primary">
            {this.state.providerList === null && <LoadingSpinner />}
            {this.state.providerList !== null && (
              <>
                <Formik
                  initialValues={{
                    provider: getStorage("Quote.currentProviderId") || "",
                    hasAerial: getStorage("Quote.hasAerial") || "",
                    hasVirgin: getStorage("Quote.hasVirgin") || "",
                    years: getStorage("Quote.yearsWithProvider") || "0",
                    months: getStorage("Quote.monthsWithProvider") || "0",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (
                      !values.provider ||
                      values.provider === i18n.t("PleaseSelect")
                    ) {
                      errors.provider = i18n.t("Required");
                    }
                    if (!values.hasAerial || values.hasAerial === "") {
                      errors.hasAerial = i18n.t("Required");
                    }
                    if (!values.hasVirgin || values.hasVirgin === "") {
                      errors.hasVirgin = i18n.t("Required");
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setStorage("Quote.currentProviderId", values.provider);
                    setStorage("Quote.hasAerial", values.hasAerial);
                    setStorage("Quote.hasVirgin", values.hasVirgin);
                    setStorage("Quote.yearsWithProvider", values.years);
                    setStorage("Quote.monthsWithProvider", values.months);
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
                      <h4>{i18n.t("WhoIsYourCurrentProvider?")}</h4>
                      <select
                        name="provider"
                        value={values.provider}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option>{i18n.t("PleaseSelect")}</option>
                        <option value={-1}>
                          {i18n.t("IDontHaveBroadband")}
                        </option>
                        {this.state.providerList !== null &&
                          this.state.providerList.map((item, i) => (
                            <option key={"key" + i} value={item.Id}>
                              {item.ProviderName}
                            </option>
                          ))}
                      </select>
                      <div className="FormError">
                        {errors.provider && touched.provider && errors.provider}
                      </div>
                      <br />
                      {/*!(
                        values.provider === "-1" ||
                        values.provider === "Please select"
                      ) && (
                        <>
                          <h4>
                            {i18n.t("HowLongHaveYouBeenWithThisProvider?")}
                          </h4>
                          <div className="form__group--inline">
                            <label htmlFor="years">{i18n.t("years")}</label>
                            <input
                              type="text"
                              name="years"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.years}
                            />
                          </div>
                          {errors.years && touched.years && errors.years}

                          <div className="form__group--inline">
                            <label htmlFor="months">{i18n.t("months")}</label>
                            <input
                              type="text"
                              name="months"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.months}
                            />
                          </div>
                          {errors.months && touched.months && errors.months}
                        </>
                      )*/}
                      <br />
                      <Field component="div" name="myRadioGroup">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <label style={{ minWidth: "50%" }}>
                            {i18n.t("DoYouHaveAnAerial?")}
                          </label>
                          <div className="form__group">
                            <div className="form__radio__item">
                              <input
                                type="radio"
                                id="hasAerial1"
                                defaultChecked={values.hasAerial === "Yes"}
                                name="hasAerial"
                                value="Yes"
                              />
                              <label htmlFor="hasAerial1">
                                {i18n.t("Yes")}
                              </label>
                            </div>
                            <div className="form__radio__item">
                              <input
                                type="radio"
                                id="hasAerial2"
                                defaultChecked={values.hasAerial === "No"}
                                name="hasAerial"
                                value="No"
                              />
                              <label htmlFor="hasAerial2">{i18n.t("No")}</label>{" "}
                            </div>
                          </div>
                        </div>
                        <div className="FormError">
                          {errors.hasAerial && errors.hasAerial}
                        </div>
                      </Field>
                      <br />
                      <Field component="div" name="myRadioGroup">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <label style={{ minWidth: "50%" }}>
                            {i18n.t("CanYouHaveVirginMedia?")}
                          </label>
                          <div className="form__group">
                            <div className="form__radio__item">
                              <input
                                type="radio"
                                id="hasVirgin1"
                                defaultChecked={values.hasVirgin === "Yes"}
                                name="hasVirgin"
                                value="Yes"
                              />
                              <label htmlFor="hasVirgin1">
                                {i18n.t("Yes")}
                              </label>
                            </div>
                            <div className="form__radio__item">
                              <input
                                type="radio"
                                id="hasVirgin2"
                                defaultChecked={values.hasVirgin === "No"}
                                name="hasVirgin"
                                value="No"
                              />
                              <label htmlFor="hasVirgin2">{i18n.t("No")}</label>
                            </div>
                          </div>
                        </div>
                        <div className="FormError">
                          {errors.hasVirgin && errors.hasVirgin}
                        </div>
                      </Field>

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

export default AvailabilityChecker;
