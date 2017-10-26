import React, { Component } from 'react';
import './App.css';
import TableComponent from "./TableComponent";
import {records} from '../helper/helper';

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
      showStatus: "Status",
      order: "asc",
      sortKey: "Name"
    }
  }
  componentDidMount(){
   records().then(function(d){
      self.setState({body: d});
    });
  }
  render() {
    return ( this.state.body.length ) ? (
      <TableComponent value={this.state} />
      ) : (<div>Loading</div>);
  }
}

export default App;
