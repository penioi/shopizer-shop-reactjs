import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Layout from "../../layouts/Layout";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Home = ({ merchant }) => {
  return (
    <Fragment>
      <MetaTags>
        <title>{merchant.name}</title>
  
      </MetaTags>
      <Layout
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <section className="f-screen-section  f-screen-section--hero">
          <div className="decoration-screen"></div>
          <img className="hero-image" src="assets/img/promo/banner2.jpg" />
        </section>
        <section className="f-screen-section ">
          <div className="d-flex mh-100 h-100 row">
            <div className="main-page-circle col-md-6 "><span className="show-default"> buy</span> <span className="show-on-hover"> <img src="assets/img/promo/flower1.png" /></span></div>
            <div className="main-page-circle col-md-6"><span className="show-default">sell</span> <span className="show-on-hover"> <img src="assets/img/promo/flower2.png" /></span></div>
          </div>
        </section>
        <section className="f-screen-section ">
          <div className="d-flex mh-100 h-100 row">
            <div className="p-4 col-md-6"><h1>the materialist is a marketplace for deadstock fabrics that connects fashion houses, designers and other visionaries with high-end suppliers' excess inventories.
            the materialist inspires and accelerates a new ecosystem for circular textiles and materials.</h1></div>
            <div className="col-md-6"><img src="assets/img/promo/banner4.webp" /></div>
          </div>
        </section>
        {/* <div className="container"><h1 style={{padding : "80px 0"}}>the materialist is a marketplace for deadstock fabrics that connects fashion houses, designers and other visionaries with high-end suppliers' excess inventories.
        the materialist inspires and accelerates a new ecosystem for circular textiles and materials.</h1></div> */}
        {/* <div className="container">
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
         */}
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
