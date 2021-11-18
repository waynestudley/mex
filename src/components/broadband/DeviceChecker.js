import React from "react";
import { Formik } from "formik";
import i18n from "../../i18n";
import { getStorage, setStorage } from "../../utils/storage";

import "../../scss/components/broadband/DeviceChecker.scss";

import { ReactComponent as MobileSvg } from "../../images/svg/mobile-phone-icon.svg";
import { ReactComponent as TabletSvg } from "../../images/svg/tablet-icon-new.svg";
import { ReactComponent as LaptopSvg } from "../../images/svg/laptop-icon.svg";
import { ReactComponent as SmartTVSvg } from "../../images/svg/smart-tv-icon.svg";
import { ReactComponent as GameSvg } from "../../images/svg/game-consol-icon.svg";
import { ReactComponent as WatchSvg } from "../../images/svg/smart-watch-icon.svg";
import { ReactComponent as HubSvg } from "../../images/svg/home-hub-icon.svg";
import { ReactComponent as StreamingSvg } from "../../images/svg/streaming-music-icon.svg";
import { ReactComponent as SmartMeterSvg } from "../../images/svg/smart-meter-icon.svg";

class DeviceChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: "" };
  }

  goNextRoute = () => {
    this.props.history.push(this.props.nextRoute);
  };

  getOptionList = () => {
    return (
      <>
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6+</option>
      </>
    );
  };

  getBackgroundColor = (num) => {
    if (Number(num) === 0) {
      return { backgroundColor: "var(--brand-tertiary)" };
    } else {
      return { backgroundColor: "var(--brand-success)" };
    }
  };

  getTextColor = (num) => {
    if (Number(num) === 0) {
      return { color: "black" };
    } else {
      return { color: "white" };
    }
  };

  render() {
    return (
      <div className="DeviceChecker BBFormComponents">
        <div className="Panel">
          <Formik
            initialValues={{
              mobiles: getStorage("Quote.mobiles") || 0,
              tablets: getStorage("Quote.tablets") || 0,
              laptops: getStorage("Quote.laptops") || 0,
              tvs: getStorage("Quote.tvs") || 0,
              consoles: getStorage("Quote.consoles") || 0,
              watches: getStorage("Quote.watches") || 0,
              hubs: getStorage("Quote.hubs") || 0,
              speakers: getStorage("Quote.speakers") || 0,
              meters: getStorage("Quote.meters") || 0,
            }}
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              let HighUse =
                Number(values.mobiles) +
                Number(values.tvs) +
                Number(values.laptops) +
                Number(values.tablets);
              let MediumUse = Number(values.consoles) + Number(values.speakers);
              let LowUse =
                Number(values.watches) +
                Number(values.meters) +
                Number(values.hubs);

              setSubmitting(false);

              if (HighUse === 0 && MediumUse === 0 && LowUse === 0) {
                this.setState({
                  errorMessage: i18n.t("SelectAtLeastOneDevice"),
                });
              } else {
                setStorage("Quote.numDevicesHighUse", HighUse);
                setStorage("Quote.numDevicesMediumUse", MediumUse);
                setStorage("Quote.numDevicesLowUse", LowUse);

                setStorage("Quote.mobiles", values.mobiles);
                setStorage("Quote.tablets", values.tablets);
                setStorage("Quote.laptops", values.laptops);
                setStorage("Quote.tvs", values.tvs);
                setStorage("Quote.consoles", values.consoles);
                setStorage("Quote.watches", values.watches);
                setStorage("Quote.hubs", values.hubs);
                setStorage("Quote.speakers", values.speakers);
                setStorage("Quote.meters", values.meters);

                this.goNextRoute();
              }
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
                <div className="Global__heading">
                  <h3>{i18n.t("DeviceCheckerLine1")}</h3>
                  <h4>{i18n.t("DeviceCheckerLine2")}</h4>
                </div>
                {this.state.errorMessage && (
                  <h4 className="error-message">{this.state.errorMessage}</h4>
                )}
                <div className="DeviceChecker__row">
                  <label
                    htmlFor="mobile"
                    style={this.getBackgroundColor(values.mobiles)}
                  >
                    {errors.mobiles && touched.mobiles && errors.mobiles}
                    <h4 style={this.getTextColor(values.mobiles)}>
                      {i18n.t("MobilePhones")}
                    </h4>
                    <div className="DeviceChecker__row">
                      <div className="DeviceChecker__item">
                        <MobileSvg />
                        <select
                          name="mobiles"
                          value={values.mobiles}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={this.getTextColor(values.mobiles)}
                        >
                          {this.getOptionList()}
                        </select>
                      </div>
                    </div>
                  </label>

                  <label
                    htmlFor="tablets"
                    style={this.getBackgroundColor(values.tablets)}
                  >
                    {errors.tablets && touched.tablets && errors.tablets}
                    <h4 style={this.getTextColor(values.tablets)}>
                      {i18n.t("Tablets")}
                    </h4>
                    <div className="DeviceChecker__row">
                      <div className="DeviceChecker__item">
                        <TabletSvg />
                        <select
                          name="tablets"
                          value={values.tablets}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={this.getTextColor(values.tablets)}
                        >
                          {this.getOptionList()}
                        </select>
                      </div>
                    </div>
                  </label>

                  <label
                    htmlFor="laptops"
                    style={this.getBackgroundColor(values.laptops)}
                  >
                    {errors.laptops && touched.laptops && errors.laptops}
                    <h4 style={this.getTextColor(values.laptops)}>
                      {i18n.t("Laptops")}
                    </h4>
                    <div className="DeviceChecker__row">
                      <div className="DeviceChecker__item">
                        <LaptopSvg />
                        <select
                          name="laptops"
                          value={values.laptops}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={this.getTextColor(values.laptops)}
                        >
                          {this.getOptionList()}
                        </select>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="DeviceChecker__row">
                  <label
                    htmlFor="tvs"
                    style={this.getBackgroundColor(values.tvs)}
                  >
                    {errors.tvs && touched.tvs && errors.tvs}
                    <h4 style={this.getTextColor(values.tvs)}>
                      {i18n.t("SmartTVs")}
                    </h4>
                    <div className="DeviceChecker__row">
                      <div className="DeviceChecker__item">
                        <SmartTVSvg />
                        <select
                          name="tvs"
                          value={values.tvs}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={this.getTextColor(values.tvs)}
                        >
                          {this.getOptionList()}
                        </select>
                      </div>
                    </div>
                  </label>

                  <label
                    htmlFor="consoles"
                    style={this.getBackgroundColor(values.consoles)}
                  >
                    {errors.consoles && touched.consoles && errors.consoles}
                    <h4 style={this.getTextColor(values.consoles)}>
                      {i18n.t("GameConsoles")}
                    </h4>
                    <div className="DeviceChecker__row">
                      <div className="DeviceChecker__item">
                        <GameSvg />
                        <select
                          name="consoles"
                          value={values.consoles}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={this.getTextColor(values.consoles)}
                        >
                          {this.getOptionList()}
                        </select>
                      </div>
                    </div>
                  </label>

                  <label
                    htmlFor="watches"
                    style={this.getBackgroundColor(values.watches)}
                  >
                    {errors.watches && touched.watches && errors.watches}
                    <h4 style={this.getTextColor(values.watches)}>
                      {i18n.t("SmartWatches")}
                    </h4>
                    <div className="DeviceChecker__row">
                      <div className="DeviceChecker__item">
                        <WatchSvg />
                        <select
                          name="watches"
                          value={values.watches}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={this.getTextColor(values.watches)}
                        >
                          {this.getOptionList()}
                        </select>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="DeviceChecker__row">
                  <label
                    htmlFor="hubs"
                    style={this.getBackgroundColor(values.hubs)}
                  >
                    {errors.hubs && touched.hubs && errors.hubs}
                    <h4 style={this.getTextColor(values.hubs)}>
                      {i18n.t("HomeHubs")}
                    </h4>
                    <div className="DeviceChecker__row">
                      <div className="DeviceChecker__item">
                        <HubSvg />
                        <select
                          name="hubs"
                          value={values.hubs}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={this.getTextColor(values.hubs)}
                        >
                          {this.getOptionList()}
                        </select>
                      </div>
                    </div>
                  </label>

                  <label
                    htmlFor="speakers"
                    style={this.getBackgroundColor(values.speakers)}
                  >
                    {errors.speakers && touched.speakers && errors.speakers}
                    <h4 style={this.getTextColor(values.speakers)}>
                      {i18n.t("StreamingSpeakers")}
                    </h4>
                    <div className="DeviceChecker__row">
                      <div className="DeviceChecker__item">
                        <StreamingSvg />
                        <select
                          name="speakers"
                          value={values.speakers}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={this.getTextColor(values.speakers)}
                        >
                          {this.getOptionList()}
                        </select>
                      </div>
                    </div>
                  </label>

                  <label
                    htmlFor="meters"
                    style={this.getBackgroundColor(values.meters)}
                  >
                    {errors.meters && touched.meters && errors.meters}
                    <h4 style={this.getTextColor(values.meters)}>
                      {i18n.t("SmartMeters")}
                    </h4>
                    <div className="DeviceChecker__row">
                      <div className="DeviceChecker__item">
                        <SmartMeterSvg />
                        <select
                          name="meters"
                          value={values.meters}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={this.getTextColor(values.meters)}
                        >
                          {this.getOptionList()}
                        </select>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="submitWrapper">
                  <button type="submit" disabled={isSubmitting}>
                    {i18n.t("Continue")}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default DeviceChecker;
