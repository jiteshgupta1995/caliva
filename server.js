var express = require('express');
var app = express();
var port = 3001;

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});

var byNameAsc = [
  ['Amelia','Dexter.Trantow57@hotmail.com','LN','12:00'],
  ['Estevan','Aimee7@hotmail.com','LosAngels','01:00'],
  ['Florence','Jarrod.Bernier13@yahoo.com','LasVegas','11:00'],
  ['Rylan','Angelita_Weimann42@gmail.com','PA','06:00'],
  ['Tressa','Yadira1@hotmail.com','NY','14:00']
];

var byNameDesc = [
  ['Tressa','Yadira1@hotmail.com','NY','14:00'],
  ['Rylan','Angelita_Weimann42@gmail.com','PA','06:00'],
  ['Florence','Jarrod.Bernier13@yahoo.com','LasVegas','11:00'],
  ['Estevan','Aimee7@hotmail.com','LosAngels','01:00'],
  ['Amelia','Dexter.Trantow57@hotmail.com','LN','12:00']
];

var byAddressAsc = [
  ['Florence','Jarrod.Bernier13@yahoo.com','LasVegas','11:00'],
  ['Amelia','Dexter.Trantow57@hotmail.com','LN','12:00'],
  ['Estevan','Aimee7@hotmail.com','LosAngels','01:00'],
  ['Tressa','Yadira1@hotmail.com','NY','14:00'],
  ['Rylan','Angelita_Weimann42@gmail.com','PA','06:00']
];

var byAddressDesc = [
  ['Rylan','Angelita_Weimann42@gmail.com','PA','06:00'],
  ['Tressa','Yadira1@hotmail.com','NY','14:00'],
  ['Estevan','Aimee7@hotmail.com','LosAngels','01:00'],
  ['Amelia','Dexter.Trantow57@hotmail.com','LN','12:00'],
  ['Florence','Jarrod.Bernier13@yahoo.com','LasVegas','11:00']
];

var byTimeAsc = [
  ['Estevan','Aimee7@hotmail.com','LosAngels','01:00'],
  ['Rylan','Angelita_Weimann42@gmail.com','PA','06:00'],
  ['Florence','Jarrod.Bernier13@yahoo.com','LasVegas','11:00'],
  ['Amelia','Dexter.Trantow57@hotmail.com','LN','12:00'],
  ['Tressa','Yadira1@hotmail.com','NY','14:00']
];

var byTimeDesc = [
  ['Tressa','Yadira1@hotmail.com','NY','14:00'],
  ['Amelia','Dexter.Trantow57@hotmail.com','LN','12:00'],
  ['Florence','Jarrod.Bernier13@yahoo.com','LasVegas','11:00'],
  ['Rylan','Angelita_Weimann42@gmail.com','PA','06:00'],
  ['Estevan','Aimee7@hotmail.com','LosAngels','01:00']
];

app.get('/fetchrecord', (req, res) => {
  var key = req.query.sortKey;
  var order = req.query.order;
  res.setHeader('Content-Type', 'application/json');
  if(order == "asc" && key == "Name"){
    res.send(byNameAsc).status(200);
  }else if(order == "desc" && key == "Name"){
    res.send(byNameDesc).status(200);
  }else if(order == "asc" && key == "Address"){
    res.send(byAddressAsc).status(200);
  }else if(order == "desc" && key == "Address"){
    res.send(byAddressDesc).status(200);
  }else if(order == "asc" && key == "Time"){
    res.send(byTimeAsc).status(200);
  }else if(order == "desc" && key == "Time"){
    res.send(byTimeDesc).status(200);
  }else{
    res.send(byNameAsc).status(200);
  }
});