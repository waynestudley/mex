import React from "react";
import { Link } from "react-router-dom";

import "../scss/components/Breadcrumb.scss";

function Breadcrumb(props) {
  let foundIt = false;
  let previousItem = null;
  let showOneMore = false;

  return (
    <div className="Breadcrumb">
      <div>
        {props.allBreadcrumbs.map((item, i) => {
          let foundThisTime = false;

          if (item[0] === props.location.pathname) {
            foundIt = true;
            foundThisTime = true;
            showOneMore = true;
          }

          if (foundThisTime === true && previousItem === null) {
            return (
              <div className={"Breadcrumb__item--selected"} key={"mbci" + i}>
                {item[1]}
              </div>
            );
          } else if (foundThisTime === true && previousItem !== null) {
            return (
              <React.Fragment key={"mbciprev"}>
                <div className={"Breadcrumb__item"}>
                  <Link to={previousItem[0]}>{previousItem[1]}</Link>
                </div>
                <div className={"Breadcrumb__item--selected"}>{item[1]}</div>
              </React.Fragment>
            );
          } else if (foundIt && showOneMore) {
            showOneMore = false;
            return (
              <div className={"Breadcrumb__item"} key={"mbci" + i}>
                {item[1]}
              </div>
            );
          }

          previousItem = item;
          return null;
        })}
      </div>
    </div>
  );
}

export default Breadcrumb;
