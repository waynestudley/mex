import React from "react";
import "../scss/components/broadband/Header.scss";

function Header(props) {
  return (
    <div className="Header">
      <div className="Header__midMenu" style={{ justifyContent: "center" }}>
        <img
          src={process.env.PUBLIC_URL + "/imagesPackage/" + props.logo}
          alt="Login logo"
        />
      </div>
    </div>
  );
}

export default Header;
