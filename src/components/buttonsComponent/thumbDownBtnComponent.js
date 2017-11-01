import React from "react";

const getThumbDownBtn = (showThumbDown, title, index) => {
    if (showThumbDown === title) {
        return <i 
            className="fa fa-thumbs-down" 
            onClick={()=> alert("ThumbDown")} 
            key={"up" + index}
        />;
    }
    return null;
};

export default getThumbDownBtn;