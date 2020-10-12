"use strict";

// импортируем библиотеку
const express = require("express");

// запускаем сервер
const app = express();
const port = 3000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));