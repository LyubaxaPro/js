// Создать сервер. В оперативной памяти на стороне сервера создать массив, в котором хранится информация о пользователях
//  (логин, пароль, хобби, возраст). На основе cookie реализовать авторизацию пользователей.
//  Реализовать возможность для авторизованного пользователя просматривать информацию о себе.

//http://localhost:4000/get_data.html

"use strict";

const data = [{'login' : 'Ann', 'password' : '123aa', 'hobby' : 'cooking', 'age' : 25},
{'login' : 'Leo', 'password' : 'qwerty', 'hobby' : 'football', 'age' : 10},
{'login' : 'Rico', 'password' : 'rrr', 'hobby' : 'reading', 'age' : 16}]

// импортируем библиотеки
const express = require("express");
const cookieSession = require("cookie-session");

// запускаем сервер
const app = express();
const port = 4000;
app.listen(port);
console.log(`Server on port ${port}`);

// работа с сессией
app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));
const way = __dirname + "/static";
app.use(express.static(way));


function get_user(array, login, password){
    for (let i = 0; i < array.length; i++){
        if (array[i]['login'] === login && array[i]['password'] === password)
        {
            let user = {};
            Object.assign(user, array[i]);
            user['status'] = true;
            return user;
        }
    }
    return {'status' : false};
}

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// сохранить cookie
app.get("/api/save", function(request, response) {
    // получаем параметры запроса
    const login = request.query.login;
    const password = request.query.password;
    // контролируем существование параметров
    if(!login) return response.end("Login not set");
    if(!password) return response.end("Password not set");
    // выставляем cookie
    request.session.login = login;
    request.session.password = password;
    // отправляем ответ об успехе операции
    response.end("Set cookie ok");

});

// получить cookie
app.get("/api/get", function(request, response) {
    // контролируем существование cookie
    if(!request.session.login) return response.end("Not exists");
    if(!request.session.password) return response.end("Not exists");
    let user = get_user(data, request.session.login, request.session.password);
    response.end(JSON.stringify(user));
});