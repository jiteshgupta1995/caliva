import React, { Component } from "react";
import TableComponent from "./TableComponent";
import { records } from "../helper/NetworkRequest";

class App extends Component {

    constructor(props) {
        super(props);
        this.getNewData = this.getNewData.bind(this);
        this.state = {
            header: [],
            body: [],
            order: "asc",
            sortKey: "name",
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

    render() {
        return (
            <TableComponent value={this.state} onGetNewData={this.getNewData} />
        );
    }

}

export default App;