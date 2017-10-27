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
    showData(val,title,index){
      // console.log(this.props.value.showEdit[1],title,val,index);
      return(
        <span>
        {
            title in val ? <div>{val[title]}</div> : null
        }
        {    this.props.value.showEdit[0] && this.props.value.showEdit[1] === title
              ? (
                <i className="fa fa-pencil" onClick={()=> showAlert("Edit")} key={"edit"+index}></i>
            ) : null
        }
        {
            this.props.value.showBlock[0] && this.props.value.showBlock[1] === title
              ? (
                <i className="fa fa-ban" onClick={()=> showAlert("Blocked")} key={"block"+index}></i>
            ) : null
        }
        {
            this.props.value.showThumbDown[0] && this.props.value.showThumbDown[1] === title
              ? (
                <i className="fa fa-thumbs-up" onClick={()=> showAlert("ThumbUp")} key={"up"+index}></i>
            ) : null
        }
        {
            this.props.value.showThumbUp[0] && this.props.value.showThumbUp[1] === title
              ? (
                <i className="fa fa-thumbs-down" onClick={()=> showAlert("ThumbDown")} key={"down"+index}></i>
            ) : null
            
        }
        </span>
      );
    }
    render() {
      var colSpanVal;
        return (
          <div className="App">
            <table className="table table-bordered">
              <thead>
                <tr>
                {
                  this.props.value.header.map(head => {
                    return( 
                        this.props.value.colSpan.length && this.props.value.colSpan[0] === head 
                        ? colSpanVal = 2 : colSpanVal = 1,

                      <th key={head} colSpan={colSpanVal}>
                      {
                        this.props.value.sort.indexOf(head) > -1 ? (                   
                          <div>
                          <div className="col-xs-9 header-div" onClick={()=> this.clickHandler(head)}>{head}</div>
                          <div className="col-xs-3 header-div">{this.sortArrow(head)}</div>
                          </div>
                        ): (
                          <div className="col-xs-12 header-div">{head}</div>
                        )
                      }
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
                      { 
                        this.props.value.header.map((title,i) => {
                          return (
                            this.props.value.colSpan.length && this.props.value.colSpan[0] === title
                            ? [
                                <td key={"cell"+title+index}>{this.showData(val,title,index)}</td>,
                                <td key={"cell"+this.props.value.colSpan[1]+index}>{this.showData(val,this.props.value.colSpan[1],index)}</td>
                            ] :  
                              this.props.value.rowSpan.length && this.props.value.rowSpan[0] === title && index % this.props.value.rowSpan[1] === 0
                              ? [
                                <td key={"cell"+title+index} rowSpan={this.props.value.rowSpan[1]}>{this.showData(val,title,index)}</td>
                              ] : 
                                this.props.value.rowSpan.length && this.props.value.rowSpan[0] === title && index % this.props.value.rowSpan[1] !== 0
                                ? [ 
                                  null 
                                ] : [
                                  <td key={"cell"+index+i}>
                                    {this.showData(val,title,index)}
                                  </td>
                              ]
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