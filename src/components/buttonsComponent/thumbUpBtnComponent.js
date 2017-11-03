import React from "react";
import PropTypes from "prop-types";

const getThumbUpBtn = (props) => {
    if (props.showThumb && props.title === "status") {
        return <i 
            className="fa fa-thumbs-up" 
            onClick={()=> alert("ThumbUp")} 
            key={"down" + props.index}
        />;
    }
    return null;
};

getThumbUpBtn.propTypes = {
    showThumb: PropTypes.any,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

getThumbUpBtn.defaultProps = {
    showThumb: "",
    title: "",
    index: 0,
};

export default getThumbUpBtn;