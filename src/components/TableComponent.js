import React from "react";
import PropTypes from "prop-types";
import getEditBtn from "./buttonsComponent/editBtnComponent";
import getBlockBtn from "./buttonsComponent/blockBtnComponent";
import getThumbUpBtn from "./buttonsComponent/thumbUpBtnComponent";
import getThumbDownBtn from "./buttonsComponent/thumbDownBtnComponent";

const TableComponent = (props) => {

    // Checks whether colspan is required or not
    const isColSpan = (head) => {
        if (props.value.colSpan.length &&
            props.value.colSpan[0] === head) {
            return 2;
        } else {
            return 1;
        }
    };

    // Called upon sort button clicked to change the order
    const onSortClick = (key) => {
        var order = "asc";
        if (props.value.sortKey === key) {
            if (props.value.order === "asc") {
                order = "desc";
            } else if (props.value.order === "desc") {
                order = "asc";
            }
        }
        // Fetching new data
        props.onGetNewData(key, order);
    };

    // Renders data for table body
    // Decides whether data is shown from api or is it custom icons
    const processBodyData = (val, title, index) => {
        var data;
        if (val[title] !== undefined) {
            data = <span>{val[title]}</span>;
        } else {
            data = null;
        }
        return (
            <span>
                {data}
                {getEditBtn(props.value.showEdit ,title, index)}
                {getBlockBtn(props.value.showBlock ,title, index)}
                {getThumbUpBtn(props.value.showThumbUp ,title, index)}
                {getThumbDownBtn(props.value.showThumbDown, title, index)}
            </span>
        );
    };

    // Returns column values and sort icons associated to it
    const getHeaderData = (head) => {
        var button, col;
        // Checking if already selected sort sequence in ascending order
        if (head === props.value.sortKey &&
            props.value.order === "asc") {
            button = <span>
                <i 
                    className="fa fa-chevron-down header-sort" 
                    onClick={()=> onSortClick(head)}
                />
            </span>;

        } else if (head === props.value.sortKey &&
            props.value.order === "desc") {
            button = <span>
                <i 
                    className="fa fa-chevron-up header-sort" 
                    onClick={()=> onSortClick(head)}
                />
            </span>;
        } else {
            button = <span>
                <i 
                    className="fa fa-chevron-up header-sort" 
                    onClick={()=> onSortClick(head)}
                />
                <i 
                    className="fa fa-chevron-down header-sort" 
                    onClick={()=> onSortClick(head)}
                />
            </span>;
        }
        // Checking for sort icon on table header is required or not
        if (props.value.sort.indexOf(head) > -1) {
            col = <div>
                <div className="col-xs-9 header-div" 
                    onClick={()=> onSortClick(head)}>
                    {head}
                </div>
                <div className="col-xs-3 header-div">
                    {button}
                </div>
            </div>;
        } else {
            col = <div className="col-xs-12 header-div">{head}</div>;
        }
        return col;
    };

    // Returns body values and icons for edit, delete, thumbup, thumbdown
    const getBodyData = (val, index) => {
        return props.value.header.map((title, i) => {
            var bdVal;
            // Checking whether colspan is required
            if (props.value.colSpan.length &&
                props.value.colSpan[0] === title) {
                bdVal = [
                    <td key={ "cell" + title + index }>
                        {processBodyData(val, title, index)}
                    </td>,
                    <td key={"cell" + props.value.colSpan[1] + index}>
                        {processBodyData(val, props.value.colSpan[1], index)}
                    </td>,
                ];
            }
            // Checking whether rowspan is required or not 
            else if (props.value.rowSpan.length &&
                props.value.rowSpan[0] === title &&
                index % props.value.rowSpan[1] === 0) {

                bdVal = <td key={ "cell" + title + index } 
                    rowSpan={ props.value.rowSpan[1] }>
                    {processBodyData( val, title, index )}
                </td>;

            }
            // If already rowspan then skip
            else if (props.value.rowSpan.length &&
                props.value.rowSpan[0] === title &&
                index % props.value.rowSpan[1] !== 0) {
                bdVal = null;
            }
            // Else show data
            else {
                bdVal = <td key={"cell" + index + i}>
                    {processBodyData(val, title, index)}
                </td>;
            }
            return (bdVal);
        });
    };

    const headerContent = props.value.header.map(head => {
        return (
            <th key={head} colSpan={isColSpan(head)}>{getHeaderData(head)}</th>
        );
    });

    const bodyContent = props.value.body.map((val, index) => {
        return (<tr key={index}>{getBodyData(val, index)}</tr>);
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