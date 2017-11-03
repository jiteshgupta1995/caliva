import React from "react";
import PropTypes from "prop-types";

const getEditBtn = (props) => {
    if (props.showEdit && props.title === "action") {
        return <i 
            className="fa fa-pencil" 
            onClick={()=> alert("Edit")} 
            key={"edit" + props.index}
        />;
    }
    return null;
};

getEditBtn.propTypes = {
    showEdit: PropTypes.any,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

getEditBtn.defaultProps = {
    showEdit: "",
    title: "Name",
    index: 0,
};

export default getEditBtn;