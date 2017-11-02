import React from "react";

const getThumbUpBtn = (position, title, index) => {
    if (position === title) {
        return <i 
            className="fa fa-thumbs-up" 
            onClick={()=> alert("ThumbUp")} 
            key={"down" + index}
        />;
    }
    return null;
};

export default getThumbUpBtn;