import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link to="/">
        <img alt="Margarita" src={imageUrl} />
      </Link>
    </div>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
