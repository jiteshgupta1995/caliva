var express = require("express");
var app = express();
var port = 3001;

app.listen(port, (err) => {
    if (err) {// eslint-disable-next-line no-console
        return console.log("something bad happened", err);
    }// eslint-disable-next-line no-console
    console.log(`server is listening on ${port}`);
});

// Add headers
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
});

var data = [
    {
        Name: "Amelia",
        Email: "Dexter.Trantow57@hotmail.com",
        Address: "LN",
        Time: "12:00",
    },
    {
        Name: "Estevan",
        Email: "Aimee7@hotmail.com",
        Address:"LosAngeles",
        Time: "01:00",
    },
    {
        Name: "Florence",
        Email: "Jarrod.Bernier13@yahoo.com",
        Address: "LasVegas",
        Time: "11:00",
    },
    {
        Name: "Rylan",
        Email: "Angelita_Weimann42@gmail.com",
        Address: "PA",
        Time: "06:00",
    },
    {
        Name: "Tressa",
        Email: "Yadira1@hotmail.com",
        Address: "NY",
        Time: "14:00",
    },
];


function sort(property){
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
// api GET request for caliva
app.get("/fetchrecord", (req, res) => {
    var key = req.query.sortKey;
    var order = req.query.order;
    res.setHeader("Content-Type", "application/json");
    if(order == "asc"){ // checks whether sortorder is ascending or descending
        data.sort(sort(key));
    }else{
        data.sort(sort("-"+key));
    }
    res.send(data).status(200);
});
