"use strict";

// импортируем библиотеку
const express = require("express");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/task1";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// получение суммы чисел
app.get("/send", function(request, response) {
    const a = request.query.surname;
    const b = request.query.tel;
    const c = request.query.email;
    console.log("AAAAAAAAAAAAAAAa");
    response.end(JSON.stringify({
        result: "Заебись"
    }));
});

// // body
// function loadBody(request, callback) {
//     let body = [];
//     request.on('data', (chunk) => {
//         body.push(chunk);
//     }).on('end', () => {
//         body = Buffer.concat(body).toString();
//         callback(body);
//     });
// }

// // it is post
// app.post("/save/info", function(request, response) {
//     loadBody(request, function(body) {
//         const obj = JSON.parse(body);
//         const a = obj["a"];
//         const b = obj["b"];
//         const c = obj["c"];
//         const contentString = `A: ${a} B: ${b} C: ${c}`;
//         fs.writeFileSync("file.txt", contentString);
//         response.end(JSON.stringify({
//             result: "Save content ok"
//         }));
//     });
// });