import React from "react";
import { Route } from "react-router-dom";

import Breadcrumb from "../Breadcrumb";
import CreditCardHeader from "../moneyguru/CreditCardHeader";
import CreditCardFooter from "../moneyguru/CreditCardFooter";

import CreditCardType from "../moneyguru/CreditCardType";
import CreditCardDetails from "../moneyguru/CreditCardDetails";
import CreditCardAddress from "../moneyguru/CreditCardAddress";
import CreditCardCircumstances from "../moneyguru/CreditCardCircumstances";
import CreditCardResults from "../moneyguru/CreditCardResults";
import CreditCardSubmit from "../moneyguru/CreditCardSubmit";

import "../../scss/components/moneyguru/CreditCardFormComponents.scss";

function JourneyMGCreditCard(props) {
  return (
    <>
      <Route
        path="/"
        render={(renderProps) => (
          <div>
            <CreditCardHeader />
            <Breadcrumb
              {...renderProps}
              allBreadcrumbs={props.journey.breadcrumb}
            />
          </div>
        )}
      />
      <Route
        path="/start"
        render={(renderProps) => (
          <CreditCardType {...renderProps} nextRoute="/yourdetails" />
        )}
      />
      <Route
        path="/yourdetails"
        render={(renderProps) => (
          <CreditCardDetails {...renderProps} nextRoute="/youraddress" />
        )}
      />
      <Route
        path="/youraddress"
        render={(renderProps) => (
          <CreditCardAddress
            {...renderProps}
            nextRoute="/yourcircumstances"
            journey={props.journey}
          />
        )}
      />
      <Route
        path="/yourcircumstances"
        render={(renderProps) => (
          <CreditCardCircumstances {...renderProps} nextRoute="/getresults" />
        )}
      />
      <Route
        path="/getresults"
        render={(renderProps) => (
          <CreditCardResults {...renderProps} nextRoute="/submit" />
        )}
      />
      <Route
        path="/submit"
        render={(renderProps) => (
          <CreditCardSubmit
            {...renderProps}
            nextRoute="/start"
            journey={props.journey}
          />
        )}
      />
      <Route
        path="/"
        render={(renderProps) => (
          <div>
            <CreditCardFooter
              {...renderProps}
            />
          </div>
        )}
      />
    </>
  );
}

export default JourneyMGCreditCard;
