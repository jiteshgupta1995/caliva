import React from "react";

const getEditBtn = (position, title, index) => {
    if (position === title) {
        return <i 
            className="fa fa-pencil" 
            onClick={()=> alert("Edit")} 
            key={"edit" + index}
        />;
    }
    return null;
};

export default getEditBtn;