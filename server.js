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
    header: [{ code: "name", title: "Name", isSortable: true },
        { code: "email", title: "Email", isSortable: true },
        { code: "address", title: "Address", isSortable: false },
        { code: "time", title: "Time", isSortable: true },
        { code: "status", title: "Status", isSortable: false, isCustom: true },
        { code: "action", title: "Action", isSortable: false, isCustom: true },
    ],
    body: {
        name: ["Amelia", "Tressa", "Florence", "Rylan", "Estevan"],
        email: [
            "Aimee7@hotmail.com",
            "Tressa1@hotmail.com",
            "Florence57@hotmail.com",
            "Rylan13@yahoo.com",
            "Estevan42@gmail.com",
        ],
        address: ["LasVegas", "LosAngeles", "Ln", "PA", "NY"],
        time: ["10:00", "06:00", "12:00", "11:00", "14:00"],
        status: {
            "thumbDown": true,
            "thumbUp": true,
        },
        action: {
            "edit": true,
            "block": true,
        },
    },
};

function sortBody(i, j) {
    var temp;
    Object.keys(data.body).forEach(function(k) {
        temp = data.body[k][i];
        data.body[k][i] = data.body[k][j];
        data.body[k][j] = temp;
    });
}

function dynamicSort(property, order) {
    var i,j,len = data.body[property].length;
    for (i = 0; i < len; i++) {
        for (j = 0; j < i; j++) {
            if (order === "desc") {
                if (data.body[property][i] > data.body[property][j]) {
                    sortBody(i, j);
                }
            } else {
                if (data.body[property][i] < data.body[property][j]) {
                    sortBody(i, j);
                }
            }
        }
    }
}

// api GET request for caliva
app.get("/fetchrecord", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    dynamicSort(req.query.sortKey, req.query.order);
    res.send(data).status(200);
});