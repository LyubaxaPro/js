"use strict";
const filename = 'file.txt';
const fs = require("fs");
fs.writeFileSync(filename, '');

//Для того чтобы Node.js сервер мог передавать по запросу находящиеся у него статические файлы
// (изображения, аудио, HTML, CSS, JS), используется функция фреймворка Express static().

// импортируем библиотеку
const express = require("express");

// запускаем сервер
const app = express();
const port = 5000;
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
    request.on('data', (chunk) => {  //chunk - либо Buffer либо string
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        callback(body);
    });
}

function check_file(file, string){
    let obj_str = JSON.parse(string);
    let arr = [];
    const fs = require("fs");
    let file_str = fs.readFileSync(filename, "utf8");
    if (file_str.length != 0)
    {
        arr = JSON.parse(file_str);

        for (let i = 0; i < arr.length; i++){
            if ((arr[i]["phone"] === obj_str["phone"]) || (arr[i]["email"] === obj_str["email"]))
                return false;
        }
    }
    arr.push(obj_str);
    console.log(arr);
    fs.writeFileSync(filename, JSON.stringify(arr));
    return true;
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
        const surname = obj["surname"];
        const tel = obj["tel"];
        const email = obj["email"];
        const contentString = `{"surname" : "${surname}", "phone" : "${tel}", "email" : "${email}"}`;
        let check = check_file(filename, contentString);
        let message = "Save not OK"
        if (check)
            message = "Save OK"
        response.end(JSON.stringify({
            result: message
        }));
    });
});