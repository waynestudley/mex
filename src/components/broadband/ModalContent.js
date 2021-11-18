import React from "react";

function ModalContent(props) {
  //const closeModal = (e) =>{
  //  console.log('closeModal')
 // }

  return (
    <div className="modal-window">
      {/*
      {props.provider === "TalkTalk" && (
        <>
          <a
            href="#"
            className="background-close"
            onClick={(e) => closeModal(e, "TalkTalk")}
          />
          <div>
            <a
              href="#"
              title="CloseButton"
              className="modal-close"
              onClick={(e) => closeModal(e, "TalkTalk")}
            />
            <div className="">
              <div className="talktalk-wrapper">
                <div className="page-wrapper">
                  <div className="inner-wrapper">
                    <div className="bb-presenter-heading with-logo talktalk-logo">
                      7 reasons to switch to
                    </div>
                    <div className="item">
                      <i className="with-icon price-lock"></i>Fixed prices
                      during the contract
                    </div>
                    <div className="item">
                      <i className="with-icon free-new-line"></i>Free New Line
                      installation -The standard connection charge is normally
                      &pound;140
                    </div>
                    <div className="item">
                      <i className="with-icon which-best-routers"></i>Talktalk
                      Wireless hub - 60 square meters - 7 Antenna voted best
                      router for 2018 by which?{" "}
                    </div>
                    <div className="item">
                      <i className="with-icon f-secure"></i>Free Virus
                      protection F-secure{" "}
                    </div>
                    <div className="item">
                      <i className="with-icon free-voicemail"></i>Free
                      Voicemail, caller display, anonymous call reject and last
                      call barring{" "}
                    </div>
                    <div className="item">
                      <i className="with-icon totally-unlimited"></i>Totally
                      unlimited{" "}
                    </div>
                    <div className="item">
                      <i className="with-icon free-calls"></i>Free calls to
                      Talktalk homes
                    </div>
                    <div className="item"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {props.provider === "EE" && (
        <>
          <a
            href="#"
            className="background-close"
            onClick={(e) => closeModal(e, "EE")}
          />
          <div>
            <a
              href="#"
              title="CloseButton"
              className="modal-close"
              onClick={(e) => closeModal(e, "EE")}
            />
            <div className="">
              <div className="ee-wrapper">
                <div className="page-wrapper">
                  <div className="inner-wrapper">
                    <div className="bb-presenter-heading with-logo ee-logo">
                      6 reasons to switch to
                    </div>
                    <div className="item">
                      <i className="with-icon boost"></i>Data Boost - A 5G or
                      20G Data Boost for EE Mobile Customers
                    </div>
                    <div className="item">
                      <i className="with-icon fastest"></i>Enhancing our Fibre
                      To The Cabinet (FTTC) technology means we can deliver much
                      faster speeds (Fibre Max)
                    </div>
                    <div className="item">
                      <i className="with-icon ee-smart-hub"></i>EE Smart Hub -
                      Twice as Powerful - Our EE Smart Hub is twice as powerful
                      than our previous router, specifically designed to handle
                      lots of devices
                    </div>
                    <div className="item">
                      <i className="with-icon norton-security"></i>FREE NORTON
                      SECURITY (Save £79.99) Up To 10 Devices{" "}
                    </div>
                    <div className="item">
                      <i className="with-icon uk-customer-service"></i>UK and
                      Ireland Customer services - 5 stars rating
                    </div>
                    <div className="item">
                      <i className="with-icon totally-unlimited"></i>Totally
                      unlimited
                    </div>
                    <div className="item"></div>
                    <div className="item"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {props.provider === "BT Broadband" && (
        <>
          <a
            href="#"
            className="background-close"
            onClick={(e) => closeModal(e, "BT Broadband")}
          />
          <div>
            <a
              href="#"
              title="CloseButton"
              className="modal-close"
              onClick={(e) => closeModal(e, "BT Broadband")}
            />
            <div className="">
              <div className="ee-wrapper">
                <div className="page-wrapper">
                  <div className="inner-wrapper">
                    <div className="bb-presenter-heading with-logo bt-logo">
                      Why BT Broadband?
                    </div>
                    <div className="item">
                      <i className="with-icon f-secure"></i>Powerful security
                      features to keep your family safe online and protect you
                      from threats like viruses.
                    </div>
                    <div className="item">
                      <i className="with-icon fastest"></i>You get loads of
                      other extras too –like free, unlimited access to 5 million
                      BT Wi-Fi hotspots, and BT Cloud online storage.
                    </div>
                    <div className="item">
                      <i className="with-icon totally-unlimited"></i>With one of
                      our Unlimited Broadband packages you can stream, browse
                      and download to your heart’s content, and we’ll never slow
                      you down or charge you extra. You can get unlimited
                      packages with both our Standard Broadband and our
                      Superfast Fibre Broadband.
                    </div>
                    <div className="item">
                      <i className="with-icon which-best-routers"></i>Our hubs
                      are more powerful than other big broadband providers
                    </div>
                  </div>
                  <br />
                  <strong>Complete Wi-Fi: </strong>
                  <ul>
                    <li>
                      Intelligent design: Our Smart Hub has 7 antennae,
                      specially positioned to maximise wi-fi performance
                    </li>
                    <li>
                      Smart channel selection: All your devices auto connect to
                      the fastest wi-fi channel and frequency available
                    </li>
                    <li>
                      Smart scan: Continually scans to check your hub and
                      network performance, and reboots if there's a problem
                    </li>
                  </ul>
                  <br />
                  <strong>Plus, you get all this…</strong>
                  <br />
                  <br />
                  <u>
                    <strong>Manage your services on the My BT app</strong>
                  </u>
                  <br />
                  Our smartphone app makes it quick and easy to manage your BT
                  account wherever you are. You can check your usage, pay a
                  bill, get help and more.
                  <br />
                  <br />
                  <u>
                    <strong>Stay in touch with BT Mail</strong>
                  </u>
                  <br />
                  When you’re with BT, you can sign up for free email with BT
                  Mail. You can create up to 11 email addresses –each one with
                  unlimited storage and built-in anti-virus protection.
                  <br />
                  <br />
                  <u>
                    <strong>Wi-fi hotspots around the UK</strong>
                  </u>
                  <br />
                  With BT, you get free access to the UK’s largest wi-fi network
                  – that means more than 5 million BT Wi-Fi hotspots. Connect
                  for as long as you like and save your mobile data for when you
                  really need it.
                  <br />
                  <br />
                  <u>
                    <strong>Your calls, your way with our Calling Plans</strong>
                  </u>
                  <br />
                  Your broadband comes with a BT phone line, and thanks to our
                  new simple calling plans, you’ll only pay for the calls you
                  need. You’ll get Call Protect too, to help stop nuisance calls
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {props.provider === "Virgin Media" && (
        <>
          <a
            href="#"
            className="background-close"
            onClick={(e) => closeModal(e, "Virgin Media")}
          />
          <div>
            <a
              href="#"
              title="CloseButton"
              className="modal-close"
              onClick={(e) => closeModal(e, "Virgin Media")}
            />
            <div className="">
              <div className="virgin-wrapper">
                <div className="page-wrapper">
                  <div className="inner-wrapper">
                    <div className="bb-presenter-heading with-logo virgin-media-logo">
                      7 reasons to switch to
                    </div>
                    <div className="item">
                      <i className="with-icon guarantee"></i>Lifetime guarantee
                      - Free call engineer or free replacement if faulty
                    </div>
                    <div className="item">
                      <i className=" with-icon fastest"></i>Virgin’s network is
                      the fastest internet (FTTP)
                    </div>
                    <div className="item with-icon">
                      <i className="with-icon virgin-hub"></i>Wireless Hub with
                      Intelligent wifi{" "}
                    </div>
                    <div className="item with-icon">
                      <i className="with-icon virgin-v6"></i>Free Virgin V6 box
                      with all virgin media bigger bundles as standard{" "}
                    </div>
                    <div className="item with-icon">
                      <i className="with-icon ultra-hd-4k"></i>V6 Box- 4K Ultra
                      HD (Netflix, UHD Channel, Youtube &amp; Entertainment)
                    </div>
                    <div className="item with-icon">
                      <i className="with-icon uswitch-bb-award"></i>Voted
                      fastest provider by U-Switch 6 year in a row
                    </div>
                    <div className="item">
                      <i className="with-icon bt-sport"></i>All Virgin media
                      Customers on bigger bundles now get BT Sport at no extra
                      cost, making Virgin Media the only place to get the sports
                      channels free of charge when you're not with BT for your
                      home broadband
                    </div>
                    <div className="item"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )*/}
    </div>
  );
}

export default ModalContent;
