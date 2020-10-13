// Запустить сервер. Реализовать на сервере функцию для сравнения трёх чисел и выдачи наибольшего из них.
// Реализовать страницу с формой ввода для отправки запроса на сервер

"use strict";

const fs = require("fs");

const express = require("express");

const app = express();
const port = 2001;
app.listen(port);
console.log("My server on port " + port);

app.get("/me/page", function(request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

app.get("/compare", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);
    const sInt = Math.max(aInt, bInt, cInt);
    const answerJSON = JSON.stringify({Max: sInt});
    response.end(answerJSON);
});