import React, { Component } from 'react';
import {records, showAlert} from '../helper/helper';

let self;
class TableComponent extends Component {
  constructor(){
    super()
    self = this;
    this.state = {
      body:[],
      sort:[],
      order: "",
      sortKey: ""
    }
  }
  clickHandler(key, order){
    records(key,order).then(function(d){
      self.setState({
        body: d,
        order: order,
        sortKey: key
      });
    });
  }
  componentDidMount(){
    self.setState({
      body: self.props.value.body,
      sort: self.props.value.sort,
      order: self.props.value.order,
      sortKey: self.props.value.sortKey
    });
  }
  displayData(val){
    return val.map((v)=> {
      return(
        <td key={v}>{v}</td>
      );
    })
  }
  sortArrow(head){
    var button;
    if( head === this.state.sortKey && this.state.order === "asc" ){
        button = <i className="fa fa-chevron-down" onClick={()=> this.clickHandler(head,"desc")}></i>
      }else if( head === this.state.sortKey && this.state.order === "desc" ){
        button = <i className="fa fa-chevron-up" onClick={()=> this.clickHandler(head,"asc")}></i>
      }else{
        button = <span><i className="fa fa-chevron-up" onClick={()=> this.clickHandler(head,"asc")}></i><i className="fa fa-chevron-down" onClick={()=> this.clickHandler(head,"desc")}></i></span>
      }
    return ( <span>{button}</span> );
  }
  showStatus(){
    return( this.props.value.header.indexOf(this.props.value.showStatus) > -1) ? (
      <td>
        <i className="fa fa-thumbs-up"></i><i className="fa fa-thumbs-down"></i>
      </td>
    ): (
      <td></td>
    );
  }
  showIcon(){
    return( this.props.value.header.indexOf(this.props.value.option) > -1) ? (
      <td>
        <i className="fa fa-pencil" onClick={()=> showAlert("Edit")}></i>
        <i className="fa fa-ban" onClick={()=> showAlert("Blocked")}></i>
      </td>
    ): (
      <td></td>
    );
  }
  render() {
    // this.changeState();
    return (
      <div className="App">
        <table className="table table-bordered">
          <thead>
              <tr>
              {
                this.props.value.header.map(head =>{
                return( this.state.sort.indexOf(head) > -1 ) ? (
                  <th key={head}>{head}
                    {this.sortArrow(head)}
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
            this.state.body.map((val, index)=> {
              return(
                <tr key={index}>
                  {this.displayData(val)}
                  {this.showStatus()}
                  {this.showIcon()}
                </tr>
               )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableComponent;
