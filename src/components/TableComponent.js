import React from "react";
import PropTypes from "prop-types";
import getEditBtn from "./buttonsComponent/editBtnComponent";
import getBlockBtn from "./buttonsComponent/blockBtnComponent";
import getThumbUpBtn from "./buttonsComponent/thumbUpBtnComponent";
import getThumbDownBtn from "./buttonsComponent/thumbDownBtnComponent";

const TableComponent = (props) => {

    let headerKey;
    // Checks whether colspan is required or not
    // const isColSpan = (head) => {
    //     if (props.value.colSpan.length &&
    //         props.value.colSpan[0] === head) {
    //         return 2;
    //     } else {
    //         return 1;
    //     }
    // };

    // Sort action handler
    const onSortClick = (key, order = "asc") => {
        var o = order;
        if (props.value.sortKey === key) {
            if (props.value.order === "asc") {
                o = "desc";
            } else if (props.value.order === "desc") {
                o = "asc";
            }
        }
        props.onGetNewData(key, o);
    };

    const getSortBtn = (head) => {
        if (head.code === props.value.sortKey &&
            props.value.order === "asc") {
            return <span>
                <i 
                    className="fa fa-chevron-down header-sort" 
                    onClick={()=> onSortClick(head.code, "desc")}
                />
            </span>;
        } else if (head.code === props.value.sortKey &&
            props.value.order === "desc") {
            return <span>
                <i 
                    className="fa fa-chevron-up header-sort" 
                    onClick={()=> onSortClick(head.code, "asc")}
                />
            </span>;
        } else {
            return <span>
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
    }

    const getHeaderData = (head) => {
        const button = getSortBtn(head);
        let col;
        if(headerKey === undefined){
            headerKey = head.code;
        }
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
        return col;
    };

    // Renders data for table header
    // Decides whether data along with sort icon is required or not
    const headerContent = props.value.header.map(head => {
        return (<th key={head.title}>{getHeaderData(head)}</th>);
    });

    const processBodyData = (title, bIndex) => {
        let data;
        if (Array.isArray(props.value.body[title.code])) {
            data = <span>{props.value.body[title.code][bIndex]}</span>;
        } else {
            data = null;
        }
        return (
            <span>
                {data}
                {getEditBtn(props.value.body[title.code], "action", title.code, bIndex)}
                {getBlockBtn(props.value.body[title.code], "action", title.code, bIndex)}
                {getThumbUpBtn(props.value.body[title.code], "status", title.code, bIndex)}
                {getThumbDownBtn(props.value.body[title.code], "status", title.code, bIndex)}
            </span>
        );
    };

    const getBodyData = (bodyIndex) => {
        return props.value.header.map((title, headerIndex) => {
            return(
                <td key={"cell" + bodyIndex + headerIndex}>
                    {processBodyData(title, bodyIndex)}
                </td>
            );
        });
    };

    // Renders data for table body
    // Decides whether data is shown from api or is it custom icons
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