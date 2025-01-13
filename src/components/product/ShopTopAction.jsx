import PropTypes from "prop-types";
import React from "react";
import { setActiveLayout } from "../../helpers/product";


const ShopTopAction = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount,
  strings,
  offset,
  count
}) => {
  const startIndex = (offset - 1) * count + 1;
  const endIndex =  Math.min(offset * count, productCount);
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        
        <p>
          {strings["Showing"]} {startIndex}-{endIndex} of {productCount} {strings["result"]}
        </p>
      </div>

      <div className="shop-tab">
        <select
          onChange={e => getFilterSortParams("filterSort", e.target.value)}>
          <option value="default">Sort by</option>
          <option value="priceHighToLow">Price - High to Low</option>
          <option value="priceLowToHigh">Price - Low to High</option>
          <option value="quantityHighToLow">Quantity - High to Low</option>
          <option value="quantityLowToHigh">Quantity - Low to High</option>
        </select>
        <button
          onClick={e => {
            getLayout("grid two-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={e => {
            getLayout("grid three-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
          onClick={e => {
            getLayout("list");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div>
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};

export default ShopTopAction;
