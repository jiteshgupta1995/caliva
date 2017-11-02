import React from "react";
import PropTypes from "prop-types";
import getEditBtn from "./buttonsComponent/editBtnComponent";
import getBlockBtn from "./buttonsComponent/blockBtnComponent";
import getThumbUpBtn from "./buttonsComponent/thumbUpBtnComponent";
import getThumbDownBtn from "./buttonsComponent/thumbDownBtnComponent";

const TableComponent = (props) => {
    var headerKey;
    // Checks whether colspan is required or not
    // const isColSpan = (head) => {
    //     if (props.value.colSpan.length &&
    //         props.value.colSpan[0] === head) {
    //         return 2;
    //     } else {
    //         return 1;
    //     }
    // };

    // Called upon sort button clicked to change the order
    const onSortClick = (key, order = "asc") => {
        var o = order;
        if (props.value.sortKey === key) {
            if (props.value.order === "asc") {
                o = "desc";
            } else if (props.value.order === "desc") {
                o = "asc";
            }
        }
        // Fetching new data
        props.onGetNewData(key, o);
    };

    // Renders data for table body
    // Decides whether data is shown from api or is it custom icons
    const processBodyData = (title, bIndex) => {
        var data;
        if (props.value.body[title.code].length !== 0) {
            data = <span>{props.value.body[title.code][bIndex]}</span>;
        } else {
            data = null;
        }
        return (
            <span>
                {data}
                {getEditBtn("Action", title.title, bIndex)}
                {getBlockBtn("Action", title.title, bIndex)}
                {getThumbUpBtn("Status", title.title, bIndex)}
                {getThumbDownBtn("Status", title.title, bIndex)}
            </span>
        );
    };

    // Returns column values and sort icons associated to it
    const getHeaderData = (head) => {
        var button, col;

        // Checking if already selected sort sequence in ascending order
        if (head.code === props.value.sortKey &&
            props.value.order === "asc") {
            button = <span>
                <i 
                    className="fa fa-chevron-down header-sort" 
                    onClick={()=> onSortClick(head.code, "desc")}
                />
            </span>;

        } else if (head.code === props.value.sortKey &&
            props.value.order === "desc") {
            button = <span>
                <i 
                    className="fa fa-chevron-up header-sort" 
                    onClick={()=> onSortClick(head.code, "asc")}
                />
            </span>;
        } else {
            button = <span>
                <i 
                    className="fa fa-chevron-up header-sort" 
                    onClick={()=> onSortClick(head.code, "asc")}
                />
                <i 
                    className="fa fa-chevron-down header-sort" 
                    onClick={()=> onSortClick(head.code, "desc")}
                />
            </span>;
        }
        // Checking for sort icon on table header is required or not
        if (head.isSortable) {
            col = <div>
                <div className="col-xs-9 header-div" 
                    onClick={()=> onSortClick(head.code)}>
                    {head.title}
                </div>
                <div className="col-xs-3 header-div">
                    {button}
                </div>
            </div>;
        } else {
            col = <div className="col-xs-12 header-div">{head.title}</div>;
        }

        if(head["isCustom"] === undefined){
            headerKey = head.code;
        }
        return col;
    };

    // Returns body values and icons for edit, delete, thumbup, thumbdown
    const getBodyData = (bodyIndex) => {
        return props.value.header.map((title, headerIndex) => {
            return(
                <td key={"cell" + bodyIndex + headerIndex}>
                    {processBodyData(title, bodyIndex)}
                </td>
            );
        });
    };

    const headerContent = props.value.header.map(head => {
        return (
            <th key={head.title}>{getHeaderData(head)}</th>
        );
    });

    const bodyContent = props.value.body[headerKey].map((key, index)=> {
        return (<tr key={index}>{getBodyData(index)}</tr>);
    });

    return (
        <div className="App">
            <table className="table table-bordered">
                <thead><tr>{headerContent}</tr></thead>
                <tbody>{bodyContent}</tbody>
            </table>
        </div>
    );

};

TableComponent.propTypes = {
    value: PropTypes.object.isRequired,
    onGetNewData: PropTypes.func.isRequired,
};

export default TableComponent;