import React from "react";

const getBlockBtn = (position, title, index) => {
    if (position === title) {
        return <i 
            className="fa fa-ban" 
            onClick={()=> alert("Blocked")} 
            key={"block" + index}
        />;
    }
    return null;
};

export default getBlockBtn;