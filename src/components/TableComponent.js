import React, { Component } from 'react';
// helper function for showing alert when some action happens
import { showAlert } from '../helper/NetworkRequest';

class TableComponent extends Component {
    clickHandler(key, order = "asc") {
      // function called upon sort button clicked to change the order
        if (this.props.value.sortKey === key) {
            if (this.props.value.order === "asc") {
                order = "desc";
            } else if (this.props.value.order === "desc") {
                order = "asc";
            }
        }
      // fetching new data by api from parent method
        this.props.fetchUpdate(key, order);
    }
    sortArrow(head) {
      // function to check column clicked and current order
      // so that it can show which arrow to show in header of the table
        var button;
        if (head === this.props.value.sortKey && this.props.value.order === "asc") { // checking if already selected sort sequence in ascending order
            
            button = <span><i className="fa fa-chevron-down header-sort" onClick={()=> this.clickHandler(head,"desc")}></i></span>
        
        } else if (head === this.props.value.sortKey && this.props.value.order === "desc") { // checking if already selected sort sequence in descending order

            button = <span><i className="fa fa-chevron-up header-sort" onClick={()=> this.clickHandler(head,"asc")}></i></span>
       
        } else { // otherwise showing both icon

            button = <span><i className="fa fa-chevron-up header-sort" onClick={()=> this.clickHandler(head,"asc")}></i><i className="fa fa-chevron-down header-sort" onClick={()=> this.clickHandler(head,"desc")}></i></span>
        
        }
        return (button);
    }
    showData(val,title,index){
      // function to render data for table body
      // decides whether data is shown from api or is it custom icons
      return(
        <span>
        {
            title in val // checking whether the table header exist in api data
            ? 
            <div>
              {
                val[title] // shows the data from object
              }
            </div> : null // otherwise null
        }
        { this.props.value.showEdit === title // checking whether to show Edit icon
              ? (
                <i className="fa fa-pencil" onClick={()=> showAlert("Edit")} key={"edit"+index}></i>
            ) : null
        }
        {
            this.props.value.showBlock === title // checking whether to show Block icon
              ? (
                <i className="fa fa-ban" onClick={()=> showAlert("Blocked")} key={"block"+index}></i>
            ) : null
        }
        {
            this.props.value.showThumbUp === title // checking whether to show Thumbs up icon
              ? (
                <i className="fa fa-thumbs-up" onClick={()=> showAlert("ThumbUp")} key={"down"+index}></i>
            ) : null
            
        }
        {
            this.props.value.showThumbDown === title // checking whether to show Thumbs down icon
              ? (
                <i className="fa fa-thumbs-down" onClick={()=> showAlert("ThumbDown")} key={"up"+index}></i>
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
                  this.props.value.header.map(head => { // rendering header to show on table
                    return( 
                        this.props.value.colSpan.length && this.props.value.colSpan[0] === head // checking whether colspan is required or not
                        ? colSpanVal = 2 : colSpanVal = 1 // sets 2 if required else 1
                        ,

                      <th key={head} colSpan={colSpanVal}>
                      {
                        this.props.value.sort.indexOf(head) > -1 ? (  // checking whether the sort arrow is required or not           
                          <div>
                            <div className="col-xs-9 header-div" onClick={()=> this.clickHandler(head)}>{head}</div>
                            <div className="col-xs-3 header-div">
                            {
                              this.sortArrow(head) // invokes sortArrow function to get info on sorting arrow icon on header
                            }
                            </div>
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
                this.props.value.body.map((val,index) => { // rendering body to show on table
                  return(
                    <tr key={index}>
                      { 
                        this.props.value.header.map((title,i) => { // getting header names for data query
                          return (
                            this.props.value.colSpan.length && this.props.value.colSpan[0] === title // checking whether colspan is required or not
                            ? [
                                <td key={"cell"+title+index}>
                                {
                                  this.showData(val,title,index) // fetching data for the current column element
                                }
                                </td>,
                                <td key={"cell"+this.props.value.colSpan[1]+index}>
                                {
                                  this.showData(val,this.props.value.colSpan[1],index) // fetching data for the next column which is to be spanned
                                }
                                </td>
                            ] :  
                              this.props.value.rowSpan.length && this.props.value.rowSpan[0] === title && index % this.props.value.rowSpan[1] === 0 // checking whether rowspan is required or not
                              ? [
                                <td key={"cell"+title+index} rowSpan={this.props.value.rowSpan[1]}>
                                {
                                  this.showData(val,title,index) // fetching data for the current row element
                                }
                                </td>
                              ] : 
                                this.props.value.rowSpan.length && this.props.value.rowSpan[0] === title && index % this.props.value.rowSpan[1] !== 0 // checking whether to skip if already rowspan
                                ? [ 
                                  null // shows nothing as it is to be rowspan
                                ] : [
                                  <td key={"cell"+index+i}>
                                    {
                                      this.showData(val,title,index) // calling function to show data from api or custom icons set
                                    }
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