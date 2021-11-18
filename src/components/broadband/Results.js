import React from "react";
import axios from "axios";
import { getStorage, setAxiosHeaders, setStorage } from "../../utils/storage";
import LoadingSpinner from "../ui/LoadingSpinner";
import ModalContent from "./ModalContent";

import "../../scss/components/broadband/Results.scss";
import i18n from "../../i18n";

function HeroItem(props) {
  const ctaClick = (e) => {
    e.preventDefault();
    setStorage(
      "Quote.SelectedPackageProviderName",
      props.item.MediaProvider.ProviderName
    );
    setStorage(
      "Quote.SelectedPackageProviderLogo",
      props.item.MediaProvider.ProviderLogo
    );
    setStorage("Quote.SelectedPackageId", props.item.Id);
    setStorage("Quote.SelectedPackageName", props.item.PackageName);
    setStorage("Quote.MonthlyCost", props.item.MonthlyCost);
    props.goNextRoute();
  };
  const getSavings = () => {
    let total =
      Number(getStorage("Quote.currentMonthlyPayment")) * 12 -
      Number(getStorage("Quote.MonthlyCost")) * 12;
    return total;
  };
  return (
    <div className="Results__heroItem">
      <div className="Results__heroItemTitle">
        <h4>{props.title}</h4>
      </div>
      <div className="Results__heroItemBody">
        <img
          src={
            process.env.PUBLIC_URL +
            "/imagesPackage/" +
            props.item.MediaProvider.ProviderLogo
          }
          alt="provider"
        />
        <div>
          <p className="bodysmall">{props.item.PackageName}</p>
          <p className="bodysmall">{props.item.DataAllowanceDesc} bandwidth</p>
          <p className="bodysmall">
            {props.item.MaxSpeed} Mb/s maximum download speed
          </p>
          <p className="bodysmall">from £{props.item.MonthlyCost} a month</p>
          <p className="bodysmall">You will save £{getSavings()}</p>
        </div>
      </div>
      <button onClick={ctaClick}>{props.cta}</button>
    </div>
  );
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      packageData: null,
      additional: null,
      orderBy: "",
      provider: null,
      withTv: true,
      showResults: props.hideHero === true ? true : false,
    };
  }

  componentDidMount() {
    setAxiosHeaders();

    let postData = {
      Postcode: getStorage("Quote.postcode"),
      CurrentProviderId: getStorage("Quote.currentProviderId"),
      CurrentProviderMonths: getStorage("Quote.currentProviderMonths"),

      CurrentMediaPackageBroadband: getStorage("Quote.broadbandCheck"),
      CurrentMediaPackagePhone: getStorage("Quote.phoneCheck"),
      CurrentMediaPackageTV: getStorage("Quote.smartTVCheck"),

      CurrentTVPackagesMovies: getStorage("Quote.moviesCheck"),
      CurrentTVPackagesSports: getStorage("Quote.sportsCheck"),
      CurrentTVPackagesEntertainment: getStorage("Quote.entertainmentCheck"),

      CurrentStreamServicesNetflix: getStorage("Quote.netflixCheck"),
      CurrentStreamServicesPrime: getStorage("Quote.primeCheck"),
      CurrentStreamServicesNowTV: getStorage("Quote.nowCheck"),

      NumDevicesHighUse: getStorage("Quote.numDevicesHighUse"),
      NumDevicesMediumUse: getStorage("Quote.numDevicesMediumUse"),
      NumDevicesLowUse: getStorage("Quote.numDevicesLowUse"),

      CurrentMonthlyPay: getStorage("Quote.currentMonthlyPayment"),
      HasAerial: getStorage("Quote.hasAerial"),
      CanHaveVirgin: getStorage("Quote.hasVirgin"),
      CountryId: this.props.journey.countryId,
    };

    axios
      .post(this.props.journey.api + "Media/Quote", postData)
      .then((response) => {
        //console.log(response);
        if (response.data.length === 0) {
          this.setState({ packageData: null });
        } else {
          this.setState({ packageData: response.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  selectPackage = (e, packageId, item) => {
    e.preventDefault();
    setStorage("Quote.SelectedPackageId", packageId);
    
    setStorage("Quote.SelectedPackageName", item.PackageName);
    setStorage(
      "Quote.SelectedPackageProviderName",
      item.MediaProvider.ProviderName
    );
    setStorage(
      "Quote.SelectedPackageProviderLogo",
      item.MediaProvider.ProviderLogo
    );
    setStorage("Quote.MonthlyCost", item.MonthlyCost);
    this.goNextRoute();
  };

  showAdditional = (i) => {
    if (i === this.state.additional) {
      this.setState({ additional: null });
    } else {
      this.setState({ additional: i });
    }
  };

  getDisplayValue = (obj) => {
    if (this.state.additional === obj.i) {
      return "block";
    } else {
      return "none";
    }
  };

  getSavings = () => {
    let total =
      Number(getStorage("Quote.currentMonthlyPayment")) * 12 -
      Number(getStorage("Quote.MonthlyCost")) * 12;
    return total;
  };

  withTV = () => {
    this.setState({
      withTv: !this.state.withTv,
    });
  };

  orderByPrice = () => {
    if (this.state.orderBy === "PriceInc") {
      this.setState({
        orderBy: "PriceDec",
      });
    } else {
      this.setState({
        orderBy: "PriceInc",
      });
    }
  };

  orderByProvider = () => {
    if (this.state.orderBy === "ProviderInc") {
      this.setState({
        orderBy: "ProviderDec",
      });
    } else {
      this.setState({
        orderBy: "ProviderInc",
      });
    }
  };

  orderBySpeed = () => {
    if (this.state.orderBy === "SpeedInc") {
      this.setState({
        orderBy: "SpeedDec",
      });
    } else {
      this.setState({
        orderBy: "SpeedInc",
      });
    }
  };

  clearFilters = () => {
    this.setState({
      orderBy: "",
      provider: null,
      withTv: true,
    });
  };

  getDisplayForTvFilter = (item) => {
    if (this.state.provider === null) {
      if (this.state.withTv === true) {
        if (item.MediaPackageType.TV === true) {
          return { display: "block" };
        } else {
          return { display: "none" };
        }
      } else if (this.state.withTv === false) {
        if (item.MediaPackageType.TV === true) {
          return { display: "none" };
        } else {
          return { display: "block" };
        }
      }
    } else {
      if (this.state.provider === item.MediaProvider.ProviderName) {
        if (this.state.withTv === true) {
          if (item.MediaPackageType.TV === true) {
            return { display: "block" };
          } else {
            return { display: "none" };
          }
        } else if (this.state.withTv === false) {
          if (item.MediaPackageType.TV === true) {
            return { display: "none" };
          } else {
            return { display: "block" };
          }
        }
      } else {
        return { display: "none" };
      }
    }
  };

  showResults = (e) => {
    this.setState({ showResults: true });
  };

  ProviderFilterClick = (providerName) => {
    if (this.state.provider === providerName) {
      this.setState({
        provider: null,
      });
    } else {
      this.setState({
        provider: providerName,
      });
    }
  };

  getProviderFilters = () => {
    let pArr1 = [];
    let pArr2 = [];
    for (let i = 0; i < this.state.packageData.length; i++) {
      let item = this.state.packageData[i];
      pArr1[item.MediaProvider.ProviderName] = item.MediaProvider.ProviderLogo;
    }
    for (var key in pArr1) {
      pArr2.push([pArr1[key], key]);
    }
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {pArr2.map((item, idx) => (
          <div
            key={"key" + idx}
            className={
              item[1] === this.state.provider
                ? "providerImage providerImage--selected"
                : "providerImage providerImage--unselected"
            }
          >
            <img
              src={process.env.PUBLIC_URL + "/imagesPackage/" + item[0]}
              alt="provider"
              onClick={() => {
                this.ProviderFilterClick(item[1]);
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  getPriceStyle = () => {
    if (this.state.orderBy === "PriceInc") {
      return " high";
    } else {
      return " low";
    }
  };

  getSpeedStyle = () => {
    if (this.state.orderBy === "SpeedInc") {
      return " high";
    } else {
      return " low";
    }
  };

  render() {
    let packageListArray = [];
    if (this.state.packageData !== null) {
      packageListArray = this.state.packageData.map((x) => x);
      if (this.state.orderBy === "PriceInc") {
        packageListArray.sort(function (a, b) {
          return a.MonthlyCost - b.MonthlyCost;
        });
      } else if (this.state.orderBy === "PriceDec") {
        packageListArray.sort(function (b, a) {
          return a.MonthlyCost - b.MonthlyCost;
        });
      } else if (this.state.orderBy === "ProviderInc") {
        packageListArray.sort(function (a, b) {
          let a1 = a.MediaProvider.ProviderName;
          let b1 = b.MediaProvider.ProviderName;
          if (a1 < b1) {
            return -1;
          }
          if (a1 > b1) {
            return 1;
          }
          return 0;
        });
      } else if (this.state.orderBy === "ProviderDec") {
        packageListArray.sort(function (b, a) {
          let a1 = a.MediaProvider.ProviderName;
          let b1 = b.MediaProvider.ProviderName;
          if (a1 < b1) {
            return -1;
          }
          if (a1 > b1) {
            return 1;
          }
          return 0;
        });
      } else if (this.state.orderBy === "SpeedInc") {
        packageListArray.sort(function (a, b) {
          return a.MaxSpeed - b.MaxSpeed;
        });
      } else if (this.state.orderBy === "SpeedDec") {
        packageListArray.sort(function (b, a) {
          return a.MaxSpeed - b.MaxSpeed;
        });
      }
    }

    return (
      <div className="BBFormComponents Results">
        <div className="Panel">
          {this.state.packageData === null && <LoadingSpinner />}
          {this.state.packageData !== null && this.props.hideHero !== true && (
            <div className="Results__heroContainer">
              <HeroItem
                title="Quick Compare value recommendation"
                cta="Order value package"
                item={this.state.packageData[0]}
                goNextRoute={this.goNextRoute}
              />
              <HeroItem
                title="Quick Compare Fully loaded recommendation"
                cta="Order fully loaded package"
                item={this.state.packageData[this.state.packageData.length - 1]}
                goNextRoute={this.goNextRoute}
              />
            </div>
          )}
          {this.state.packageData !== null && (
            <>
              {this.state.showResults === false && (
                <a href={window.location.href} onClick={this.showResults}>
                  {i18n.t("ViewAllSuitablePackages")} +
                </a>
              )}
              {this.state.showResults === true &&
                this.props.hideFilters !== true && (
                  <>
                    <div className="Results__filterModule mt mb subtle-wrap">
                      <div className="Results__filterWrapper__orderBy">
                        <div className="filter-label mb">
                          <strong>Order by&nbsp;</strong>
                        </div>
                        <button
                          className={
                            (this.state.orderBy.indexOf("Price") === -1
                              ? "Results__filterButton"
                              : "Results__filterButton Results__filterButton--active") +
                            this.getPriceStyle()
                          }
                          onClick={this.orderByPrice}
                        >
                          Price
                        </button>
                        <button
                          className={
                            (this.state.orderBy.indexOf("Speed") === -1
                              ? "Results__filterButton"
                              : "Results__filterButton Results__filterButton--active") +
                            this.getSpeedStyle()
                          }
                          onClick={this.orderBySpeed}
                        >
                          Speed
                        </button>
                      </div>
                      <div className="Results__filterWrapper__withTV">
                        <div className="filter-label mb__sm">
                          <strong>With TV&nbsp;</strong>
                        </div>
                        <button
                          className={
                            this.state.withTv === false
                              ? "Results__filterButton"
                              : "Results__filterButton Results__filterButton--active"
                          }
                          onClick={this.withTV}
                        >
                          Yes
                        </button>
                        <button
                          className={
                            this.state.withTv === true
                              ? "Results__filterButton"
                              : "Results__filterButton Results__filterButton--active"
                          }
                          onClick={this.withTV}
                        >
                          No
                        </button>
                      </div>
                    </div>
                    <div className="row__two-col mb mt subtle-wrap">
                      <div className="Results__filterWrapper__providers">
                        <div className="filter-label mb__sm">
                          <strong>Provider filter&nbsp;</strong>
                        </div>
                        {this.state.showResults === true &&
                          this.state.packageData !== null && (
                            <>{this.getProviderFilters()}</>
                          )}
                      </div>
                      <div className="button-group">
                        <button
                          className="secondary"
                          onClick={this.clearFilters}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </>
                )}
            </>
          )}
          {this.state.showResults === true &&
            this.state.packageData !== null &&
            packageListArray.map((item, i) => (
              <div
                className="Results__item"
                key={"key" + i}
                style={this.getDisplayForTvFilter(item)}
              >
                <div className="Results__itemContainer">
                  <div className="Results__itemColumn">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/imagesPackage/" +
                        item.MediaProvider.ProviderLogo
                      }
                      alt="provider"
                    />
                  </div>
                  <div className="Results__itemColumn bodysmall">
                    {item.PackageName}
                    <br />
                    {item.ContractLengthMonths} month contract
                    <br />
                    Upfront fees: £{item.SetupFee}
                  </div>
                  <div className="Results__itemColumn bodysmall">
                    Up to {item.MaxSpeed} Mb per seconnd
                    <br />
                    {item.DataAllowanceDesc}
                  </div>
                  <div className="Results__itemColumn bodysmall">
                    £{item.MonthlyCost} a month
                    <br />
                    You will save £{this.getSavings()}
                    <br />
                    <button
                      onClick={(e) => this.selectPackage(e, item.Id, item)}
                    >
                      Order
                    </button>
                  </div>
                </div>

                <div className="Results__additional">
                  <a
                    onClick={() => {
                      this.showAdditional(i);
                    }}
                    href={window.location.href}
                  >
                    <span
                      className="bodysmall"
                      style={{ margin: "0.5vw 0vw", display: "block" }}
                    >
                      Additional features +
                    </span>
                  </a>

                  <div
                    className="Results__additionalTable"
                    style={{ display: this.getDisplayValue({ i }) }}
                  >
                    <div className="Results__additionalHeader">
                      Package Features
                    </div>
                    <div className="Results__additionalBody">
                      {item.MediaFeatures.map((mf, mfi) => (
                        <p
                          className="Results__additionalMediaFeature"
                          key={"mf" + mfi}
                        >
                          {mf.Description}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <ModalContent provider="Virgin Media" />
      </div>
    );
  }
}

export default Results;
