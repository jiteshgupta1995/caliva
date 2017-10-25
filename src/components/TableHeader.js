import React, { Component } from 'react';
import { records } from "../helper/helper";

let data = [];
class TableHeader extends Component {
    clickHandler(key,order){
      data = records(key,order);
    }
    render() {
        return (
            <thead>
              <tr>
              {
                this.props.value.map(head =>{
                return( head !== "Status" && head !== "Edit" && head !== "Email" ) ? (
                  <th key={head}>{head}
                      <i className="fa fa-chevron-up" onClick={()=> this.clickHandler(head,"asc")}></i><i className="fa fa-chevron-down" onClick={()=> this.clickHandler(head,"desc")}></i>
                  </th>
                ): (
                  <th key={head}>{head}</th>
                );
              })
            }
            </tr>
          </thead>
      );
    }
}

export default TableHeader;