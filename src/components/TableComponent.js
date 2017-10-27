import React, { Component } from 'react';
import { showAlert } from '../helper/NetworkRequest';

let self;
var x;
class TableComponent extends Component {
    constructor() {
      super()
      self = this;
      this.state = {
        order: "",
        sortKey: ""
      }
    }
    clickHandler(key, order="asc" ) {
      if(self.state.sortKey === key){
        if(self.state.order === "asc"){
          order = "desc";
        }else if(self.state.order === "desc"){
          order = "asc";
        }
      }
      this.props.method(key, order);
      this.setState({
        order: order,
        sortKey: key
      });
    }
    componentDidMount() {
      self.setState({
        order: self.props.value.order,
        sortKey: self.props.value.sortKey
      });
    }
    sortArrow(head) {
      var button;
      if (head === this.state.sortKey && this.state.order === "asc") {
          button = <span><i className="fa fa-chevron-down" onClick={()=> this.clickHandler(head,"desc")}></i></span>
      } else if (head === this.state.sortKey && this.state.order === "desc") {
          button = <span><i className="fa fa-chevron-up header-sort" onClick={()=> this.clickHandler(head,"asc")}></i></span>
      } else {
          button = <span><i className="fa fa-chevron-up header-sort" onClick={()=> this.clickHandler(head,"asc")}></i><i className="fa fa-chevron-down" onClick={()=> this.clickHandler(head,"desc")}></i></span>
      }
      return (button);
    }
    render() {
      return (
      <div className="App">
        <table className="table table-bordered">
          <thead>
              <tr>
              {
                this.props.value.header.map(head => {
                return( this.props.value.sort.indexOf(head) > -1 ) ? (
                  <th key={head}>
                    <div className="col-xs-9 header-div" onClick={()=> this.clickHandler(head)}>{head}</div>
                    <div className="col-xs-3 header-div">{this.sortArrow(head)}</div>
                  </th>
                ): (
                  <th key={head}>
                    <div className="col-xs-12 header-div">{head}</div>
                  </th>
                );
              })
            }
            </tr>
          </thead>
          <tbody>
            {
            this.props.value.body.map((val,index) => {
              return(
                <tr key={index}>
                  { this.props.value.header.map((title,i) => {
                      x = "cell"+index+i;
                      return (
                          <td key={x}>
                          {
                            title in val ? val[title] : [
                              self.props.value.showEdit[0] && self.props.value.showEdit[1] === title
                                ? (
                                  <i className="fa fa-pencil" onClick={()=> showAlert("Edit")} key={"edit"+index}></i>
                              ) : null
                              ,
                              self.props.value.showBlock[0] && self.props.value.showBlock[1] === title
                                ? (
                                  <i className="fa fa-ban" onClick={()=> showAlert("Blocked")} key={"block"+index}></i>
                              ) : null
                              ,
                              self.props.value.showThumbDown[0] && self.props.value.showThumbDown[1] === title
                                ? (
                                  <i className="fa fa-thumbs-up" key={"up"+index}></i>
                              ) : null
                              ,
                              self.props.value.showThumbUp[0] && self.props.value.showThumbUp[1] === title
                                ? (
                                  <i className="fa fa-thumbs-down" key={"down"+index}></i>
                              ) : null
                            ]
                          }
                          </td>
                        )
                    })
                  }
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