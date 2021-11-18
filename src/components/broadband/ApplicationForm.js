import React from "react";
import axios from "axios";
import { Formik } from "formik";
import i18n from "../../i18n";
import { getStorage, setStorage, setAxiosHeaders } from "../../utils/storage";

import SignatureCanvas from "react-signature-canvas";

import ddMandate from "../../images/dd-logo.svg";
import sslSecure from "../../images/ssl-icon.svg";

import "../../scss/components/broadband/ApplicationForm.scss";

class ApplicationForm extends React.Component {
  constructor() {
    super();
    this.sigPad = {};

    let provider = getStorage("Quote.SelectedPackageProviderName");

    if (provider === "Virgin Media" || provider === "BT") {
      this.state = {
        showDirectDebit: false,
      };
    } else {
      this.state = {
        showDirectDebit: true,
      };
    }
  }

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  clearSig = () => {
    this.sigPad.clear();
  };

  getSig = () => {
    return this.sigPad.getTrimmedCanvas().toDataURL("image/png");
  };

  trySubmit = (values, setSubmitting) => {
    let postData = {};
    setAxiosHeaders();

    if (this.state.showDirectDebit === true) {
      postData = {
        Title: getStorage("Quote.title"),
        Firstname: getStorage("Quote.firstName"),
        Surname: getStorage("Quote.lastName"),
        Address1: getStorage("Quote.address1"),
        Address2: getStorage("Quote.address2"),
        Email: getStorage("Quote.email"),
        Town: getStorage("Quote.town"),
        County: getStorage("Quote.county"),
        Postcode: getStorage("Quote.postcode"),
        HomePhone: getStorage("Quote.phone"),
        SalesAgentId: getStorage("Login.SalesAgentId"),
        CallcentreId: getStorage("Login.CallCentreId"),
        MediaPackageId: getStorage("Quote.SelectedPackageId"),
        SignatureImage: getStorage("Quote.signatureImage"),
        Source: "QC",
        BankAccountHolderName: values.accountName,
        BankSortCode: values.sortcode,
        BankAccountNum: values.accountNumber,
      };
      axios
        .post(
          this.props.journey.api +
            "Validation/ValidateBankAccount?AllowTest=true&accountNumber=" +
            values.accountNumber.toString() +
            "&accountSortCode=" +
            values.sortcode.toString()
        )
        .then((response) => {
          if (response.data.Result === "True") {
            axios
              .post(
                this.props.journey.api + "Media/SubmitApplication",
                postData
              )
              .then((response) => {
                setStorage("Quote.LeadLogId", response.data.Result);
                this.goNextRoute();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
        });
    } else {
      postData = {
        Title: getStorage("Quote.title"),
        Firstname: getStorage("Quote.firstName"),
        Surname: getStorage("Quote.lastName"),
        Address1: getStorage("Quote.address1"),
        Address2: getStorage("Quote.address2"),
        Email: getStorage("Quote.email"),
        Town: getStorage("Quote.town"),
        County: getStorage("Quote.county"),
        Postcode: getStorage("Quote.postcode"),
        HomePhone: getStorage("Quote.phone"),
        SalesAgentId: getStorage("Login.SalesAgentId"),
        CallcentreId: getStorage("Login.CallCentreId"),
        MediaPackageId: getStorage("Quote.SelectedPackageId"),
        SignatureImage: getStorage("Quote.signatureImage"),
        Source: "QC",
      };

      axios
        .post(this.props.journey.api + "Media/SubmitApplication", postData)
        .then((response) => {
          setStorage("Quote.LeadLogId", response.data.Result);
          this.goNextRoute();
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
        });
    }
  };

  render() {
    return (
      <div className="ApplicationForm BBFormComponents">
        <div className="Panel">
          <h3>{i18n.t("YourDetails")}</h3>
          <Formik
            initialValues={{
              title: getStorage("Quote.title") || "",
              firstName: getStorage("Quote.firstName") || "",
              lastName: getStorage("Quote.lastName") || "",
              address: getStorage("Quote.address1") || "",
              postcode: getStorage("Quote.postcode") || "",
              phone: getStorage("Quote.phone") || "",
              email: getStorage("Quote.email") || "",
              accountName: "",
              accountNumber: "",
              sortcode: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.title || values.title === "Please select") {
                errors.title = i18n.t("Required");
              }
              if (!values.firstName || values.firstName === "") {
                errors.firstName = i18n.t("Required");
              }
              if (!values.lastName || values.lastName === "") {
                errors.lastName = i18n.t("Required");
              }
              if (!values.email || values.email === "") {
                errors.email = i18n.t("Required");
              }
              if (
                values.phone.length < 10 ||
                (values.phone !== "" &&
                  !/^(?:0)(?!4|0)[0-9\\s.\\/-]{10}$/i.test(values.phone))
              ) {
                errors.phone = "You must supply a phone number";
              }
              if (String(this.getSig()).length === 114) {
                errors.sig = i18n.t("Required");
              }

              if (this.state.showDirectDebit === true) {
                if (!values.accountName || values.accountName === "") {
                  errors.accountName = i18n.t("Required");
                }
                if (!values.accountNumber || values.accountNumber === "") {
                  errors.accountNumber = i18n.t("Required");
                } else if (isNaN(values.accountNumber)) {
                  errors.accountNumber =
                    "You must supply a valid account number";
                }
                if (!values.sortcode || values.sortcode === "") {
                  errors.sortcode = i18n.t("Required");
                } else if (isNaN(values.sortcode)) {
                  errors.sortcode = "You must supply a sortcode";
                }
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setStorage("Quote.title", values.title);
              setStorage("Quote.firstName", values.firstName);
              setStorage("Quote.lastName", values.lastName);
              setStorage("Quote.address", values.address);
              setStorage("Quote.email", values.email);

              setStorage("Quote.postcode", values.postcode);
              setStorage("Quote.phone", values.phone);

              setStorage("Quote.signatureImage", this.getSig());
              setSubmitting(true);

              this.trySubmit(values, setSubmitting);
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
                <label htmlFor="title">{i18n.t("Title")}</label>
                <select
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                >
                  <option>{i18n.t("PleaseSelect")}</option>
                  <option value="Mr">{i18n.t("Mr")}</option>
                  <option value="Mrs">{i18n.t("Mrs")}</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">{i18n.t("Ms")}</option>
                  <option value="Doctor">{i18n.t("Doctor")}</option>
                  <option value="Professor">{i18n.t("Professor")}</option>
                  <option value="Reverend">{i18n.t("Reverend")}</option>
                  <option value="Father">Father</option>
                  <option value="Lord">Lord</option>
                </select>
                <div className="FormError">
                  {errors.title && touched.title && errors.title}
                </div>

                <label htmlFor="firstName">{i18n.t("FirstName")}</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                <div className="FormError">
                  {errors.firstName && touched.firstName && errors.firstName}
                </div>

                <label htmlFor="lastName">{i18n.t("LastName")}</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                <div className="FormError">
                  {errors.lastName && touched.lastName && errors.lastName}
                </div>

                <label htmlFor="address">{i18n.t("Address")}</label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  disabled={true}
                />
                <div className="FormError">
                  {errors.address && touched.address && errors.address}
                </div>

                <label htmlFor="postcode">{i18n.t("Postcode")}</label>
                <input
                  type="text"
                  name="postcode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.postcode}
                  disabled={true}
                />
                <div className="FormError">
                  {errors.postcode && touched.postcode && errors.postcode}
                </div>

                <label htmlFor="email">{i18n.t("Email")}</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <div className="FormError">
                  {errors.email && touched.email && errors.email}
                </div>

                <label htmlFor="phone">{i18n.t("Phone")}</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                <div className="FormError">
                  {errors.phone && touched.phone && errors.phone}
                </div>

                {this.state.showDirectDebit === true && (
                  <div className="ApplicationForm__bankDetails">
                    <div className="ApplicationForm__DDHeading">
                      <div className="ApplicationForm__supplierLogo">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/imagesPackage/" +
                            getStorage("Quote.SelectedPackageProviderLogo")
                          }
                          alt="Logo"
                        />
                      </div>
                      <p>
                        Instruction to your bank or
                        <br /> building&nbsp;society to pay by Direct Debit
                      </p>
                      <div className="ApplicationForm__ddlogo">
                        <img src={ddMandate} alt="Direct Debit logo" />
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="">
                          <label htmlFor="AccountName">
                            Name of account holder
                          </label>
                          <input
                            name="accountName"
                            type="text"
                            className="inspectletIgnore"
                            value={values.accountName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              borderColor:
                                errors.accountName &&
                                touched.accountName &&
                                "tomato",
                            }}
                          />
                          <div className="FormError">
                            {errors.accountName &&
                              touched.accountName &&
                              errors.accountName}
                          </div>
                        </div>
                        <div className="">
                          <label htmlFor="sortcode">Bank sort code</label>
                          <input
                            maxLength="6"
                            name="sortcode"
                            type="text"
                            className="account-number inspectletIgnore"
                            value={values.sortcode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              borderColor:
                                errors.sortcode && touched.sortcode && "tomato",
                            }}
                          />
                          <div className="FormError">
                            {errors.sortcode &&
                              touched.sortcode &&
                              errors.sortcode}
                          </div>
                        </div>
                        <div className="">
                          <label htmlFor="accountNumber">Account Number</label>
                          <input
                            maxLength="8"
                            name="accountNumber"
                            type="text"
                            className="account-number inspectletIgnore"
                            value={values.accountNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              borderColor:
                                errors.accountNumber &&
                                touched.accountNumber &&
                                "tomato",
                            }}
                          />
                          <div className="FormError">
                            {errors.accountNumber &&
                              touched.accountNumber &&
                              errors.accountNumber}
                          </div>
                        </div>

                        {this.state.valTest && (
                          <div className="FormError">
                            Account Number/Sortcode incorrect
                          </div>
                        )}
                      </div>
                      <div className="">
                        <div className="">
                          <div>
                            <p>
                              Enter your account details so{" "}
                              {getStorage("Quote.SelectedPackageProviderName")}{" "}
                              can set up your Direct Debit.
                              <br />
                              <strong>
                                {" "}
                                Money Expert will never take any money from your
                                account.
                              </strong>{" "}
                            </p>
                          </div>
                          <p>
                            You will pay{" "}
                            <strong>
                              {" "}
                              &pound;{getStorage("Quote.MonthlyCost")}
                            </strong>{" "}
                            monthly by Direct Debit to{" "}
                            <strong>
                              {getStorage("Quote.SelectedPackageProviderName")}
                            </strong>
                            .
                          </p>
                          <p>
                            <strong>
                              Instruction to your bank or building society
                            </strong>
                            <br />
                            Please pay{" "}
                            {getStorage(
                              "Quote.SelectedPackageProviderName"
                            )}{" "}
                            Direct Debits from the account detailed in this
                            instruction subject to the safeguards assured by the
                            Direct Debit Guarantee. I understand that this
                            instruction may remain with{" "}
                            {getStorage("Quote.SelectedPackageProviderName")}{" "}
                            and, if so, details will be passed electronically to
                            my bank/building society.
                          </p>
                        </div>
                      </div>

                      <div className="ApplicationForm__secureMessages">
                        <img src={sslSecure} alt="SSL Secure" />
                        <span>
                          <strong>Your data is safe with us</strong>
                          <br />
                          We use SSL provided by GeoTrust to transfer your
                          details safely and securely.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <h3>{i18n.t("YourAgreement")}</h3>
                <p>{i18n.t("AgreementTerms")}</p>
                <p>{i18n.t("PrivacyAgreement")}</p>
                <a href={window.location.href} rel="noopener noreferrer">
                  Quick-Compare's Privacy Policy.
                </a>
                <br />
                <a href={window.location.href}>
                  Quick Compare's Privacy Policy.
                </a>
                <br />
                <br />
                <label htmlFor="signature">{i18n.t("Signature")}</label>
                <div
                  style={{ border: "1px solid black", display: "inline-block" }}
                >
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{
                      width: 546,
                      height: 200,
                      className: "sig-canvas",
                    }}
                    ref={(ref) => {
                      this.sigPad = ref;
                    }}
                  />
                </div>
                <div className="FormError">{errors.sig && errors.sig}</div>
                <br />

                <button type="button" onClick={this.clearSig}>
                  {i18n.t("Clear")}
                </button>

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

export default ApplicationForm;
