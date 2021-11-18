import React from "react";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import { clearAllStorageKey } from "../../utils/storage";

import { ReactComponent as HomeSvg } from "../../images/home.svg";

import "../../scss/components/broadband/Header.scss";

function Header(props) {
  return (
    <div className="Header">
      <div className="Header__topMenu">
        <button
          onClick={() => {
            clearAllStorageKey("Quote");
            setTimeout(() => {
              props.history.push("/journey");
            }, 0);
          }}
        >
          {i18n.t("NewQuote")}
        </button>
        <div className="Header__topMenuRight">
          <Link to="/application_list">
            <button style={{ marginRight: "1vw" }}>
              <HomeSvg />
            </button>
          </Link>
          <button
            onClick={() => {
              clearAllStorageKey("Quote");
              setTimeout(() => {
                props.history.push("/login");
              }, 0);
            }}
          >
            {i18n.t("Logout")}
          </button>
        </div>
      </div>
      <div className="Header__midMenu">
        <img
          src={
            process.env.PUBLIC_URL +
            "/imagesPackage/" +
            props.journey.theme.logo
          }
          alt="mex logo"
        />
        <div className="Header__midMenuText">
          <span className="bodysmall">{i18n.t("CallUsFreeNow")}</span>
          <span>
            <strong>{i18n.t("CallUsFreeNowNumber")}</strong>
          </span>
          <span className="bodysmall">{i18n.t("TalkToOurExperts")}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
