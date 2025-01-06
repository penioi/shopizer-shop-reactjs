import PropTypes from "prop-types";
import React from "react";

const AvailabilityInfo = ({ price, minQuantity, availableQuantity }) => {
  return (
    <>
      <div>Available: {availableQuantity}m </div>
      <div>Price: {price}/m</div>
      <div>Minimum order available: {minQuantity || 10}m</div>
    </>
  );
};

AvailabilityInfo.propTypes = {
  minQuantity: PropTypes.number,
  price: PropTypes.string,
  availableQuantityuantity: PropTypes.number,

};

export default AvailabilityInfo;
