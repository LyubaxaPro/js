//  Запустить сервер. На стороне сервера должен храниться файл, внутри которого находится JSON строка.
//  В этой JSON строке хранится информация о массиве объектов. 
//  Реализовать на сервере функцию, которая принимает индекс и выдает содержимое ячейки массива по данному индексу.
//  Реализовать страницу с формой ввода для отправки запроса на сервер.

"use strict";
const filename = "2_arr.txt"

const fs = require("fs");

const express = require("express");

const app = express();
const port = 3006;
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

app.get("/get/by/index", function(request, response) {
    const index = request.query.index;
    let stringJSON = fs.readFileSync(filename, "utf8");
    let arr = JSON.parse(stringJSON);
    let answerJSON;
    if (index >= 0 && index < arr.length){
        answerJSON = JSON.stringify(arr[index], null, 4);
        console.log(arr[index]);
        console.log(answerJSON);
    } else {
        answerJSON = JSON.stringify("Index error.");
    }
    response.end(answerJSON);
});