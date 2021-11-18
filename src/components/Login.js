import React from "react";
import { Formik } from "formik";
import axios from "axios";
import i18n from "../i18n";
import {
  getStorage,
  setStorage,
  setAxiosHeaders,
  clearAllStorageKey,
} from "../utils/storage";
import LoginHeader from "./LoginHeader";

import config from "../data/config";
import Journeys from "../data/journeys";

import "../scss/components/Login.scss";

class Login extends React.Component {
  constructor() {
    super();
    this.state = { journey: null };
  }
  componentDidMount() {
    let hostname = window.location.hostname;

    if (hostname.indexOf("quick-compare") !== -1) {
      for (let i = 0; i < Journeys.length; i++) {
        let name = Journeys[i].name;
        if (name === "qc_f2f") {
          this.setState({ journey: Journeys[i] });
          break;
        }
      }
    } else if (hostname.indexOf("localhost") !== -1) {
      for (let i = 0; i < Journeys.length; i++) {
        let name = Journeys[i].name;
        if (name === "mex_fr") {
          this.setState({ journey: Journeys[i] });
          break;
        }
      }
    }
  }

  goNextRoute = () => {
    setTimeout(() => {
      this.props.history.push(this.props.nextRoute);
    }, 0);
  };

  tryLogin = (setSubmitting) => {
    axios
      .post(
        config.initialApiUrl +
          "auth/createtoken?username=" +
          getStorage("Login.username") +
          "&password=" +
          getStorage("Login.password")
      )
      .then((response) => {
        setStorage("Login.token", response.data);
        this.getAgentDetails(setSubmitting);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
      });
  };

  processSecurityGroup = (obj) => {
//    console.log(obj)
    return obj
  }

  getAgentDetails = (setSubmitting) => {
    setAxiosHeaders();
    axios
      .post(config.initialApiUrl + "UserAccount/GetAgentDetails")
      .then((response) => {
        if (response.data === null || response.status === 401) {
          console.log(response);
        } else if (response.status !== 401) {
          setStorage("Login.SalesAgentId", response.data.SalesAgentId);
          setStorage("Login.CallCentreId", response.data.CallCentreId);
          setStorage(
            "Login.LoginSecurityGroup",
            response.data.LoginSecurityGroup
          );
          //setStorage(
          //  "Login.LoginSecurityGroupNames",
          //  this.processSecurityGroup(response.data.SecurityGroup)
          //);
          setStorage("Login.Name", response.data.Name);
          setStorage("Login.Data", JSON.stringify(response.data));

          clearAllStorageKey("Quote");

          this.goNextRoute();
        }
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
      });
  };

  render() {
    let logo = "mex-logo.png";
    if (this.state.journey !== null) {
      let root = document.documentElement;
      let journey = this.state.journey;

      root.style.setProperty("--brand-primary", journey.theme.brandPrimary);
      root.style.setProperty("--brand-secondary", journey.theme.brandSecondary);
      root.style.setProperty("--brand-tertiary", journey.theme.brandTertiary);
      root.style.setProperty(
        "--brand-background",
        journey.theme.brandBackground
      );
      root.style.setProperty("--brand-heading", journey.theme.brandHeading);
      root.style.setProperty("--brand-body", journey.theme.brandBody);
      root.style.setProperty("--cta-primary", journey.theme.ctaPrimary);
      root.style.setProperty("--cta-secondary", journey.theme.ctaSecondary);
      root.style.setProperty("--cta-body", journey.theme.ctaBody);

      logo = journey.theme.logo;
    }
    return (
      <>
        <LoginHeader logo={logo} />
        <div className="Login">
          <h4 style={{ textAlign: "center" }}> {i18n.t("Login")}</h4>
          <Formik
            initialValues={{
              username: getStorage("Login.username") || "",
              password: getStorage("Login.password") || "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = i18n.t("Required");
              }
              if (!values.password) {
                errors.password = i18n.t("Required");
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setStorage("Login.username", values.username);
              setStorage("Login.password", values.password);

              this.tryLogin(setSubmitting);
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
                <label> {i18n.t("Username")}</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  autoComplete="username"
                />
                {errors.username && touched.username && errors.username}
                <label> {i18n.t("Password")}</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="current-password"
                />
                {errors.password && touched.password && errors.password}
                <br />
                <button type="submit" disabled={isSubmitting}>
                  {i18n.t("Submit")}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

export default Login;
