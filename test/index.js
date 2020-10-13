"use strict";


//Для того чтобы Node.js сервер мог передавать по запросу находящиеся у него статические файлы
// (изображения, аудио, HTML, CSS, JS), используется функция фреймворка Express static().

// импортируем библиотеку
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 4000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов

//В качестве параметра Express static() принимает имя директории, в которой находятся все статические файлы, 
//но при запросе самих файлов указывать в URL директорию не нужно. Поиск будет осуществляться относительно указанной директории.

// Имя каталога текущего модуля. Это то же самое, что path.dirname()и __filename.
//каталог, в котором находится исполняемый в данный момент скрипт

//Напротив, .дает вам каталог, из которого вы запускали nodeкоманду в окне терминала (т.е. ваш рабочий каталог), когда вы используете такие библиотеки
//Технически он начинается как ваш рабочий каталог,
const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// body
function loadBody(request, callback) {
    let body = [];
    console.log("AAAAAAa");
    request.on('data', (chunk) => {  //chunk - либо Buffer либо string
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        callback(body);
    });
}

// it is post
// В этом коде происходит:

// приём POST запроса
// загрузка тела POST запроса
// извлечение полей из полученного тела POST запроса
// сохранение информации в файл
app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        console.log("AAAAAAa");
        console.log(obj);
        const f1 = obj["f1_v"];
        const f2 = obj["f2_v"];
        const f3 = obj["f3_v"];
        const contentString = `A: ${f1} B: ${f2} C: ${f3}`;
        fs.writeFileSync("file.txt", contentString);
        response.end(JSON.stringify({
            result: "Save content ok"
        }));
    });
});