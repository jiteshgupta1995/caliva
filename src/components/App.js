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
        "Status",
        "Edit"
      ],
      body:[],
      sort:["Name","Address"]
    }
  }
  componentDidMount(){
   records().then(function(d){
      self.setState({body: d});
    }); 
  }
  render() {
    return (<TableComponent value={this.state} />);
  }
}

export default App;
