const journeys = [
  {
    name: "bt_web",
    displayName: "bt_web",
    api: "https://api.simplyswitch.com/api/",
    LoginSecurityGroup: 0,
    countryId: 1,
    currency: "£",
    breadcrumb: [
      ["/start", "Availability checker"],
      ["/usage_checker", "Usage checker"],
      ["/device_checker", "Device checker"],
      ["/payment_checker", "Payment checker"],
      ["/results", "Results"],
      ["/package_summary", "Package summary"],
      ["/application_form", "Application form"],
      ["/thank_you", "Thank you"],
    ],
    theme: {
      brandPrimary: "rgb(32, 58, 84)",
      brandSecondary: "rgb(49, 88, 127)",
      brandTertiary: "#b3e4ff",
      brandBackground: "white",
      brandHeading: "#0c3a5b",
      brandBody: "rgb(32, 58, 84)",
      ctaHeading: "white",
      ctaPrimary: "#f1c40f",
      ctaSecondary: "rgb(32, 58, 84)",
      ctaBody: "white",
      logo: "mex-logo-bt.png",
    },
  },
  {
    name: "bt_f2f",
    displayName: "BT : Agent",
    api: "https://api.simplyswitch.com/api/",
    LoginSecurityGroup: 8,
    countryId: 1,
    currency: "£",
    breadcrumb: [
      ["/start", "Availability checker"],
      ["/usage_checker", "Usage checker"],
      ["/device_checker", "Device checker"],
      ["/payment_checker", "Payment checker"],
      ["/results", "Results"],
      ["/package_summary", "Package summary"],
      ["/application_form", "Application form"],
      ["/thank_you", "Thank you"],
    ],
    theme: {
      brandPrimary: "rgb(32, 58, 84)",
      brandSecondary: "rgb(49, 88, 127)",
      brandTertiary: "#b3e4ff",
      brandBackground: "white",
      brandHeading: "#0c3a5b",
      brandBody: "rgb(32, 58, 84)",
      ctaHeading: "white",
      ctaPrimary: "#f1c40f",
      ctaSecondary: "rgb(32, 58, 84)",
      ctaBody: "white",
      logo: "mex-logo-bt.png",
    },
  },
  {
    name: "us_web",
    displayName: "us_web",
    api: "https://apiusa.simplyswitch.com/api/",
    LoginSecurityGroup: 0,
    countryId: 2,
    currency: "$",
    breadcrumb: [
      ["/start", "Availability checker"],
      ["/usage_checker", "Usage checker"],
      ["/device_checker", "Device checker"],
      ["/payment_checker", "Payment checker"],
      ["/results", "Results"],
      ["/package_summary", "Package summary"],
      ["/application_form", "Application form"],
      ["/thank_you", "Thank you"],
    ],
    theme: {
      brandPrimary: "rgb(32, 58, 84)",
      brandSecondary: "rgb(49, 88, 127)",
      brandTertiary: "#b3e4ff",
      brandBackground: "white",
      brandHeading: "#0c3a5b",
      brandBody: "rgb(32, 58, 84)",
      ctaHeading: "white",
      ctaPrimary: "#f1c40f",
      ctaSecondary: "rgb(32, 58, 84)",
      ctaBody: "white",
      logo: "mex-logo.png",
    },
  },
  {
    name: "us_f2f",
    displayName: "us_f2f",
    api: "https://apiusa.simplyswitch.com/api/",
    LoginSecurityGroup: 0,
    countryId: 2,
    currency: "$",
    breadcrumb: [
      ["/start", "Availability checker"],
      ["/usage_checker", "Usage checker"],
      ["/device_checker", "Device checker"],
      ["/payment_checker", "Payment checker"],
      ["/results", "Results"],
      ["/package_summary", "Package summary"],
      ["/application_form", "Application form"],
      ["/thank_you", "Thank you"],
    ],
    theme: {
      brandPrimary: "rgb(32, 58, 84)",
      brandSecondary: "rgb(49, 88, 127)",
      brandTertiary: "#b3e4ff",
      brandBackground: "white",
      brandHeading: "#0c3a5b",
      brandBody: "rgb(32, 58, 84)",
      ctaHeading: "white",
      ctaPrimary: "#f1c40f",
      ctaSecondary: "rgb(32, 58, 84)",
      ctaBody: "white",
      logo: "mex-logo.png",
    },
  },
  {
    name: "mg_credit_card_web",
    displayName: "mg_credit_card_web",
    api: "https://api.simplyswitch.com/api/",
    LoginSecurityGroup: 0,
    countryId: 2,
    currency: "$",
    breadcrumb: [
      ["/start", "credit card type"],
      ["/yourdetails", "your details"],
      ["/youraddress", "your address"],
      ["/yourcircumstances", "your circumstances"],
      ["/getresults", "get results"],
    ],
    theme: {
      brandPrimary: "#3f5d9a",
      brandSecondary: "orange",
      brandTertiary: "rgb(49, 88, 127)",
      brandBackground: "white",
      brandHeading: "#0c3a5b",
      brandBody: "black",
      ctaHeading: "white",
      ctaPrimary: "#3f5d9a",
      ctaSecondary: "#3f5d9a",
      ctaBody: "white",
      logo: "mex-logo.png",
    },
  },
  {
    name: "mg_credit_card_f2f",
    displayName: "mg_credit_card_f2f",
    api: "https://api.simplyswitch.com/api/",
    LoginSecurityGroup: 13,
    countryId: 1,
    currency: "£",
    breadcrumb: [
      ["/start", "Credit card type"],
      ["/yourdetails", "Your details"],
      ["/youraddress", "Your address"],
      ["/yourcircumstances", "Your circumstances"],
      ["/getresults", "Get results"],
      ["/submit", "Results"],
    ],
    theme: {
      brandPrimary: "#3f5d9a",
      brandSecondary: "orange",
      brandTertiary: "rgb(49, 88, 127)",
      brandBackground: "white",
      brandHeading: "#0c3a5b",
      brandBody: "black",
      ctaHeading: "white",
      ctaPrimary: "#3f5d9a",
      ctaSecondary: "#3f5d9a",
      ctaBody: "white",
      logo: "mex-logo.png",
    },
  },
  {
    name: "qc_f2f",
    displayName: "Quick Compare : Agent",
    api: "https://api.simplyswitch.com/api/",
    LoginSecurityGroup: 5,
    countryId: 1,
    currency: "£",
    breadcrumb: [
      ["/start", "Postcode checker"],
      ["/availability_checker", "Availability checker"],
      ["/usage_checker", "Package Type"],
      ["/device_checker", "Usage checker"],
      ["/payment_checker", "Payment checker"],
      ["/results", "Results"],
      ["/package_summary", "Package summary"],
      ["/application_form", "Application form"],
      ["/thank_you", "Thank you"],
    ],
    theme: {
      brandPrimary: "rgb(32, 58, 84)",
      brandSecondary: "rgb(49, 88, 127)",
      brandTertiary: "#b3e4ff",
      brandBackground: "white",
      brandHeading: "#0c3a5b",
      brandBody: "rgb(32, 58, 84)",
      ctaHeading: "white",
      ctaPrimary: "#b81262",
      ctaSecondary: "rgb(32, 58, 84)",
      ctaBody: "white",
      logo: "qc-logo.png",
    },
  },
  {
    name: "mex_fr",
    displayName: "MEX: France",
    api: "https://testapi.simplyswitch.com/api/",
    LoginSecurityGroup: 5,
    countryId: 5,
    currency: "€",
    breadcrumb: [
      ["/start", "Postcode checker"],
      ["/availability_checker", "Availability checker"],
      ["/usage_checker", "Usage checker"],
      ["/device_checker", "Device checker"],
      ["/payment_checker", "Payment checker"],
      ["/results", "Results"],
      ["/package_summary", "Package summary"],
      ["/application_form", "Application form"],
      ["/thank_you", "Thank you"],
    ],
    theme: {
      brandPrimary: "rgb(32, 58, 84)",
      brandSecondary: "rgb(49, 88, 127)",
      brandTertiary: "#b3e4ff",
      brandBackground: "white",
      brandHeading: "#0c3a5b",
      brandBody: "rgb(32, 58, 84)",
      ctaHeading: "#f1c40f",
      ctaPrimary: "#f1c40f",
      ctaSecondary: "rgb(32, 58, 84)",
      ctaBody: "white",
      logo: "mex-logo.png",
    },
  },
];

export default journeys;
