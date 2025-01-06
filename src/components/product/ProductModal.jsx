import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";

import Swiper from "react-id-swiper";
import 'swiper/swiper.scss'

import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { setLoader } from "../../redux/actions/loaderActions";
import PropertiesBlock from "./sub-components/PropertiesBlock";
import QuantityBox from "./QuantityBox";
import AvailabilityInfo from "./AvailabilityInfo";
function ProductModal(props, strings) {
  const { product, cartData, defaultStore, userData, finalproductprice, finaldiscountedprice, setLoader } = props;



  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [selectedProductColor, setSelectedProductColor] = useState([]);
  const [quantityCount, setQuantityCount] = useState(product.quantityOrderMinimum || 10);
  const [currentImage, setCurrentImage] = useState(defaultImage(product));

  const addToCart = props.addtocart;
  const addToast = props.addtoast;

  useEffect(() => {
    getDefualtsOption()
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallerySwiper, thumbnailSwiper]);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: false
  };

  const thumbnailSwiperParams = {
    getSwiper: product.images.length > 4 && getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: false,
    slideToClickedSlide: true,
    navigation: {
      nextEl: product.images.length > 4 ? ".swiper-button-next" : '',
      prevEl: product.images.length > 4 ? ".swiper-button-prev" : ''
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };
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
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {product.images && product.images.length > 0 &&
                    product.images.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image" >
                            {currentImage != null &&
                              <img
                                src={currentImage}
                                className="img-fluid"
                                alt=""
                              />
                            }
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {product.images && product.images.length > 1 &&
                    product.images.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              onClick={() => setCurrentImage(single.imageUrl)}
                              src={single.imageUrl}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.description.name}</h2>
        
                <br />
                <div className="pro-details-list">
                  <p dangerouslySetInnerHTML={{ __html: product.description.description }}></p>
                  <br />
                  <ul>
                     
                    {product.productSpecifications.length && 
                      <li>
                        <span>{strings["Package size"]}</span>{product.productSpecifications.length}{" "} x {product.productSpecifications.width}{" "}
                        x {product.productSpecifications.height} Inches{" "}
                      </li>
                    }
                    <div className="d-flex">
                      <PropertiesBlock
                        title="Technical Information"
                        show={["construction", "main_material", "compostion"]}
                        data={product.properties}>
                      </PropertiesBlock>
                      <PropertiesBlock
                        title="Classifications"
                        show={["drape"]}
                        data={product.properties}>
                      </PropertiesBlock>
                      <PropertiesBlock
                        title="Sustainability Credentials"
                        show={["sustainability_credentials"]}
                        data={product.properties}>
                      </PropertiesBlock>
                      <div className="mr-2"><ul><li><span><b>SKU</b></span> {product.sku}</li></ul></div>
                    </div>
                    <hr />
                    <AvailabilityInfo price={product.finalPrice} minQuantity={product.quantityOrderMinimum} availableQuantity={product.quantity} />
                  </ul>
                </div>

                  
                {
        
                  <div className="pro-details-quality">
                    <QuantityBox quantity={quantityCount} maxQuantity={product.quantity} minQuantity={product.quantityOrderMinimum} setQuantityCb={setQuantityCount} />
                    <div className="pro-details-cart btn-hover">
                      {product.quantity > 0 ? (
                        <button
                          onClick={() => {
                            let options = [];
                            selectedProductColor.forEach((a) => {
                              options.push({ id: a.id })
                            })
                            addToCart(
                              product,
                              addToast,
                              cartData,
                              quantityCount,
                              defaultStore,
                              userData,
                              options, strings
                            )
                          }
                          }> Add to cart</button>
                      ) : (
                        <button disabled>Out of Stock</button>
                      )}
                    </div>
               
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  // addtocompare: PropTypes.func,
  // addtowishlist: PropTypes.func,
  // cartitems: PropTypes.array,
  // compareitem: PropTypes.object,
  // currency: PropTypes.object,
  // discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.string,
  finalproductprice: PropTypes.string,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool

  // wishlistitem: PropTypes.object
};

function defaultImage(product) {
  if (product.images && product.images.length > 0) {
    return product.images[0].imageUrl;
  } else if (product.image != null) {
    return product.imageUrl;
  } else {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    // cartitems: state.cartData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLoader: (value) => {
      dispatch(setLoader(value));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
