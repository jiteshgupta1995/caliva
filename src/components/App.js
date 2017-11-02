import React, { Component } from "react";
import TableComponent from "./TableComponent";
import { records } from "../helper/NetworkRequest";

class App extends Component {

    constructor(props) {
        super(props);
        this.getNewData = this.getNewData.bind(this);
        this.isDataLoaded = this.isDataLoaded.bind(this);
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
            header: [],
            body: {},
            sort: [],
            order: "asc",
            sortKey: "name",
            colSpan: [],
            rowSpan: [],
        };
    }

    componentWillMount() {
        var self = this;
        records(this.state.sortKey, this.state.order).then(function(d) {
            self.setState({ 
                body: d.body,
                header: d.header,
            });
        });
    }

    // Fetch records by api on every time sort action is performed and updating state
    getNewData(key, order) {
        var self = this;
        records(key, order).then(function(d) {
            self.setState({
                body: d.body,
                header: d.header,
                order: order,
                sortKey: key,
            });
        });
    }

    isDataLoaded(){
        if(this.state.header.length === 0){
            return <div>Loading</div>;
        }
        return <TableComponent value={this.state} onGetNewData={this.getNewData} />;
    }

    render() {
        return (
            this.isDataLoaded()
        );
    }
    
}

export default App;