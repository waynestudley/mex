import React from "react";
import axios from "axios";
import i18n from "../../i18n";
import { getStorage, setAxiosHeaders } from "../../utils/storage";
import LoadingSpinner from "../ui/LoadingSpinner";

import "../../scss/components/broadband/PackageSummary.scss";

class PackageSummary extends React.Component {
  constructor() {
    super();
    this.state = { packageData: null };
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
      HasAerial: getStorage("Quote.aerial"),
      CanHaveVirgin: getStorage("Quote.canHaveVirgin"),
      CountryId: this.props.journey.countryId,

      SelectedPackageId: getStorage("Quote.SelectedPackageId"),
    };

    axios
      .post(this.props.journey.api + "Media/Quote", postData)
      .then((response) => {
        this.setState({ packageData: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  getFeaturesList = (item) => {
    let arr = [];
    for (let i = 0; i < item.MediaFeatures.length; i++) {
      if (i !== 0) {
        arr.push(
          <div className="PackageSummary__divider" key={"mfd" + i}></div>
        );
      }
      arr.push(
        <div className="PackageSummary__tr" key={"mf" + i}>
          {item.MediaFeatures[i].Description}
        </div>
      );
    }

    return arr;
  };

  render() {
    return (
      <div className="PackageSummary BBFormComponents">
        <div className="Panel">
          {this.state.packageData === null && <LoadingSpinner />}
          {this.state.packageData !== null &&
            this.state.packageData.map((item, i) => (
              <div className="PackageSummary__overview" key={"key" + i}>
                <div className="PackageSummary__table">
                  <div className="PackageSummary__tableHeading">
                    <h3>{i18n.t("PackageSummaryOverviewHeading")}</h3>
                  </div>
                  <div className="PackageSummary__tableBody">
                    <div className="PackageSummary__tr">
                      <div className="PackageSummary__td">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/imagesPackage/" +
                            item.MediaProvider.ProviderLogo
                          }
                          alt="provider"
                        />
                      </div>
                      <div className="PackageSummary__td">
                        <div>
                          {item.MediaProvider.ProviderName}
                          <br />
                          {item.PackageName}
                        </div>
                        <div className="perfect-package-speed">
                          <strong>{item.MaxSpeed} Mb/s </strong>maximum download
                          speed
                        </div>
                      </div>
                    </div>
                    <div className="PackageSummary__divider"></div>
                    <div className="PackageSummary__tr">
                      <div className="PackageSummary__td">
                        {i18n.t("PackageMonthlyCost")}
                      </div>
                      <div className="PackageSummary__td">
                        {this.props.journey.currency + item.MonthlyCost}
                      </div>
                    </div>
                    <div className="PackageSummary__divider"></div>
                    <div className="PackageSummary__tr">
                      <div className="PackageSummary__td">
                        {i18n.t("PackageDataAllowance")}
                      </div>
                      <div className="PackageSummary__td">
                        {item.DataAllowanceDesc}
                      </div>
                    </div>
                    <div className="PackageSummary__divider"></div>
                    <div className="PackageSummary__tr">
                      <div className="PackageSummary__td">
                        {i18n.t("ContractLength")}
                      </div>
                      <div className="PackageSummary__td">
                        {item.ContractLengthMonths + " Months"}
                      </div>
                    </div>
                    <div className="PackageSummary__divider"></div>
                    <div className="PackageSummary__tr">
                      <div className="PackageSummary__td">
                        Fixed Price Months
                      </div>
                      <div className="PackageSummary__td">
                        {item.FixedPriceMonths + " Months"}
                      </div>
                    </div>{" "}
                    <div className="PackageSummary__divider"></div>
                    <div className="PackageSummary__tr">
                      <div className="PackageSummary__td">
                        {i18n.t("SetupFee")}
                      </div>
                      <div className="PackageSummary__td">
                        {this.props.journey.currency + item.SetupFee}
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="PackageSummary__table">
                  <div className="PackageSummary__tableHeading">
                    <h3> {i18n.t("PackageSummaryFeatures")}</h3>
                  </div>
                  <div className="PackageSummary__tableBody">
                    <div className="PackageSummaryTR">
                      {this.getFeaturesList(item)}
                    </div>
                  </div>
                </div>
                <br />
                {getStorage("Quote.SelectedPackageProviderName") ===
                  "Virgin Media" && (
                  <>
                    <a
                      href={"https://www.virginmedia.com/postcode-checker"}
                      target={"_blank"}
                      rel="noopener noreferrer"
                    >
                      Virgin Media Check for availability
                    </a>
                    <br />
                  </>
                )}
                <div className="submitWrapper">
                  <button onClick={this.goNextRoute}>
                    {i18n.t("Continue")}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default PackageSummary;
