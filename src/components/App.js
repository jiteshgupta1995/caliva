import React, { Component } from "react";
import TableComponent from "./TableComponent";
import { records } from "../helper/NetworkRequest";

class App extends Component {

    constructor(props) {
        super(props);
        this.getNewData = this.getNewData.bind(this);
        this.isDataLoaded = this.isDataLoaded.bind(this);
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
                colSpan: d.options.colSpan,
                rowSpan: d.options.rowSpan,
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