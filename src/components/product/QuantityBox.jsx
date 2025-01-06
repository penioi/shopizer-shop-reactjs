import PropTypes from "prop-types";
import React from "react";

const QuantityBox = ({ quantity, minQuantity, maxQuantity, setQuantityCb }) => {
  return (
    <>
      <div className="cart-plus-minus">
        <button onClick={() => setQuantityCb(quantity > (minQuantity || 10) ? quantity - 1 : quantity)} className="dec qtybutton">-</button>
        <input
          className="cart-plus-minus-box"
          type="text"
          defaultValue={quantity}
        />
        <button onClick={() => {
          setQuantityCb(quantity < maxQuantity ? quantity + 1 : quantity)
        }} className="inc qtybutton">+</button>
      </div>
    </>
  );
};

QuantityBox.propTypes = {
  minQuantity: PropTypes.number,
  maxQuantity: PropTypes.number,
  quantity: PropTypes.number,
  setQuantityCb: PropTypes.func,

};

export default QuantityBox;
