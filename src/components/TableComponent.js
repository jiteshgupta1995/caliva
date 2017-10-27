import React, { Component } from 'react';
import { showAlert } from '../helper/NetworkRequest';

class TableComponent extends Component {
    constructor() {
        super()
        this.state = {
            order: "",
            sortKey: ""
        }
    }
    clickHandler(key, order = "asc") {
        if (this.state.sortKey === key) {
            if (this.state.order === "asc") {
                order = "desc";
            } else if (this.state.order === "desc") {
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
        this.setState({
            order: this.props.value.order,
            sortKey: this.props.value.sortKey
        });
    }
    sortArrow(head) {
        var button;
        if (head === this.state.sortKey && this.state.order === "asc") {
            button = <span><i className="fa fa-chevron-down header-sort" onClick={()=> this.clickHandler(head,"desc")}></i></span>
        } else if (head === this.state.sortKey && this.state.order === "desc") {
            button = <span><i className="fa fa-chevron-up header-sort" onClick={()=> this.clickHandler(head,"asc")}></i></span>
        } else {
            button = <span><i className="fa fa-chevron-up header-sort" onClick={()=> this.clickHandler(head,"asc")}></i><i className="fa fa-chevron-down header-sort" onClick={()=> this.clickHandler(head,"desc")}></i></span>
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
                          return (
                              <td key={"cell"+index+i}>
                              {
                                title in val ? val[title] : null
                              }{
                                  this.props.value.showEdit[0] && this.props.value.showEdit[1] === title
                                    ? (
                                      <i className="fa fa-pencil" onClick={()=> showAlert("Edit")} key={"edit"+index}></i>
                                  ) : null
                              }{
                                  this.props.value.showBlock[0] && this.props.value.showBlock[1] === title
                                    ? (
                                      <i className="fa fa-ban" onClick={()=> showAlert("Blocked")} key={"block"+index}></i>
                                  ) : null
                              }{
                                  this.props.value.showThumbDown[0] && this.props.value.showThumbDown[1] === title
                                    ? (
                                      <i className="fa fa-thumbs-up" onClick={()=> showAlert("ThumbUp")} key={"up"+index}></i>
                                  ) : null
                              }{    
                                  this.props.value.showThumbUp[0] && this.props.value.showThumbUp[1] === title
                                    ? (
                                      <i className="fa fa-thumbs-down" onClick={()=> showAlert("ThumbDown")} key={"down"+index}></i>
                                  ) : null
                                
                              }
                              </td>
                            );
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