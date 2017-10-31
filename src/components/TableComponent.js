import React from "react";
import PropTypes from "prop-types";

const TableComponent = (props) => {
	// called upon sort button clicked to change the order
	const clickHandler = (key, order = "asc") => {
		if (props.value.sortKey === key) {
			if (props.value.order === "asc") {
				order = "desc";
			} else if (props.value.order === "desc") {
				order = "asc";
			}
		}
		// fetching new data
		props.fetchUpdate(key, order);
	};
	// renders data for table body
	// decides whether data is shown from api or is it custom icons
	const showData = (val, title, index) => {
		var data, edit, block, thumbup, thumbdown;
		if ( val[title] !== undefined ) {
			data = <span>{ val[title] }</span>;
		} else {
			data = null;
		}
		// checking whether to show Edit icon
		if ( props.value.showEdit === title ) {
			edit = <i 
				className="fa fa-pencil" 
				onClick={()=> alert("Edit")} 
				key={"edit" + index}
			>
			</i>;
		} else {
			edit = null;
		}
		// checking whether to show Block icon
		if ( props.value.showBlock === title ) {
			block = <i 
				className="fa fa-ban" 
				onClick={()=> alert("Blocked")} 
				key={"block" + index}
			>
			</i>;
		} else {
			block = null;
		}
		// checking whether to show Thumbs up icon
		if ( props.value.showThumbUp === title ) {
			thumbup = <i 
				className="fa fa-thumbs-up" 
				onClick={()=> alert("ThumbUp")} 
				key={"down" + index}
			>
			</i>;
		} else {
			thumbup = null;
		}
		// checking whether to show Thumbs down icon
		if ( props.value.showThumbDown === title )
			thumbdown = <i 
				className="fa fa-thumbs-down" 
				onClick={()=> alert( "ThumbDown" )} 
				key={"up" + index}
			>
			</i>;
		else {
			thumbup = null;
		}
		return (
			<span>
				{data}
				{edit}
				{block}
				{thumbup}
				{thumbdown}
			</span>
		);
	};
	// checks whether colspan is required or not
	const columnState = (head) => {
		if ( props.value.colSpan.length &&
			props.value.colSpan[0] === head ) {

			return 2;
		} else {
			return 1;
		}
	};
	// returns column values and sort icons associated to it
	const columnVal = (head) => {
		var button, col;
		// checking if already selected sort sequence in ascending order
		if (head === props.value.sortKey &&
			props.value.order === "asc") {
			button = <span>
				<i 
					className="fa fa-chevron-down header-sort" 
					onClick={()=> clickHandler( head, "desc" )}
				>
				</i>
			</span>;

		}
		// checking if already selected sort sequence in descending order
		else if (head === props.value.sortKey &&
			props.value.order === "desc") {
			button = <span>
				<i 
					className="fa fa-chevron-up header-sort" 
					onClick={()=> clickHandler( head, "asc" )}
				>
				</i>
			</span>;
		}
		// otherwise showing both icon
		else {
			button = <span>
				<i 
					className="fa fa-chevron-up header-sort" 
					onClick={()=> clickHandler( head, "asc" )}
				>
				</i>
				<i 
					className="fa fa-chevron-down header-sort" 
					onClick={()=> clickHandler( head, "desc" )}
				>
				</i>
			</span>;
		}
		// checking for sort icon on table header is required or not
		if ( props.value.sort.indexOf( head ) > -1 ) {
			col = <div>
				<div className="col-xs-9 header-div" 
					onClick={()=> clickHandler( head )}>
					{ head }
				</div>
				<div className="col-xs-3 header-div">
					{ button }
				</div>
			</div>;
		} else {
			col = <div className="col-xs-12 header-div">
				{ head }
			</div>;
		}
		return col;
	};
	// returns body values and icons for edit, delete, thumbup, thumbdown
	const bodyVal = (val, index) => {
		return props.value.header.map((title, i) => {

			var bdVal;
			// checking whether colspan is required
			if ( props.value.colSpan.length &&
				props.value.colSpan[0] === title ) {

				bdVal = [
					<td key={ "cell" + title + index }>
						{
							showData( val, title, index )
						}
					</td>,
					<td key={"cell" + props.value.colSpan[1] + index}>
						{
							showData( val, props.value.colSpan[1], index )
						}
					</td>
				];

			}
			// checking whether rowspan is required or not 
			else if ( props.value.rowSpan.length &&
				props.value.rowSpan[0] === title &&
				index % props.value.rowSpan[1] === 0 ) {

				bdVal = <td key={ "cell" + title + index } 
					rowSpan={ props.value.rowSpan[1] }>
					{
						showData( val, title, index )
					}
				</td>;
				
			}
			// if already rowspan then skip
			else if ( props.value.rowSpan.length &&
				props.value.rowSpan[0] === title &&
				index % props.value.rowSpan[1] !== 0 ) {

				bdVal = null;

			}
			// else show data
			else {

				bdVal = <td key={"cell" + index + i}>
					{
						showData( val, title, index )
					}
				</td>;

			}
			return ( bdVal );
		});
	};
	var headerContent = props.value.header.map(head => {
		return (
			<th key={ head } colSpan={ columnState( head ) }>
				{
					columnVal( head )
				}
			</th>
		);
	});
	var bodyContent = props.value.body.map((val, index) => {
		return (
			<tr key={ index }>
				{
					bodyVal( val, index )
				}
			</tr>
		);
	});
	
	return (
		<div className="App">
			<table className="table table-bordered">
				<thead>
					<tr>
						{
							headerContent
						}
					</tr>
				</thead>
				<tbody>
					{
						bodyContent
					}
				</tbody>
			</table>
		</div>
	);

};

TableComponent.propTypes = {
	value: PropTypes.object.isRequired,
	fetchUpdate: PropTypes.func.isRequired
};

export default TableComponent;