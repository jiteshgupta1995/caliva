import React from "react";

const getBlockBtn = (showBlock, title, index) => {
    if (showBlock === title) {
        return <i 
            className="fa fa-ban" 
            onClick={()=> alert("Blocked")} 
            key={"block" + index}
        />;
    }
    return null;
};

export default getBlockBtn;