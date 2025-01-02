import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Layout from "../../layouts/Layout";
import HeroSlider from "../../wrappers/hero-slider/HeroSlider";
import TabProduct from "../../wrappers/product/TabProduct";
// import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import Promo from "../../wrappers/promos/Promos";
import Newsletter from "../../wrappers/newsletter/Newsletter";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Home = ({ merchant, strings }) => {
  return (
    <Fragment>
      <MetaTags>
        <title>{merchant.name}</title>
        {/* <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        /> */}
      </MetaTags>
      <Layout
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        {/* hero slider 
        <HeroSlider string={strings} />*/}
        <div class="container"><h1 style={{padding : "40px 0"}}>the materialist is a marketplace for deadstock fabrics that connects fashion houses, designers and other visionaries with high-end suppliers' excess inventories.
        the materialist inspires and accelerates a new ecosystem for circular textiles and materials.</h1></div>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="col-4 main-page-block"><Link to="category/buy-deadstock" >buy deadstock</Link></div>
            <div className="col-4 main-page-block">sell deadstock</div>
            <div className="col-4 main-page-block">bespoke sourcing</div>
          </div>
        </div>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="col-4 main-page-fabric main-page-fabric--monochrome">Monochrome</div>
            <div className="col-4 main-page-fabric main-page-fabric--color-silks">Colourful silks</div>
            <div className="col-4 main-page-fabric main-page-fabric--under10">Under £10</div>
            <div className="col-4 main-page-fabric main-page-fabric--cottons">Cottons</div>
            <div className="col-4 main-page-fabric main-page-fabric--lightweight">Lightweight</div>
            <div className="col-4 main-page-fabric  main-page-fabric--lace">Lace</div>
          </div>
        </div>
        
        {/* promos */}
        {/* <Promo
          bgImg=""
          containerClass="container-fluid"
          gutterClass="padding-10-row-col"
          spaceTopClass="pt-50"
          spaceBottomClass="pb-40"
        /> */}
        
        {/* tab product */}
        {/* <TabProduct
          category="dead_stock_fabrics"
          spaceBottomClass="pb-100"
          spaceTopClass="pt-100"
        /> */}
        {/* feature icon 
        <FeatureIcon
          bgImg="/assets/img/bg/shape.png"
          containerClass="container-fluid"
          gutterClass="padding-10-row-col"
          spaceTopClass="pt-50"
          spaceBottomClass="pb-40"
        />
        */}

        {/* newsletter */}
        {/* <Newsletter
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          subscribeBtnClass="dark-red-subscribe"
        /> */}

      </Layout>
    </Fragment>
  );
};


const mapStateToProps = state => {
  return {
    merchant: state.merchantData.merchant
  };
};


export default connect(mapStateToProps, null)(multilanguage(Home));
// export default HomeFashionSeven;
