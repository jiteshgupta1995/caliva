import React from "react";

const getBlockBtn = (showBlock, position, title, index) => {
    if (showBlock["block"] && position === title) {
        return <i 
            className="fa fa-ban" 
            onClick={()=> alert("Blocked")} 
            key={"block" + index}
        />;
    }
    return null;
};

export default getBlockBtn;