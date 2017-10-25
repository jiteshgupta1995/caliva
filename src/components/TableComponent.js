import React, { Component } from 'react';
import {records, showAlert} from '../helper/helper';

let self;
class TableComponent extends Component {
  constructor(){
    super()
    self = this;
    this.state = {
      header: [],
      body:[],
      sort:[]
    }
  }
  clickHandler(key, order){
    records(key,order).then(function(d){
      self.setState({body: d});
    });
  }
  componentDidMount(){
    self.setState({
      header: self.props.value.header,
      body: self.props.value.body,
      sort: self.props.value.sort
    });
  }
  render() {
    // this.changeState();
    return (
      <div className="App">
        <table className="table table-bordered">
          <thead>
              <tr>
              {
                this.state.header.map(head =>{
                return( this.state.sort.indexOf(head) > -1 ) ? (
                  <th key={head}>{head}
                     <span> <i className="fa fa-chevron-up" onClick={()=> this.clickHandler(head,"asc")}></i><i className="fa fa-chevron-down" onClick={()=> this.clickHandler(head,"desc")}></i></span>
                  </th>
                ): (
                  <th key={head}>{head}</th>
                );
              })
            }
            </tr>
          </thead>
          <tbody>
            {
            this.state.body.map((val)=> {
              return(
                <tr key={val.name}>
                  <td>{val.name}</td>
                  <td>{val.email}</td>
                  <td>{val.address}</td>
                  <td><i className="fa fa-thumbs-up"></i><i className="fa fa-thumbs-down"></i></td>
                  <td><i className="fa fa-pencil" onClick={()=> showAlert("Edit")}></i><i className="fa fa-ban" onClick={()=> showAlert("Blocked")}></i></td>
                </tr>
              );
            })
          }
        </tbody>
        </table>
      </div>
    );
  }
}

export default TableComponent;
