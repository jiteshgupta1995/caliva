import React from "react";

const getThumbUpBtn = (showThumb, position, title, index) => {
    if (showThumb["thumbUp"] && position === title) {
        return <i 
            className="fa fa-thumbs-up" 
            onClick={()=> alert("ThumbUp")} 
            key={"down" + index}
        />;
    }
    return null;
};

export default getThumbUpBtn;