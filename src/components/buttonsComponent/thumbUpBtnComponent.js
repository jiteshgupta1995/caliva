import React from "react";

const getThumbUpBtn = (showThumbUp, title, index) => {
    if (showThumbUp === title) {
        return <i 
            className="fa fa-thumbs-up" 
            onClick={()=> alert("ThumbUp")} 
            key={"down" + index}
        />;
    }
    return null;
};

export default getThumbUpBtn;