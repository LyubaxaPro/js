 // С клавиатуры считывается число N. Далее считывается N строк - имена текстовых файлов.
//Необходимо склеить всё содержимое введенных файлов в одну большую строку и сохранить в новый файл.

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

function write_file(contentString){
    const fs = require("fs");

    const filename = "answer5.txt";

    fs.writeFileSync(filename, contentString);

    console.log("Файл создан");
}

const N = readlineSync.questionInt("Введите количество файлов: ");
let files = [];
for (let i = 0; i < N; i++){
    let filename = readlineSync.question("Введите имя файла: ");
    files.push(filename);
}

let str = "";
for (let i = 0; i < files.length; i++){
    let file_string = read_file(files[i]);
    if (file_string != FILE_ERROR){
        str += file_string;
        str += "\n";
    }
}

write_file(str);

