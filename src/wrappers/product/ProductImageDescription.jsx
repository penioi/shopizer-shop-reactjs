import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
// import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  product,
  strings
}) => {

  const { addToast } = useToasts();
  const finalProductPrice = product.originalPrice;
  const finalDiscountedPrice = product.finalPrice;

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="row">
          
          <div className="col-lg-6 col-md-6">
            <ProductDescriptionInfo
              product={product}
              strings={strings}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              addToast={addToast}
            />
          </div>
          <div className="col-lg-6 col-md-6">
           
            <ProductImageGallery product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};


export default connect()(ProductImageDescription);
