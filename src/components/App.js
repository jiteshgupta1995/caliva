import React, { Component } from "react";
import TableComponent from "./TableComponent";
import { records } from "../helper/NetworkRequest";

class App extends Component {
	constructor() {
		super();
		// Data to be passed to table component
		// 'header' is for number of column to show in table
		// 'body' contains the data from api calls
		// 'sort' contains the column name where the filter is required
		// 'showEdit','showBlock','showThumbDown','showThumbUp' contains the name of column where
		// the edit button is to be shown otherwise will be empty
		// 'order' contains by default sort order, can be 'asc' or 'desc'
		// 'sortKey' contains column name which is default column to be sorted
		// 'colSpan' contains array of 2 column name where column span has to be applied
		// 'rowSpan' conatins array of 2, one containing column header and other number
		// of rows to be spanned
		this.state = {
			header: [
				"Name",
				"Email",
				"Address",
				"Time",
				"Status",
				"Edit"
			],
			body: [],
			sort: ["Name", "Address", "Time"],
			showEdit: "Edit",
			showBlock: "Edit",
			showThumbDown: "Status",
			showThumbUp: "Status",
			order: "asc",
			sortKey: "Name",
			colSpan: [],
			rowSpan: []
		};
		this.fetchRecord = this.fetchRecord.bind(this);

	}
	componentWillMount() {
		var self = this;
		records(this.state.sortKey, this.state.order).then(function(d) {
			self.setState({ body: d });
		});
	}
	// fetch records by api on every time sort action is performed and updating state
	fetchRecord(key, order) {
		var self = this;
		records(key, order).then(function(d) {
			self.setState({
				body: d,
				order: order,
				sortKey: key
			});
		});
	}
	render() {
		return (
			<TableComponent value={this.state} fetchUpdate={this.fetchRecord} />
		);
	}
}

export default App;