import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { getStorage, setStorage, setAxiosHeaders } from "../../utils/storage";
import i18n from "../../i18n";

import "../../scss/components/moneyguru/CreditCardAddress.scss";

class CreditCardAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { additionalAddresses: 0 };
    this.apiUrl = this.props.journey.api;
  }

  checkForNull = (value) => {
    if (value === null || value === "null") {
      return "";
    } else {
      return value;
    }
  };

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  findAddress1 = (e) => {
    if (
      /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]{0,1}\s*\d{0,1}[A-Za-z]{2}_{0,2}$/i.test(
        getStorage("CreditCard.a1postcode")
      )
    ) {
      e.preventDefault();
      setAxiosHeaders();
      axios
        .get(
          this.apiUrl +
            "Address/PostcodeLookup?postcode=" +
            getStorage("CreditCard.a1postcode")
        )
        .then((response) => {
          this.setState({ postcodeList1: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  findAddress2 = (e) => {
    if (
      /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]{0,1}\s*\d{0,1}[A-Za-z]{2}_{0,2}$/i.test(
        getStorage("CreditCard.a2postcode")
      )
    ) {
      e.preventDefault();
      setAxiosHeaders();
      axios
        .get(
          this.apiUrl +
            "Address/PostcodeLookup?postcode=" +
            getStorage("CreditCard.a2postcode")
        )
        .then((response) => {
          this.setState({ postcodeList2: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  findAddress3 = (e) => {
    if (
      /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]{0,1}\s*\d{0,1}[A-Za-z]{2}_{0,2}$/i.test(
        getStorage("CreditCard.a3postcode")
      )
    ) {
      e.preventDefault();
      setAxiosHeaders();
      axios
        .get(
          this.apiUrl +
            "Address/PostcodeLookup?postcode=" +
            getStorage("CreditCard.a3postcode")
        )
        .then((response) => {
          this.setState({ postcodeList3: response.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  selectAddress1(id) {
    let firstLine;
    if (id.buildingNumberField !== null) {
      firstLine = id.buildingNumberField;
    } else {
      firstLine = id.buildingNameField;
    }
    this.setState({
      postcodeList1: null,
      fullAddress1: firstLine + " " + id.thoroughfareNameField,
    });
    setStorage("CreditCard.a1address1Field", id.address1Field);
    setStorage("CreditCard.a1address2Field", id.address2Field);
    setStorage(
      "CreditCard.a1buildingNameField",
      this.checkForNull(id.buildingNameField)
    );
    setStorage(
      "CreditCard.a1buildingNumberField",
      this.checkForNull(id.buildingNumberField)
    );
    setStorage("CreditCard.a1thoroughfareNameField", id.thoroughfareNameField);
    setStorage("CreditCard.a1postcode", id.postcodeField);
    setStorage("CreditCard.a1town", id.townField);
    setStorage("CreditCard.a1county", id.countyField);
  }

  selectAddress2(id) {
    let firstLine;
    if (id.buildingNumberField !== null) {
      firstLine = id.buildingNumberField;
    } else {
      firstLine = id.buildingNameField;
    }
    this.setState({
      postcodeList2: null,
      fullAddress2: firstLine + " " + id.thoroughfareNameField,
    });
    setStorage("CreditCard.a2address1Field", id.address1Field);
    setStorage("CreditCard.a2address2Field", id.address2Field);
    setStorage(
      "CreditCard.a2buildingNameField",
      this.checkForNull(id.buildingNameField)
    );
    setStorage(
      "CreditCard.a2buildingNumberField",
      this.checkForNull(id.buildingNumberField)
    );
    setStorage("CreditCard.a2thoroughfareNameField", id.thoroughfareNameField);
    setStorage("CreditCard.a2postcode", id.postcodeField);
    setStorage("CreditCard.a2town", id.townField);
    setStorage("CreditCard.a2county", id.countyField);
  }

  selectAddress3(id) {
    let firstLine;
    if (id.buildingNumberField !== null) {
      firstLine = id.buildingNumberField;
    } else {
      firstLine = id.buildingNameField;
    }
    this.setState({
      postcodeList3: null,
      fullAddress3: firstLine + " " + id.thoroughfareNameField,
    });
    setStorage("CreditCard.a3address1Field", id.address1Field);
    setStorage("CreditCard.a3address2Field", id.address2Field);
    setStorage(
      "CreditCard.a3buildingNameField",
      this.checkForNull(id.buildingNameField)
    );
    setStorage(
      "CreditCard.a3buildingNumberField",
      this.checkForNull(id.buildingNumberField)
    );
    setStorage("CreditCard.a3thoroughfareNameField", id.thoroughfareNameField);
    setStorage("CreditCard.a3postcode", id.postcodeField);
    setStorage("CreditCard.a3town", id.townField);
    setStorage("CreditCard.a3county", id.countyField);
  }

  render() {
    return (
      <div className="CreditCardAddress CreditCardFormComponents">
        <h3>{i18n.t("YourAddress")}</h3>
        <Formik
          initialValues={{
            ccresidentialstatus:
              getStorage("CreditCard.residentialStatus") || "",
            cchousenumber1: getStorage("CreditCard.a1houseNumber") || "",
            ccpostcode1: getStorage("CreditCard.a1postcode") || "",
            ccyears1: getStorage("CreditCard.a1years") || "",
            cchousenumber2: getStorage("CreditCard.a2houseNumber") || "",
            ccpostcode2: getStorage("CreditCard.a2postcode") || "",
            ccyears2: getStorage("CreditCard.a2years") || "",
            cchousenumber3: getStorage("CreditCard.a3houseNumber") || "",
            ccpostcode3: getStorage("CreditCard.a3postcode") || "",
            ccyears3: getStorage("CreditCard.a3years") || "",
          }}
          validate={(values) => {
            const errors = {};

            // 3 x postcode checkers
            if (
              values.ccpostcode1 &&
              /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]{0,1}\s*\d{0,1}[A-Za-z]{2}_{0,2}$/i.test(
                values.ccpostcode1
              )
            ) {
              setStorage("CreditCard.a1postcode", values.ccpostcode1);
            } else {
              errors.ccpostcode1 = i18n.t("InvalidUKPostcode");
            }

            if (
              values.ccpostcode2 &&
              /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]{0,1}\s*\d{0,1}[A-Za-z]{2}_{0,2}$/i.test(
                values.ccpostcode2
              )
            ) {
              setStorage("CreditCard.a2postcode", values.ccpostcode2);
            } else if (values.ccpostcode2) {
              errors.ccpostcode2 = i18n.t("InvalidUKPostcode");
            }

            if (
              values.ccpostcode3 &&
              /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]{0,1}\s*\d{0,1}[A-Za-z]{2}_{0,2}$/i.test(
                values.ccpostcode3
              )
            ) {
              setStorage("CreditCard.a3postcode", values.ccpostcode3);
            } else if (values.ccpostcode3) {
              errors.ccpostcode3 = i18n.t("InvalidUKPostcode");
            }

            // Check years at address(es)
            if (values.ccyears1 > 2) {
              this.setState({ additionalAddresses: 0 });
            }
            if (
              values.ccyears1 < 3 &&
              this.state.fullAddress1 &&
              !this.state.fullAddress2
            ) {
              this.setState({ additionalAddresses: 1 });
              errors.ccyears1 = i18n.t("Weneed3yearsworthofaddresses");
            }
            if (
              values.ccyears1 + values.ccyears2 < 3 &&
              this.state.fullAddress1 &&
              this.state.fullAddress2 &&
              !this.state.fullAddress3
            ) {
              this.setState({ additionalAddresses: 2 });
              errors.ccyears2 = i18n.t("Weneed3yearsworthofaddresses");
            }

            //Check an address has been selected
            if (!this.state.fullAddress1) {
              errors.cchousenumber1 =
                "Please select an address using the 'Find Address' button below";
            }

            if (
              !this.state.fullAddress2 &&
              values.ccpostcode2 &&
              this.state.additionalAddresses > 0
            ) {
              errors.cchousenumber2 =
                "Please select an address using the 'Find Address' button below";
            }

            if (
              !this.state.fullAddress3 &&
              values.ccpostcode3 &&
              this.state.additionalAddresses === 2
            ) {
              errors.cchousenumber3 =
                "Please select an address using the 'Find Address' button below";
            }

            // CHECK FOR DUPLICATES IN ADDRESS FIELDS
            if (
              this.state.fullAddress1 &&
              this.state.fullAddress1 === this.state.fullAddress2
            ) {
              errors.cchousenumber2 = "Addresses cannot be the same";
            }

            if (
              this.state.fullAddress1 &&
              this.state.fullAddress1 === this.state.fullAddress3
            ) {
              errors.cchousenumber3 = "Addresses cannot be the same";
            }

            if (
              this.state.fullAddress2 &&
              this.state.fullAddress2 === this.state.fullAddress3
            ) {
              errors.cchousenumber3 = "Addresses cannot be the same";
            }

            if (values.ccresidentialstatus < 0) {
              errors.ccresidentialstatus =
                "Please enter your residential status";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setStorage(
              "CreditCard.residentialStatus",
              values.ccresidentialstatus
            );
            setStorage("CreditCard.a1years", values.ccyears1);
            setStorage("CreditCard.a2years", values.ccyears2);
            setStorage("CreditCard.a3years", values.ccyears3);

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
              <label htmlFor="ccresidentialstatus">residential status</label>
              <select
                name="ccresidentialstatus"
                value={values.ccresidentialstatus}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="-1">{i18n.t("PleaseSelect")}</option>
                <option value="1">Homeowner - with Mortgage</option>
                <option value="10">Homeowner - no Mortgage</option>
                <option value="2">Private Tenant</option>
                <option value="9">Council Tenant</option>
                <option value="6">Living with Parents</option>
              </select>
              <div className="Form--error">
                {errors.ccresidentialstatus &&
                  touched.ccresidentialstatus &&
                  errors.ccresidentialstatus}
              </div>
              <br />
              <label htmlFor="ccpostcode1">What's your postcode?</label>
              <input
                type="text"
                name="ccpostcode1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ccpostcode1}
              />

              {this.state.fullAddress1 && (
                <input
                  type="text"
                  name="cchousenumber1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={this.state.fullAddress1}
                />
              )}
              <div className="Form--error">
                {errors.ccpostcode1 &&
                  touched.ccpostcode1 &&
                  errors.ccpostcode1}
              </div>
              <div className="Form--error">
                {errors.cchousenumber1 &&
                  touched.cchousenumber1 &&
                  errors.cchousenumber1}
              </div>

              <div className={"AddressWrapper raised-bordered"}>
                {this.state.postcodeList1 &&
                  this.state.postcodeList1.map((address) => (
                    <p
                      key={address.Id}
                      onClick={() => this.selectAddress1(address)}
                      className={`lookup_data}`}
                    >
                      {address.buildingNameField
                        ? address.buildingNameField +
                          " " +
                          address.thoroughfareNameField
                        : address.buildingNumberField +
                          " " +
                          address.thoroughfareNameField}
                    </p>
                  ))}
              </div>

              <button onClick={this.findAddress1} disabled={isSubmitting}>
                Find Address
              </button>

              <label htmlFor="ccyears1">Years at your address</label>
              <select
                name="ccyears1"
                value={values.ccyears1}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">{i18n.t("PleaseSelect")}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <div className="Form--error">
                {errors.ccyears1 && touched.ccyears1 && errors.ccyears1}
              </div>

              {/* Address 2 */}
              {this.state.additionalAddresses > 0 && (
                <>
                  <h3>Address 2</h3>

                  <label htmlFor="ccpostcode2">What's your postcode?</label>
                  <input
                    type="text"
                    name="ccpostcode2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ccpostcode2}
                  />
                  <div className="Form--error">
                    {errors.ccpostcode2 &&
                      touched.ccpostcode2 &&
                      errors.ccpostcode2}
                  </div>
                  <div className="Form--error">
                    {errors.cchousenumber2 &&
                      touched.cchousenumber2 &&
                      errors.cchousenumber2}
                  </div>

                  {this.state.fullAddress2 && (
                    <input
                      type="text"
                      name="cchousenumber2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={this.state.fullAddress2}
                    />
                  )}

                  <div className={"AddressWrapper raised-bordered"}>
                    {this.state.postcodeList2 &&
                      this.state.postcodeList2.map((address) => (
                        <p
                          key={address.Id}
                          onClick={() => this.selectAddress2(address)}
                          className={`lookup_data}`}
                        >
                          {address.buildingNameField
                            ? address.buildingNameField +
                              " " +
                              address.thoroughfareNameField
                            : address.buildingNumberField +
                              " " +
                              address.thoroughfareNameField}
                        </p>
                      ))}
                  </div>

                  <button onClick={this.findAddress2} disabled={isSubmitting}>
                    Find Address
                  </button>

                  <label htmlFor="ccyears2">Years at your address</label>
                  <select
                    name="ccyears2"
                    value={values.ccyears2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">{i18n.t("PleaseSelect")}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  <div className="Form--error">
                    {errors.ccyears2 && touched.ccyears2 && errors.ccyears2}
                  </div>
                </>
              )}

              {/* Address 3 */}
              {this.state.additionalAddresses === 2 && (
                <>
                  <h3>Address 3</h3>

                  <label htmlFor="ccpostcode3">What's your postcode?</label>
                  <input
                    type="text"
                    name="ccpostcode3"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ccpostcode3}
                  />
                  <div className="Form--error">
                    {errors.ccpostcode3 &&
                      touched.ccpostcode3 &&
                      errors.ccpostcode3}
                  </div>
                  <div className="Form--error">
                    {errors.cchousenumber3 &&
                      touched.cchousenumber3 &&
                      errors.cchousenumber3}
                  </div>

                  {this.state.fullAddress3 && (
                    <input
                      type="text"
                      name="cchousenumber3"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={this.state.fullAddress3}
                    />
                  )}

                  <div className={"AddressWrapper raised-bordered"}>
                    {this.state.postcodeList3 &&
                      this.state.postcodeList3.map((address) => (
                        <p
                          key={address.Id}
                          onClick={() => this.selectAddress3(address)}
                          className={`lookup_data}`}
                        >
                          {address.buildingNameField
                            ? address.buildingNameField +
                              " " +
                              address.thoroughfareNameField
                            : address.buildingNumberField +
                              " " +
                              address.thoroughfareNameField}
                        </p>
                      ))}
                  </div>

                  <button onClick={this.findAddress3} disabled={isSubmitting}>
                    Find Address
                  </button>

                  <label htmlFor="ccyears3">Years at your address</label>
                  <select
                    name="ccyears3"
                    value={values.ccyears3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">{i18n.t("PleaseSelect")}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  <div className="Form--error">
                    {errors.ccyears3 && touched.ccyears3 && errors.ccyears3}
                  </div>
                </>
              )}

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

export default CreditCardAddress;
