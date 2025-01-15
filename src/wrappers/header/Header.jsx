import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";
import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";
import WebService from '../../util/webService';
import constant from '../../util/constant';
import { setMerchant } from "../../redux/actions/storeAction";
import { getCurrentLocation } from "../../redux/actions/userAction";
const Header = ({
  setMerchant,
  defaultStore,
  getCurrentLocation,
  currentLanguageCode
}) => {
  const history = useHistory();

  const [categoryData, setCategoryData] = useState([]);
  const [contentData, setContentData] = useState([]);
  let isMounted = true; 
  useEffect(() => {

    // Flag to track if component is mounted
    checkServerHealth();

    return () => {
      isMounted = false; // Set flag to false on unmount
    };

  }, []);
  const checkServerHealth = async () => {

    // let action = 'actuator/health/ping';
    try {
      let response = await WebService.get(window._env_.APP_BASE_URL + '/actuator/health/ping');

      if (isMounted && response) {
        if (isMounted && response.status === 'UP') {
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
      if (isMounted && response) {
        setCategoryData(response.categories);
      }
    } catch (error) {
      console.log(error.messages)
    }


  }
  const getContent = async () => {
    //TODO PAGE + COUNT
    let action = constant.ACTION.CONTENT + constant.ACTION.PAGES + '?page=0&count=20&store=' + defaultStore + '&lang=' + currentLanguageCode;
    try {
      let response = await WebService.get(action);
      if (isMounted && response) {
        setContentData(response.items)
      }
    } catch (error) {
    }
  }

  return (
    <header
      className={`header-area clearfix d-flex align-items-center`}>
  
     
        <div className= "container">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-8 d-flex align-items-center">
              {
                <Logo imageUrl="assets/img/logo/logo.png" logoClass="logo" />
              }

            </div>
            <div className="nav-menu d-none d-lg-block col-xl-8 col-lg-8 align-items-center">
              <NavMenu categories={categoryData} contents={contentData} />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-4 d-flex align-items-center justify-content-end">
              <IconGroup />
            </div>
          </div>
        </div>
        <MobileMenu categories={categoryData} contents={contentData} />
      
    </header>
  );
};

Header.propTypes = {
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

