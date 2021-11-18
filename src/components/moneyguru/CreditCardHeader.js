import React from "react";
import mexLogo from "../../images/mex-logo-blue.png";
import mGuru from "../../images/Powered-By-MG.png";

import "../../scss/components/moneyguru/CreditCardHeader.scss";

function CreditCardHeader() {
  return (
    <div className="CreditCardHeader">
      <a href="https://qa.moneyguru.com/">
        <div className="CreditCardHeader__imgMask logoLeft">
          <img className="slide-in-left" alt="Logo" src={mexLogo} />
        </div>
      </a>
      <a href="https://qa.moneyguru.com/">
        <div className="CreditCardHeader__imgMask logoRight">
          <img className="slide-in-right" alt="Logo" src={mGuru} />
        </div>
      </a>
    </div>
  );
}

export default CreditCardHeader;
