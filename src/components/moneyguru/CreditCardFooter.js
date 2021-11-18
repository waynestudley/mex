import React from "react";
import i18n from "../../i18n";
import {
  clearAllStorageKey,
} from "../../utils/storage";

import "../../scss/components/moneyguru/CreditCardFooter.scss";

function CreditCardFooter(props) {
  const newQuoteClick = () => {
    clearAllStorageKey('CreditCard');
    props.history.push("/start");
  };
  const logoutClick = () => {
    props.history.push("/login");
  };
  return (
    <>
      <div className="CreditCardFooter__left CreditCardFormComponents">
        <button onClick={newQuoteClick}>{i18n.t("NewQuote")}</button>
      </div>
      <div className="CreditCardFooter__right CreditCardFormComponents">
        <button onClick={logoutClick}>{i18n.t("Logout")}</button>
      </div>
    </>
  );
}

export default CreditCardFooter;
