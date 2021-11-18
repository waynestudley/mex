import React from "react";
import { Formik } from "formik";
import i18n from "../../i18n";
import {
  getStorage,
  setStorage,
} from "../../utils/storage";

import "../../scss/components/moneyguru/CreditCardType.scss";

class CreditCardType extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "" };
  }

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  render() {

    return (
      <div className="CreditCardType CreditCardFormComponents">
        <div className="Panel">
          <h1>{i18n.t("CCTypeLine1")}</h1>
          <ul>
            <li>&nbsp;&nbsp;{i18n.t("CCTypeLine2")}</li>
            <li>&nbsp;&nbsp;{i18n.t("CCTypeLine3")}</li>
            <li>&nbsp;&nbsp;{i18n.t("CCTypeLine4")}</li>
          </ul>
        </div>
        <h4>{i18n.t("CCTypeLine5")}</h4>
        <Formik
          initialValues={{
            cctype: getStorage("CreditCard.type") || "",
          }}
          validate={(values) => {
            const errors = {};

            if (values.cctype === "") {
              errors.cctype = "Please select a credit card type";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            setStorage("CreditCard.type", values.cctype);
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
              {this.state.errorMessage && <h4>{this.state.errorMessage}</h4>}

              <label htmlFor="cctype">{i18n.t("CardType")}</label>
              <select
                name="cctype"
                value={values.cctype}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">{i18n.t("PleaseSelect")}</option>
                <option value="all">Any</option>
                <option value="balance">0% on balance transfers</option>
                <option value="purchases">0% purchases</option>
                <option value="rewards">Rewards</option>
                <option value="credit-builder">Credit builder</option>
                <option value="premium">Gold &amp; premium</option>
                <option value="travel">Travel</option>
                <option value="air-miles">Air miles</option>
                <option value="low-rate">Low rate</option>
                <option value="cashback">Cashback</option>
                <option value="popular-cards">Popular</option>
              </select>
              <div className="Form--error">
                {errors.cctype && touched.cctype && errors.cctype}
              </div>

              <button type="submit" disabled={isSubmitting}>
                {i18n.t("NextStep")}
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default CreditCardType;
