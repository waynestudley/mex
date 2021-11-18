import React from "react";
import { Formik } from "formik";
import { getStorage, setStorage } from "../../utils/storage";
import i18n from "../../i18n";

import "../../scss/components/moneyguru/CreditCardResults.scss";

class CreditCardResults extends React.Component {
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  convertToStorage = (value) => {
    //console.log("convertToStorage", value);
    if (value === "on" || value === true) {
      return true;
    } else if (Array.isArray(value) && value[0] === "on") {
      return true;
    } else {
      return false;
    }
  };

  convertFromStorage = (value) => {
    //console.log("convertFromStorage", value);
    if (value === true || value === "true") {
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <div className="CreditCardResults CreditCardFormComponents">
        <h3>{i18n.t("GetResults")}</h3>
        <p>{i18n.t("CCResultsLine1")}</p>
        <p>{i18n.t("CCResultsLine2")}</p>

        <Formik
          initialValues={{
            emailCheck: this.convertFromStorage(
              getStorage("CreditCard.emailCheck")
            ),
            smsCheck: this.convertFromStorage(
              getStorage("CreditCard.smsCheck")
            ),
            phoneCheck: this.convertFromStorage(
              getStorage("CreditCard.phoneCheck")
            ),
            termsCheck: this.convertFromStorage(
              getStorage("CreditCard.termsCheck")
            ),
          }}
          validate={(values) => {
            const errors = {};
            //if (values.termsCheck !== true) {
              //errors.termsCheck = i18n.t("Required");
            //}
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setStorage(
              "CreditCard.emailCheck",
              this.convertToStorage(values.emailCheck)
            );
            setStorage(
              "CreditCard.smsCheck",
              this.convertToStorage(values.smsCheck)
            );
            setStorage(
              "CreditCard.phoneCheck",
              this.convertToStorage(values.phoneCheck)
            );
            setStorage(
              "CreditCard.termsCheck",
              this.convertToStorage(values.termsCheck)
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
              <p>{i18n.t("CCResultsLine3")}</p>
              <input
                type="checkbox"
                name="emailCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.emailCheck}
              />
              <label htmlFor="emailCheck">{i18n.t("Email")}</label>
              <div className="Form--error">
                {errors.emailCheck && touched.emailCheck && errors.emailCheck}
              </div>

              <input
                type="checkbox"
                name="smsCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.smsCheck}
              />
              <label htmlFor="smsCheck">{i18n.t("Sms")}</label>
              <div className="Form--error">
                {errors.smsCheck && touched.smsCheck && errors.smsCheck}
              </div>

              <input
                type="checkbox"
                name="phoneCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.phoneCheck}
              />
              <label htmlFor="phoneCheck">{i18n.t("Phone")}</label>
              <div className="Form--error">
                {errors.phoneCheck && touched.phoneCheck && errors.phoneCheck}
              </div>
{/*
              <p>{i18n.t("CCResultsLine4")}</p>

              <input
                type="checkbox"
                name="termsCheck"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.termsCheck}
              />
              <label htmlFor="termsCheck">{i18n.t("CCResultsTerms")}</label>
              <div className="Form--error">
                {errors.termsCheck && touched.termsCheck && errors.termsCheck}
              </div>
 */}
              <button type="submit" disabled={isSubmitting}>
                {i18n.t("Submit")}
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default CreditCardResults;
