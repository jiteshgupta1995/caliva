import axios from "axios";

export function records( key= "Name", order = "asc" ) {
    return axios.get(`http://localhost:3001/fetchRecord?sortKey=${key}&order=${order}`,{
      method: 'GET'
    }).then(function(res){
    	console.log(res.data);
        return res.data;
    }).catch((error) => {
        console.error(error);
    });
}

export function showAlert(val){
	alert(val+" is clicked");
}