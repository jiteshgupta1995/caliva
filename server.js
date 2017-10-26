var express = require('express');
var app = express();
var port = 3001;

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});

var data = [
  ['Amelia','Dexter.Trantow57@hotmail.com','LN','12:00'],
  ['Estevan','Aimee7@hotmail.com','LosAngels','01:00'],
  ['Florence','Jarrod.Bernier13@yahoo.com','LasVegas','11:00'],
  ['Rylan','Angelita_Weimann42@gmail.com','PA','06:00'],
  ['Tressa','Yadira1@hotmail.com','NY','14:00']
];

function sort(key, order){
  data.sort(function (a, b) {
    if(order == "asc" && key == "Name"){
      return a[0].localeCompare(b[0]);
    }else if(order == "desc" && key == "Name"){
      return b[0].localeCompare(a[0]);
    }else if(order == "asc" && key == "Address"){
      return a[2].localeCompare(b[2]);
    }else if(order == "desc" && key == "Address"){
      return b[2].localeCompare(a[2]);
    }else if(order == "asc" && key == "Time"){
      return a[3].localeCompare(b[3]);
    }else if(order == "desc" && key == "Time"){
      return b[3].localeCompare(a[3]);
    }
  });
}

app.get('/fetchrecord', (req, res) => {
  var key = req.query.sortKey;
  var order = req.query.order;
  res.setHeader('Content-Type', 'application/json');
  sort(key,order);
  res.send(data).status(200);
});