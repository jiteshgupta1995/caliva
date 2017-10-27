import React, { Component } from 'react';
import TableComponent from "./TableComponent";
import {records} from '../helper/NetworkRequest';

let self;
class App extends Component {
  constructor(){
    super();
    self= this;
    this.state = {
      header: [
        "Name",
        "Email",
        "Address",
        "Time",
        "Status",
        "Edit"
      ],
      body:[],
      sort:["Name","Address","Time"],
      option: "Edit",
      showEdit: [true, "Edit"],
      showBlock: [true, "Edit"],
      showThumbDown: [true, "Status"],
      showThumbUp: [true, "Status"],
      order: "asc",
      sortKey: "Name"
    }
  }
  componentDidMount(){
   records().then(function(d){
      self.setState({body: d});
    });
  }
  fetchRecord(key,order){
    records(key,order).then(function(d){
      self.setState({body: d});
    });
  }
  render() {
    return ( this.state.body.length ) ? (
      <TableComponent value={this.state} method={this.fetchRecord} />
      ) : (<div>Loading</div>);
  }
}

export default App;
