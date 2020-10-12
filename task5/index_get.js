"use strict";

// импортируем библиотеку
const express = require("express");
const filename = 'file.txt';
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 4000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static_get";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function find_email(filename, email){
    let arr = [];
    const fs = require("fs");
    let file_str = fs.readFileSync(filename, "utf8");
    arr = JSON.parse(file_str);

    for (let i = 0; i < arr.length; i++){
        if ((arr[i]["email"] === email))
            return JSON.stringify(arr[i]);
    }
    return JSON.stringify("Пользователя с такой электронной почтой нет.");
}

app.get("/send", function(request, response) {
    const email = request.query.email;
    let js_string = find_email(filename, email);
    response.end(js_string);
});