import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ProductModal from "./ProductModal";
import { setProductID } from "../../redux/actions/productActions";
import { connect } from "react-redux";
const ProductGridListSingle = ({
  product,
  addToCart,
  cartItem,
  sliderClassName,
  spaceBottomClass,
  setProductID,
  defaultStore,
  userData,
  strings
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  const finalProductPrice = product.originalPrice;
  const finalDiscountedPrice = product.finalPrice;
  const onClickProductDetails = (id) => {
    setProductID(id)
  }

  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
          }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link to={"/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)}>
              {
                product.image && <img className="default-img" src={defaultImage(product)} alt="" />
              }
              {
                product.images.length > 1 ? <img className="hover-img-A" src={defaultImage(product)} alt="" /> : ''
              }
            </Link>


            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <Link to={"/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)} title="Select options">
                  <i className="fa fa-cog"></i>
                </Link>
              </div>
              <div className="pro-same-action pro-cart">

                {
                  product.available && product.canBePurchased && product.visible && product.quantity > 0 ?
                    (
                      <button
                        onClick={() => addToCart(product, addToast, cartItem, 1, defaultStore, userData)}
                        title={strings["Add to cart"]}
                      > {" "}  <i className="pe-7s-cart"></i>{" "}{strings["Add to cart"]}</button>
                    )
                    :
                    (
                      <button disabled className="active">
                        {strings["Out of Stock"]}
                      </button>
                    )
                }

              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            
            <div className="d-flex  justify-content-between">
               
                  <h3>
                    <Link to={"/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)}>
                      {product.description.name}
                    </Link>
                  </h3>
                  <div><img src="https://www.thematerialist.co/sp/decorations/layout/fabricsociety/images/icons/icon-star.svg" width="15"/></div>
                </div>
      
            <div className="d-flex  justify-content-between">
                <div>
                  {product.quantity}m available
                </div>
                <div className="product-price">
                  {product.discounted ? (
                    <Fragment>
                      <span>{finalDiscountedPrice}</span>{" "}
                      <span className="old">
                        {finalProductPrice}
                      </span>
                    </Fragment>
                  ) : (
                      <span>{finalProductPrice}/m </span>
                    )}
                </div>
            </div>
            
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link to={"/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)}>
                    {
                      product.image && <img className="default-img img-fluid" src={product.image.imageUrl} alt="" />
                    }
              

                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              
              <div className="shop-list-content">
                <div className="d-flex  justify-content-between">
                  <h3>
                    <Link to={"/product/" + product.description.friendlyUrl} onClick={() => onClickProductDetails(product.id)}>
                      {product.description.name}
                    </Link>
                  </h3>
                  <div><img src="https://www.thematerialist.co/sp/decorations/layout/fabricsociety/images/icons/icon-star.svg" width="15"/></div>
                </div>
               
                <div className="product-list-price">
                  {product.discounted ? (
                    <Fragment>
                      <span>
                        {finalDiscountedPrice}
                      </span>{" "}
                      <span className="old">
                        {finalProductPrice}
                      </span>
                    </Fragment>
                  ) : (
                      <span>{finalProductPrice} </span>
                    )}
                </div>
                
                <p dangerouslySetInnerHTML={{ __html: product.description.description }}></p>
                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">

                    {
                      product.available && product.canBePurchased && product.visible && product.quantity > 0 ?

                        (
                          <button
                            onClick={() => addToCart(product, addToast, cartItem, 1, defaultStore, userData)}
                            title={strings["Add to cart"]}> {" "} <i className="pe-7s-cart"></i>{" "} {strings["Add to cart"]}
                          </button>
                        )
                        :
                        (
                          <button disabled className="active">
                            {strings["Out of Stock"]}
                          </button>
                        )
                    }

                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        defaultStore={defaultStore}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        addtocart={addToCart}

        cartData={cartItem}
        userData={userData}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  addToCart: PropTypes.func,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

function defaultImage(product) {
  if(product.images && product.images.length > 0) {
    return product.images[0].imageUrl;
  } else if(product.image != null) {
    return product.imageUrl;
  } else {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    defaultStore: state.merchantData.defaultStore
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setProductID: (value) => {
      dispatch(setProductID(value));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductGridListSingle);
