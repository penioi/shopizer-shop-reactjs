import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { connect } from "react-redux";

const Loader = ({ isLoading = false }) => {
    return (
        <div>
            <BounceLoader
                size={100}
                color={"#fb799c"}
                // color={window._env_.APP_THEME_COLOR}
                loading={isLoading}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.loading.isLoading
    };
};

export default connect(mapStateToProps)(Loader);
// export default Logo;
