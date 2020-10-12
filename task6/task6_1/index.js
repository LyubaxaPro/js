//http://localhost:4000/page/games?age=30
// Создать сервер. В оперативной памяти на стороне сервера создать массив, в котором хранится информация о компьютерных играх 
// (название игры, описание игры, возрастные ограничения). Создать страницу с помощью шаблонизатора.
// В url передаётся параметр возраст (целое число). Необходимо отображать 
// на этой странице только те игры, у которых возрастное ограничение меньше, чем переданное в url значение.

// Настройка Node js шаблонизатора осуществляется заданием двух параметров:

// views - путь к директории, в которой находятся шаблоны;
// view engine - указание самого шаблонизатора.

// Шаблонизатор - это модуль, позволяющий использовать упрощенный и более мощный синтаксис для написания html.
//  Шаблонизатор отделяет представление данных от исполняемого кода, даёт возможность разделять шаблоны на блоки,
//   переиспользовать их несколько раз, 
// выделять макросы, наследовать шаблоны ит.д., как результат - процесс верстки ускоряется, код становится короче.
"use strict";

const games_arr = [{'name' : 'Minecraft', 'age' : 7, 'description' : 'Prepare for an adventure of limitless possibilities as you build, mine, battle mobs, and explore the ever-changing Minecraft landscape.'},
{'name' : 'Among Us', 'age' : 16, 'description' : 'Is an online sci-fi murder-mystery game by Innersloth that runs on the Unity Game Engine.' },
{'name' : 'League of legends', 'age' : 16, 'description' : ' Is a multiplayer online battle arena (MOBA) genre video game developed by Riot Games.'}]

// импорт библиотеки
const express = require("express");

// запускаем сервер
const app = express();
const port = 4000;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// выдача страницы с массивом игр
app.get("/page/games", function(request, response) {
    const max_age = request.query.age;
    let new_arr = [];
    for (let i = 0; i < games_arr.length; i++){
        if (games_arr[i]['age'] < max_age){
            new_arr.push(games_arr[i]);
        }
    }
    const infoObject = {
        descriptionValue: "Список игр",
        array:new_arr
    };
    response.render("pageGames.hbs", infoObject);
});

