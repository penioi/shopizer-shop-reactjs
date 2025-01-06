import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { setLoader } from "../../redux/actions/loaderActions";
import { connect } from "react-redux";

import { multilanguage } from "redux-multilanguage";
const ProductDescriptionTab = ({ strings, spaceBottomClass, product, review, userData }) => {

  const [offset, setOffset] = useState(1);

  useEffect(() => {

  }, [offset])
 
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <p dangerouslySetInnerHTML={{ __html: product.description.description }}></p>

        <div className="description-wrapper description-wrapper--list">
          <div><span>Construction</span>{product.properties.find(item => item.code === 'construction')?.propertyValue.name}</div>
          <div><span>Type</span>{product.properties.find(item => item.code === 'type')?.propertyValue.name}</div>
          <div><span>Main material</span>{product.properties.find(item => item.code === 'main_material')?.propertyValue.name}</div>
          <div><span>Composition</span>{product.properties.find(item => item.code === 'composition')?.propertyValue.name}</div>
          <div><span>Origin</span>{product.properties.find(item => item.code === 'origin')?.propertyValue.name}</div>
          <div><span>Width in cm</span></div>
          <div><span>Weight in g</span></div>
          <div><span>Product code</span>{product.sku}</div>
        </div>

        <div className="description-wrapper  description-wrapper--cheque">
          
          {
              product.properties.map((value, i) => {
                return <div key={i}>
                  <span><b>{value.property.name}</b></span> {value.propertyValue.name}
                </div>
              })
            }
        </div>
       
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  product: PropTypes.object,
  review: PropTypes.array,
  spaceBottomClass: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData.userData,
    currentLanguageCode: state.multilanguage.currentLanguageCode,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLoader: (value) => {
      dispatch(setLoader(value));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(ProductDescriptionTab));
