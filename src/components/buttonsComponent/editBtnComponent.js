import React from "react";

const getEditBtn = (showEdit, title, index) => {
    if (showEdit === title) {
        return <i 
            className="fa fa-pencil" 
            onClick={()=> alert("Edit")} 
            key={"edit" + index}
        />;
    }
    return null;
};

export default getEditBtn;