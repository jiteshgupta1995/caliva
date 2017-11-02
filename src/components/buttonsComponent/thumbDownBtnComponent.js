import React from "react";

const getThumbDownBtn = (position, title, index) => {
    if (position === title) {
        return <i 
            className="fa fa-thumbs-down" 
            onClick={()=> alert("ThumbDown")} 
            key={"up" + index}
        />;
    }
    return null;
};

export default getThumbDownBtn;