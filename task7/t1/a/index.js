"use strict";

// импорт библиотеки
const express = require("express");
const filename = "cars.txt"

// запускаем сервер
const app = express();
const port = 4002;
app.listen(port);
console.log("Server on port " + port);

// заголовки для ответа
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function add(filename, obj_str){
    let arr = [];
    const fs = require("fs");
    let file_str = fs.readFileSync(filename, "utf8");
    arr = JSON.parse(file_str);
    arr.push(obj_str);
    fs.writeFileSync(filename, JSON.stringify(arr));
}

function get(filename, key){
    let arr = [];
    const fs = require("fs");
    let file_str = fs.readFileSync(filename, "utf8");
    arr = JSON.parse(file_str);

    for (let i = 0; i < arr.length; i++){
        if (arr[i]['car'] == key){
            return JSON.stringify(arr[i]);
        }
    }
    return null;
}

// загрузка тела
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// приём запроса
app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const car = obj.car;
        const cost = obj.cost;
        add(filename, {'car' : car, 'cost' : parseInt(cost)});
        let s = "Car added.";
        response.end(JSON.stringify({
            answer: s
        }));
    });
});

app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const car = obj.car;
        const s = get(filename, car);
        response.end(JSON.stringify({
            answer: s
        }));
    });
});

