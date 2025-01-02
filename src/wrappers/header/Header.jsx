import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";
import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";
import HeaderTop from "../../components/header/HeaderTop";
import WebService from '../../util/webService';
import constant from '../../util/constant';
// import { setLocalData } from '../../util/helper';
import { setMerchant } from "../../redux/actions/storeAction";
import { getCurrentLocation } from "../../redux/actions/userAction";
const Header = ({
  setMerchant,
  merchant,
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass,
  defaultStore,
  getCurrentLocation,
  currentLanguageCode
}) => {
  const history = useHistory();

  const [categoryData, setCategoryData] = useState([]);
  const [contentData, setContentData] = useState([]);

  useEffect(() => {
    checkServerHealth();

  }, []);
  const checkServerHealth = async () => {

    // let action = 'actuator/health/ping';
    try {
      // console.log("*********************************");
      // console.log("BASE URL " + window._env_.APP_BASE_URL);
      // console.log("APP_API_VERSION " + window._env_.APP_API_VERSION);
      // console.log("APP_MERCHANT " + window._env_.APP_MERCHANT);
      // console.log("*********************************");
      let response = await WebService.get(window._env_.APP_BASE_URL + '/actuator/health/ping');

      if (response) {
        // console.log(response)
        if (response.status === 'UP') {
          setMerchant()
          getCurrentLocation();
          getCategoryHierarchy();
          getContent();
        } else {
          history.push('/not-found')
        }
      }
    } catch (error) {
      history.push('/not-found')
    }


  }
  const getCategoryHierarchy = async () => {
    let action = constant.ACTION.CATEGORY + '?count=20&page=0&store=' + defaultStore + '&lang=' + currentLanguageCode;
    try {
      let response = await WebService.get(action);
      if (response) {
        setCategoryData(response.categories);
      }
    } catch (error) {
      // console.log(error.messages)
      // console.log(error)
      // history.push('/not-found')
    }


  }
  const getContent = async () => {
    //TODO PAGE + COUNT
    let action = constant.ACTION.CONTENT + constant.ACTION.PAGES + '?page=0&count=20&store=' + defaultStore + '&lang=' + currentLanguageCode;
    try {
      let response = await WebService.get(action);
      if (response) {
        setContentData(response.items)
      }
    } catch (error) {
    }
  }
  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={`header-area clearfix d-flex align-items-center`}>
  
     
        <div className= "container">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-8 d-flex align-items-center">
              {/* header logo */}
              {
                <Logo imageUrl="https://www.thematerialist.co/sp/decorations/layout/fabricsociety/images/logo.png" logoClass="logo" />
              }

            </div>
            <div className="nav-menu d-none d-lg-block col-xl-8 col-lg-8 align-items-center">
              {/* Nav menu */}
              <NavMenu categories={categoryData} contents={contentData} />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-4 d-flex align-items-center justify-content-end">
              {/* Icon group */}
              <IconGroup />
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu categories={categoryData} contents={contentData} />
      
    </header>
  );
};

Header.propTypes = {
  // merchant: PropTypes.string,
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string,
  setMerchant: PropTypes.func
};

const mapStateToProps = state => {
  return {
    merchant: state.merchantData.merchant,
    currentLanguageCode: state.multilanguage.currentLanguageCode,
    defaultStore: state.merchantData.defaultStore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMerchant: () => {
      dispatch(setMerchant());
    },
    getCurrentLocation: () => {
      dispatch(getCurrentLocation())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(Header));

// export default HeaderOne;
