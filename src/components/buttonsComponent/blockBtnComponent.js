import React from "react";
import PropTypes from "prop-types";

const getBlockBtn = (props) => {
    if (props.showBlock && props.title === "action") {
        return <i 
            className="fa fa-ban" 
            onClick={()=> alert("Blocked")} 
            key={"block" + props.index}
        />;
    }
    return null;
};

getBlockBtn.propTypes = {
    showBlock: PropTypes.any,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

getBlockBtn.defaultProps = {
    showBlock: "",
    title: "",
    index: 0,
};

export default getBlockBtn;