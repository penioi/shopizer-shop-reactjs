import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isValidObject } from "../../util/helper";
import { addToCart } from "../../redux/actions/cartActions";
import { setLoader } from "../../redux/actions/loaderActions";
import QuantityBox from "./QuantityBox";
import AvailabilityInfo from "./AvailabilityInfo";

const ProductDescriptionInfo = ({
  product,
  cartItems,
  addToast,
  addToCart,
  setLoader,
  productID,
  defaultStore,
  userData,
  strings
}) => {
  const [quantityCount, setQuantityCount] = useState(product.quantityOrderMinimum || 10);
  
  useEffect(() => {
    getDefualtsOption()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  const getDefualtsOption = async () => {
    let temp = [];
    if (product.options) {
      product.options.map(async (item) => {
        item.optionValues.map(async (data) => {
          if (data.defaultValue) {
            temp.push({ 'name': item.name, 'id': data.id });
          }
        })
      })
    }
  }

  
  return (
    <div className="product-details-content ml-70">
      <h2>{product.description.name}</h2>
      <div className="product-details-price">
        <span>{product.finalPrice} </span>
      </div>
      

      <div className="pro-details-list">
        <p dangerouslySetInnerHTML={{ __html: product.description.description }}></p>
      </div>
 
      <AvailabilityInfo price={product.finalPrice} availableQuantity={product.quantity} minQuantity={product.quantityOrderMinimum} />
  
      
   
        <div className="pro-details-quality">
          <QuantityBox
            maxQuantity={product.quantity}
            minQuantity={product.quantityOrderMinimum}
            quantity={quantityCount}
            setQuantityCb={setQuantityCount}
          />
          <div className="pro-details-cart btn-hover">
            {product.available && product.canBePurchased && product.visible && product.quantity > 0 ? (
              <button
                onClick={() => {
                  let options = [];

                  addToCart(
                    product,
                    addToast,
                    cartItems,
                    quantityCount,
                    defaultStore,
                    userData,
                    options
                  )
                }}>
                {" "}
                {strings["Add to cart"]}{" "}
              </button>
            ) : (
                <button disabled>{strings["Out of Stock"]}</button>
              )}
          </div>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.object,
  finalDiscountedPrice: PropTypes.string,
  finalProductPrice: PropTypes.string,
  product: PropTypes.object,
};
const mapStateToProps = (state, ownProps) => {
  const prodID = ownProps.product.id;
  return {
    productID: prodID,
    cartItems: state.cartData.cartItems,
    defaultStore: state.merchantData.defaultStore,
    userData: state.userData.userData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLoader: (value) => {
      dispatch(setLoader(value));
    },
    addToCart: (
      item,
      addToast,
      cartItem,
      quantityCount,
      defaultStore,
      userData,
      selectedProductColor
    ) => {

      let index = isValidObject(cartItem) ? cartItem.products.findIndex(cart => cart.id === item.id) : -1;
      dispatch(
        addToCart(
          item,
          addToast,
          cartItem.code,
          index === -1 ? quantityCount : cartItem.products[index].quantity + quantityCount,
          defaultStore,
          userData,
          selectedProductColor
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionInfo);
