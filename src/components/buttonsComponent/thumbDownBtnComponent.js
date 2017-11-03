import React from "react";
import PropTypes from "prop-types";

const getThumbDownBtn = (props) => {
    if (props.showThumb && props.title === "status") {
        return <i 
            className="fa fa-thumbs-down" 
            onClick={()=> alert("ThumbDown")} 
            key={"up" + props.index}
        />;
    }
    return null;
};

getThumbDownBtn.propTypes = {
    showThumb: PropTypes.any,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

getThumbDownBtn.defaultProps = {
    showThumb: "",
    title: "",
    index: 0,
};

export default getThumbDownBtn;