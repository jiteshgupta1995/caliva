var express = require("express");
var app = express();
var port = 3001;

app.listen(port, (err) => {
    if (err) { // eslint-disable-next-line no-console
        return console.log("something bad happened", err);
    } // eslint-disable-next-line no-console
    console.log(`server is listening on ${port}`);
});

// Add headers
app.use(function(req, res, next) {
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

var data = {
    header: [{ code: "name", title: "Name", isSortable: true, colSpan:2 },
        { code: "email", title: "Email", isSortable: true, colSpan:0 },
        { code: "address", title: "Address", isSortable: false, rowSpan: 2 },
        { code: "time", title: "Time", isSortable: true },
        { code: "status", title: "Status", isSortable: false, isCustom: true },
        { code: "action", title: "Action", isSortable: false, isCustom: true },
    ],
    body: [
        {name: 'Amelia', email: 'Dexter.Trantow57@hotmail.com', address: 'LN', time: '12:00'},
        {name: 'Estevan', email: 'Aimee7@hotmail.com', address:'LosAngeles', time: '01:00'},
        {name: 'Florence', email: 'Jarrod.Bernier13@yahoo.com', address: 'LasVegas', time: '11:00'},
        {name: 'Rylan', email: 'Angelita_Weimann42@gmail.com', address: 'PA', time: '06:00'},
        {name: 'Tressa', email: 'Yadira1@hotmail.com', address: 'NY', time: '14:00'},
    ],
};

function sortBody(p,o){
    var property = p;
    var sortOrder = 1;
    if(o === "desc") {
        sortOrder = -1;
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}

// api GET request for caliva
app.get("/fetchrecord", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    data.body.sort(sortBody(req.query.sortKey,req.query.order));
    res.send(data).status(200);
});