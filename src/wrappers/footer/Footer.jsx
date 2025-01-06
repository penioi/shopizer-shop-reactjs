import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { animateScroll } from "react-scroll";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
const Footer = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
}) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <footer
      className={`footer-area ${
        backgroundColorClass ? backgroundColorClass : ""
        } ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
        } ${extraFooterClass ? extraFooterClass : ""} ${
        spaceLeftClass ? spaceLeftClass : ""
        } ${spaceRightClass ? spaceRightClass : ""}`}
    >
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="row">
          <div className="col-4 footer-list">
            <ul>
              <li>catalogue</li>
              <li>London showroom</li>
            </ul>
            <div className="copyright">@2025 the materialist</div>
          </div>
          <div className="col-4">
            <div className="footer-widget mb-30">
            
              <div className="footer-list">
                
                <ul>
                  <li>shipping and delivery</li>
                  <li>terms and conditions</li>
                  <li>privacy policy</li>
                  <li>frequently asked questions</li>
                </ul>
                
              </div>
            </div>
          </div>
       
          
          <div className="col-4 footer-list">
            <ul>
              <li>Need assistance?</li>
              <li>Contact us <span><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476.213 476.213"><path d="M345.606 107.5l-21.212 21.213 94.393 94.394H0v30h418.787L324.394 347.5l21.212 21.213 130.607-130.607z"></path></svg></span></li>
            </ul>
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

Footer.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};


const mapStateToProps = state => {
  return {
    merchant: state.merchantData.merchant
  };
};



export default connect(
  mapStateToProps,
)(multilanguage(Footer));
