"use strict";

// импорт библиотек
const express = require("express");
const request = require("request");

// запускаем сервер
const app = express();
const port = 4000;
app.listen(port);
console.log(`Server on port ${port}`);

const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// функция для отправки POST запроса на другой сервер
function sendPost(url, body, callback) {
    // задаём заголовки
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    // отправляем запрос
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

// принимаем GET запрос и отправляем POST запрос на другой сервер
app.get("/create/new/car", function(request, response) {
    const car = request.query.car;
    const cost = request.query.cost;
    console.log(car + ' ' + cost);
    sendPost("http://localhost:4002/insert/record", JSON.stringify({
        car: car,
        cost: cost
    }), function(answerString) {
        //const answerObject = JSON.parse(answerString);
        //const answer = answerObject.answer;
        //response.end("Answer: " + answer);
        response.end(answerString);
    });
});

app.get("/get/data/car", function(request, response) {
    const car = request.query.car;
    sendPost("http://localhost:4002/select/record", JSON.stringify({
        car: car
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        //const answer = answerObject.answer;
        response.end(answerString);
    });
});

app.get("/create/new/warehouse", function(request, response) {
    const warehouse = request.query.warehouse;
    const cars_arr = request.query.cars_arr;
    sendPost("http://localhost:4001/insert/record", JSON.stringify({
        warehouse: warehouse,
        cars_arr: cars_arr
    }), function(answerString) {
        // const answerObject = JSON.parse(answerString);
        // const answer = answerObject.answer;
        response.end(answerString);
    });
});

app.get("/get/data/warehouse", function(request, response) {
    const warehouse = request.query.warehouse;
    sendPost("http://localhost:4001/select/record", JSON.stringify({
        warehouse: warehouse
    }), function(answerString) {
        // const answerObject = JSON.parse(answerString);
        // const answer = answerObject.answer;
        response.end(answerString);
    });
});
