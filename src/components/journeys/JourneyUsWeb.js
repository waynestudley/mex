import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../broadband/Header";
import Breadcrumb from "../Breadcrumb";

import ZipcodeChecker from "../broadband/ZipcodeChecker";
import UsageChecker from "../broadband/UsageChecker";
import DeviceChecker from "../broadband/DeviceChecker";
import PaymentChecker from "../broadband/PaymentChecker";
import Results from "../broadband/Results";
import PackageSummary from "../broadband/PackageSummary";
import ApplicationForm from "../broadband/ApplicationForm";
import ThankYou from "../broadband/ThankYou";

function JourneyUsWeb(props) {
  return (
    <>
      <Header journey={props.journey} />
      <Switch>
        <Route
          exact
          path="/start"
          render={(renderProps) => (
            <ZipcodeChecker
              {...renderProps}
              nextRoute="usage_checker"
              journey={props.journey}
            />
          )}
        />
        <Route
          path="/"
          render={(renderProps) => (
            <Breadcrumb
              {...renderProps}
              allBreadcrumbs={props.journey.breadcrumb}
            />
          )}
        />
      </Switch>
      <Route
        exact
        path="/usage_checker"
        render={(renderProps) => (
          <UsageChecker {...renderProps} nextRoute="/device_checker" />
        )}
      />
      <Route
        exact
        path="/device_checker"
        render={(renderProps) => (
          <DeviceChecker {...renderProps} nextRoute="/payment_checker" />
        )}
      />
      <Route
        exact
        path="/payment_checker"
        render={(renderProps) => (
          <PaymentChecker
            {...renderProps}
            nextRoute="/results"
            journey={props.journey}
          />
        )}
      />
      <Route
        exact
        path="/results"
        render={(renderProps) => (
          <Results
            {...renderProps}
            nextRoute="/package_summary"
            journey={props.journey}
          />
        )}
      />
      <Route
        exact
        path="/package_summary"
        render={(renderProps) => (
          <PackageSummary
            {...renderProps}
            nextRoute="/application_form"
            journey={props.journey}
          />
        )}
      />
      <Route
        exact
        path="/application_form"
        render={(renderProps) => (
          <ApplicationForm
            {...renderProps}
            nextRoute="/thank_you"
            journey={props.journey}
          />
        )}
      />
      <Route
        exact
        path="/thank_you"
        render={(renderProps) => (
          <ThankYou {...renderProps} nextRoute="/" journey={props.journey} />
        )}
      />
    </>
  );
}

export default JourneyUsWeb;
