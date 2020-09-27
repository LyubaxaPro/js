// Запустить сервер. Реализовать на сервере функцию, которая принимает на вход числа A, B и C. 
// Функция должна выдавать массив целых чисел на отрезке от A до B, которые делятся на C нацело.

"use strict";

const fs = require("fs");

const express = require("express");

const app = express();
const port = 7008;
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

app.get("/get/array", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);
    let arr = [];
    for (let i = aInt; i <= bInt; i++){
        if (i % cInt == 0)
            arr.push(i);
    }
    const answerJSON = JSON.stringify({array: arr});
    response.end(answerJSON);
});