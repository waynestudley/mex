import React from "react";
import { Formik } from "formik";
import i18n from "../../i18n";
import { getStorage, setStorage } from "../../utils/storage";

import "../../scss/components/moneyguru/CreditCardDetails.scss";

class CreditCardDetails extends React.Component {
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };
  isValidDate = (dateString) => {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
    // Parse the date parts to integers
    let parts = dateString.split("/");
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;
    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
      monthLength[1] = 29;
    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };
  isValidaEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  render() {
    return (
      <div className="CreditCardDetails CreditCardFormComponents">
        <h3>{i18n.t("YourDetails")}</h3>

        <Formik
          initialValues={{
            ccTitle: getStorage("CreditCard.title") || "",
            ccFirstName: getStorage("CreditCard.firstName") || "",
            ccLastName: getStorage("CreditCard.lastName") || "",
            ccDob: getStorage("CreditCard.dob") || "",
            ccMaritalStatus: getStorage("CreditCard.maritalStatus") || 0,
            ccDependants: getStorage("CreditCard.dependants") || 0,
            ccEmail: getStorage("CreditCard.email") || "",
            ccPhone: getStorage("CreditCard.phone") || "",
            ccPassword: getStorage("CreditCard.password") || "",
          }}
          validate={(values) => {
            const errors = {};

            if (values.ccTitle === "") {
              errors.ccTitle = i18n.t("Required");
            }
            if (values.ccFirstName === "") {
              errors.ccFirstName = i18n.t("Required");
            }
            if (values.ccLastName === "") {
              errors.ccLastName = i18n.t("Required");
            }
            if (values.ccDob === "") {
              errors.ccDob = i18n.t("Required");
            } else if (!this.isValidDate(values.ccDob)) {
              errors.ccDob = i18n.t("InvalidDate");
            }
            if (values.maritalStatus === "") {
              errors.maritalStatus = i18n.t("Required");
            }
            if (values.dependants === "") {
              errors.dependants = i18n.t("Required");
            }
            if (values.ccEmail === "") {
              errors.ccEmail = i18n.t("Required");
            } else if (!this.isValidaEmail(values.ccEmail)) {
              errors.ccEmail = i18n.t("InvalidEmail");
            }
            if (
              values.ccPhone !== "" &&
              !/^(?:0)(?!4|0)[0-9\\s.\\/-]{10}$/i.test(values.ccPhone)
            ) {
              errors.ccPhone = i18n.t("InvalidPhone");
            }
            //if (values.ccPassword === "") {
            //  errors.ccPassword = i18n.t("Required");
            //}
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            setStorage("CreditCard.title", values.ccTitle);
            setStorage("CreditCard.firstName", values.ccFirstName);
            setStorage("CreditCard.lastName", values.ccLastName);
            setStorage("CreditCard.dob", values.ccDob);
            setStorage("CreditCard.maritalStatus", values.ccMaritalStatus);
            setStorage("CreditCard.dependants", values.ccDependants);
            setStorage("CreditCard.email", values.ccEmail);
            setStorage("CreditCard.phone", values.ccPhone);
            setStorage("CreditCard.password", values.ccPassword);

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
              <label htmlFor="ccTitle">{i18n.t("Title")}</label>
              <select
                name="ccTitle"
                value={values.ccTitle}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">{i18n.t("PleaseSelect")}</option>
                <option value="mr">Mr</option>
                <option value="mrs">Mrs</option>
                <option value="ms">Ms</option>
                <option value="miss">Miss</option>
              </select>
              <div className="Form--error">
                {errors.ccTitle && touched.ccTitle && errors.ccTitle}
              </div>

              <label htmlFor="ccFirstName">{i18n.t("FirstName")}</label>
              <input
                type="text"
                name="ccFirstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccFirstName}
              />
              <div className="Form--error">
                {errors.ccFirstName &&
                  touched.ccFirstName &&
                  errors.ccFirstName}
              </div>

              <label htmlFor="ccLastName">{i18n.t("LastName")}</label>
              <input
                type="text"
                name="ccLastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccLastName}
              />
              <div className="Form--error">
                {errors.ccLastName && touched.ccLastName && errors.ccLastName}
              </div>

              <label htmlFor="ccDob">{i18n.t("DateofBirth")}</label>
              <input
                type="text"
                name="ccDob"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccDob}
                placeholder="dd/mm/yyyy"
              />
              <div className="Form--error">
                {errors.ccDob && touched.ccDob && errors.ccDob}
              </div>

              <label htmlFor="ccMaritalStatus">{i18n.t("MaritalStatus")}</label>
              <select
                name="ccMaritalStatus"
                value={values.ccMaritalStatus}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">{i18n.t("PleaseSelect")}</option>
                <option value="1">Married/Civil Partnership</option>
                <option value="2">Living with Partner</option>
                <option value="3">Single</option>
                <option value="4">Separated</option>
                <option value="5">Divorced</option>
                <option value="6">Widowed</option>
              </select>
              <div className="Form--error">
                {errors.ccMaritalStatus &&
                  touched.ccMaritalStatus &&
                  errors.ccMaritalStatus}
              </div>

              <label htmlFor="ccDependants">{i18n.t("Dependants")}</label>
              <select
                name="ccDependants"
                value={values.ccDependants}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">{i18n.t("PleaseSelect")}</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10+</option>
              </select>
              <div className="Form--error">
                {errors.ccDependants &&
                  touched.ccDependants &&
                  errors.ccDependants}
              </div>

              <label htmlFor="ccEmail">{i18n.t("Email")}</label>
              <input
                type="text"
                name="ccEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccEmail}
              />
              <div className="Form--error">
                {errors.ccEmail && touched.ccEmail && errors.ccEmail}
              </div>

              <label htmlFor="ccPhone">{i18n.t("MobilePhone")}</label>
              <input
                type="text"
                name="ccPhone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccPhone}
              />
              <div className="Form--error">
                {errors.ccPhone && touched.ccPhone && errors.ccPhone}
              </div>
{/*
              <label htmlFor="ccPassword">{i18n.t("Password")}</label>
              <input
                type="text"
                name="ccPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccPassword}
              />
              <div className="Form--error">
                {errors.ccPassword && touched.ccPassword && errors.ccPassword}
              </div>
*/}
              <button type="submit" disabled={isSubmitting}>
                {i18n.t("Next step")}
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default CreditCardDetails;
