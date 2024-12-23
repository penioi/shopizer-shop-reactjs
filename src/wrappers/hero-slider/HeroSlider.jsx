import React from "react";
// import PropTypes from "prop-types";
import HeroSliderStatic from "../../components/hero-slider/HeroSliderStatic";
import { multilanguage } from "redux-multilanguage";
import { connect } from 'react-redux';

const HeroSlider = ({ string }) => {

  return (
    <div className="site-blocks-cover">
      <div className="container">
      <h1>the materialist is a marketplace for deadstock fabrics that connects fashion houses, designers and other visionaries with high-end suppliers' excess inventories.
      the materialist inspires and accelerates a new ecosystem for circular textiles and materials.</h1>
        {/* <HeroSliderStatic
          pitch1={string["Pitch1"]}
          pitch2={string["Pitch2"]}
          pitch3={string["Shop now"]}
        /> */}
      </div>
    </div>
  );


};

const mapStateToProps = state => {

  return {
    currentLanguageCode: state.multilanguage.currentLanguageCode,
    defaultStore: state.merchantData.defaultStore,
    isLoading: state.loading.isLoading
  }
}

export default connect(mapStateToProps)(multilanguage(HeroSlider));
