// Написать программу, которая на вход получает массив названий полей и адрес запроса (куда отправлять). 
// Программа должна генерировать HTML разметку страницы, в которую встроена форма для отправки запроса.

"use strict";
const readlineSync = require('readline-sync');
const FILE_ERROR = -1;

function read_file(filename){
    const fs = require("fs");

    if (fs.existsSync(filename)) {
        const contentString = fs.readFileSync(filename, "utf8");
        return contentString;
    } else {
        console.log("Файл " + filename + "не найден.");
        return FILE_ERROR;
    }
}

function write_file(contentString, filename){
    const fs = require("fs");

    fs.writeFileSync(filename, contentString);

    console.log("Файл создан");
}

const N = readlineSync.questionInt("Введите количество полей: ");

let fields = [];
for (let i = 0; i < N; i++){
    let str = readlineSync.question("Введите поле: ");
    fields.push(str);
}
const address = readlineSync.question("Введите адрес запроса: ");

let result = "";
let begin = read_file("3_begin.html");

if (begin == FILE_ERROR){
    console.log("Файл не может быть сгенерирован.");
    return;
}

result += begin + "\n"; 
result += "    <form method=\"GET\" action=\"" + address + "\">" + "\n";

for (let i = 0; i < fields.length; i++){
    result += "        <p>Введите " + fields[i] + "</p>" + "\n";
    result += "        <input name=\"" + fields[i] + "\" spellcheck=\"false\" autocomplete=\"off\">\n";
}

let end = read_file("3_end.html");

if (end == FILE_ERROR){
    console.log("Файл не может быть сгенерирован.");
    return;
}
result += end;

write_file(result, "3_result.html");

