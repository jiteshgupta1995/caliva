import React from "react";
import PropTypes from "prop-types";
import GetEditBtn from "./buttonsComponent/editBtnComponent";
import GetBlockBtn from "./buttonsComponent/blockBtnComponent";
import GetThumbUpBtn from "./buttonsComponent/thumbUpBtnComponent";
import GetThumbDownBtn from "./buttonsComponent/thumbDownBtnComponent";

const TableComponent = (props) => {

    // Checks whether colspan is required or not
    const isColSpan = (head) => {
        if (head !== undefined &&
            head === 2) {
            return 2;
        } else if (head !== undefined &&
            head === 0) {
            return 0;
        }else {
            return 1;
        }
    };

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
        let tableHeader;
        if(isColSpan(head.colSpan)){
            tableHeader = <th key={head.title} colSpan={isColSpan(head.colSpan)}>
                {getHeaderData(head)}
            </th>;
        }else{
            tableHeader = null;
        }
        return (tableHeader);
    });

    const processBodyData = (title, bIndex) => {
        let data;
        if (props.value.body[bIndex][title.code] !== undefined) {
            data = <span>{props.value.body[bIndex][title.code]}</span>;
        } else {
            data = null;
        }
        return (
            <span>
                {data}
                <GetEditBtn showEdit={title.isCustom} 
                    title={title.code} index={bIndex} />
                <GetBlockBtn showBlock={title.isCustom} 
                    title={title.code} index={bIndex} />
                <GetThumbUpBtn showThumb={title.isCustom} 
                    title={title.code} index={bIndex} />
                <GetThumbDownBtn showThumb={title.isCustom} 
                    title={title.code} index={bIndex} />
            </span>
        );
    };

    const getBodyData = (bodyIndex) => {
        return props.value.header.map((title, headerIndex) => {
            let bdVal;
            if ( title.rowSpan !== undefined &&
                bodyIndex % title.rowSpan === 0 ) {
                bdVal = <td key={ "cell" + title.code + bodyIndex } 
                    rowSpan={ title.rowSpan }>
                    {processBodyData(title, bodyIndex)}
                </td>;
            } else if ( title.rowSpan !== undefined &&
                bodyIndex % title.rowSpan !== 0 ) {
                bdVal = null;
            } else {
                bdVal = <td key={"cell" + bodyIndex + headerIndex}>
                    {processBodyData(title, bodyIndex)}
                </td>;
            }
            return(bdVal);
        });
    };

    // Renders data for table body
    // Decides whether data is shown from api or is it custom icons
    const bodyContent = props.value.body.map((key, index)=> {
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

TableComponent.defaultProps = {
    value: {
        header: [{ code: "name", title: "Name" },{ code: "email", title: "Email"}],
        body: [{name: "Some name", email: "Dexter.Trantow57@hotmail.com"}],
        order: "asc",
        sortKey: "name",
    },
    onGetNewData: function(){return;},
};

export default TableComponent;