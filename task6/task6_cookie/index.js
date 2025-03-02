"use strict";

// импортируем библиотеки
const express = require("express");
const cookieSession = require("cookie-session");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// работа с сессией

// Создайте новое промежуточное ПО для сеанса cookie с предоставленными параметрами.
//  Это промежуточное ПО присоединит свойство sessionк req, которое предоставляет объект, представляющий загруженный сеанс.
//   Этот сеанс является либо новым сеансом, если в запросе не был указан действительный сеанс, либо загруженным сеансом
//    из запроса.

// Промежуточное ПО автоматически добавит Set-Cookieзаголовок к ответу, если содержимое req.sessionбыло изменено.
//  Обратите внимание, что Set-Cookieв ответе не будет заголовка (и, следовательно, сеанс, созданный для определенного
//      пользователя), если в сеансе нет содержимого, поэтому обязательно добавьте что-нибудь, req.sessionкак только 
//       вас появится идентифицирующая информация для сохранения для сеанса.


app.use(cookieSession({
    // Имя устанавливаемого файла cookie, по умолчанию session.
    name: 'session',
    // Список ключей, используемых для подписи и проверки значений файлов cookie, или настроенный  Keygrip экземпляр.
    // Установленные файлы cookie всегда подписываются keys[0], в то время как другие ключи действительны для проверки,
    //  позволяя ротацию ключей. Если предоставляется Keygrip экземпляр, его можно использовать для изменения параметров 
    //  подписи, таких как алгоритм подписи.
 
    keys: ['hhh', 'qqq', 'vvv'],
   // определяет время жизни файла в секундах;
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

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
    const age = request.query.age;
    // контролируем существование параметров
    if(!login) return response.end("Login not set");
    if(!age) return response.end("Age not set");
    // выставляем cookie
    request.session.login = login;
    request.session.age = age;
    // отправляем ответ об успехе операции
    response.end("Set cookie ok");
});

// получить cookie
app.get("/api/get", function(request, response) {
    // контролируем существование cookie
    if(!request.session.login) return response.end("Not exists");
    if(!request.session.age) return response.end("Not exists");
    // отправляем ответ с содержимым cookie
    const login = request.session.login;
    const age = request.session.age;
    response.end(JSON.stringify({
        login,
        age
    }));
});

// удалить все cookie
app.get("/api/delete", function(request, response) {
    request.session = null;
    response.end("Delete cookie ok");
});

