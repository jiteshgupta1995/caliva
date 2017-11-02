import React from "react";

const getThumbDownBtn = (showThumb, position, title, index) => {
    if (showThumb["thumbDown"] && position === title) {
        return <i 
            className="fa fa-thumbs-down" 
            onClick={()=> alert("ThumbDown")} 
            key={"up" + index}
        />;
    }
    return null;
};

export default getThumbDownBtn;