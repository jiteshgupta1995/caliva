import React from "react";

const getEditBtn = (showEdit, position, title, index) => {
    if (showEdit["edit"] && position === title) {
        return <i 
            className="fa fa-pencil" 
            onClick={()=> alert("Edit")} 
            key={"edit" + index}
        />;
    }
    return null;
};

export default getEditBtn;