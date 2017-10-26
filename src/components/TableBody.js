import React, { Component } from 'react';
import  {showAlert} from '../helper/NetworkRequest';

class TableBody extends Component {
	render() {
		this.props.method();
		return (
			<tbody>
		  		{
		  		this.props.value.map((val)=> {
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
		);
	}
}

export default TableBody;