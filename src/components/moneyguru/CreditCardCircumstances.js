import React from "react";
import { Formik } from "formik";
import { getStorage, setStorage } from "../../utils/storage";
import i18n from "../../i18n";

import "../../scss/components/moneyguru/CreditCardCircumstances.scss";

class CreditCardCircumstances extends React.Component {
  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };
  render() {
    return (
      <div className="CreditCardCircumstances CreditCardFormComponents">
        <h3>{i18n.t("YourCircumstances")}</h3>
        <Formik
          initialValues={{
            ccemploymentstatus: getStorage("CreditCard.employmentStatus") || "",
            ccannualincome: getStorage("CreditCard.annualIncome") || "",
            ccemployername: getStorage("CreditCard.employerName") || "",
            ccamonthlymortgagepayment:
              getStorage("CreditCard.monthlyMortgagePayment") || "",
            ccmonthlychildcarecost:
              getStorage("CreditCard.monthlyChildcareCost") || "",
          }}
          validate={(values) => {
            const errors = {};
            //console.log(values);
            if (values.ccemploymentstatus === "") {
              errors.ccemploymentstatus = i18n.t("Required");
            }
            if (values.ccemployername === "") {
              errors.ccemployername = i18n.t("Required");
            }
            if (values.ccannualincome === "") {
              errors.ccannualincome = i18n.t("Required");
            } else if (isNaN(values.ccannualincome)) {
              errors.ccannualincome = i18n.t("InvalidNumber");
            }
            if (values.ccamonthlymortgagepayment === "") {
              errors.ccamonthlymortgagepayment = i18n.t("Required");
            } else if (isNaN(values.ccamonthlymortgagepayment)) {
              errors.ccamonthlymortgagepayment = i18n.t("InvalidNumber");
            }
            if (values.ccmonthlychildcarecost === "") {
              errors.ccmonthlychildcarecost = i18n.t("Required");
            } else if (isNaN(values.ccmonthlychildcarecost)) {
              errors.ccmonthlychildcarecost = i18n.t("InvalidNumber");
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setStorage(
              "CreditCard.employmentStatus",
              values.ccemploymentstatus
            );
            setStorage("CreditCard.employerName", values.ccemployername);
            setStorage("CreditCard.annualIncome", values.ccannualincome);
            setStorage(
              "CreditCard.monthlyMortgagePayment",
              values.ccamonthlymortgagepayment
            );
            setStorage(
              "CreditCard.monthlyChildcareCost",
              values.ccmonthlychildcarecost
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
              <p>{i18n.t("Employment")}</p>
              <label htmlFor="cctype">{i18n.t("EmploymentStatus")}</label>
              <select
                name="ccemploymentstatus"
                value={values.ccemploymentstatus}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">{i18n.t("PleaseSelect")}</option>
                <option value="1">Full Time Employed</option>
                <option value="10">Part Time Employed</option>
                <option value="3">Self Employed</option>
                <option value="9">Homemaker</option>
                <option value="6">Retired</option>
                <option value="5">Student</option>
                <option value="8">Unemployed</option>
              </select>
              <div className="Form--error">
                {errors.ccemploymentstatus &&
                  touched.ccemploymentstatus &&
                  errors.ccemploymentstatus}
              </div>
              <label>{i18n.t("EmployerName")}</label>
              <input
                type="text"
                name="ccemployername"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccemployername}
              />
              <div className="Form--error">
                {errors.ccemployername &&
                  touched.ccemployername &&
                  errors.ccemployername}
              </div>
              <p>{i18n.t("IncomeAndExpenditure")}</p>
              <p>{i18n.t("CCCircumstancesLine1")}</p>
              <label>{i18n.t("AnnualIncome")}</label>
              <input
                type="text"
                name="ccannualincome"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccannualincome}
              />
              <div className="Form--error">
                {errors.ccannualincome &&
                  touched.ccannualincome &&
                  errors.ccannualincome}
              </div>
              <p>{i18n.t("CCCircumstancesLine1")}</p>
              <label>{i18n.t("MonthlyMortgagePayment")}</label>
              <input
                type="text"
                name="ccamonthlymortgagepayment"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccamonthlymortgagepayment}
              />
              <div className="Form--error">
                {errors.ccamonthlymortgagepayment &&
                  touched.ccamonthlymortgagepayment &&
                  errors.ccamonthlymortgagepayment}
              </div>
              <p>{i18n.t("CCCircumstancesLine3")}</p>
              <label>{i18n.t("MonthlyChildcareCost")}</label>
              <input
                type="text"
                name="ccmonthlychildcarecost"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccmonthlychildcarecost}
              />
              <div className="Form--error">
                {errors.ccmonthlychildcarecost &&
                  touched.ccmonthlychildcarecost &&
                  errors.ccmonthlychildcarecost}
              </div>
              <p>{i18n.t("CCCircumstancesLine4")}</p>
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

export default CreditCardCircumstances;
