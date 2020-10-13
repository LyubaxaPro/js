//С клавиатуры считывается строка - название расширения файлов. Далее считывается строка - адрес папки. 
//Необходимо перебрать все файлы в папке и вывести содержимое файлов, у которых расширение совпадает с введенным расширением.

"use strict";
const readlineSync = require('readline-sync');

function find_files(extension, address){
    const fs = require("fs");

    const folder = address;

    const arr = fs.readdirSync(folder);
    let files = [];

    for(let i = 0; i < arr.length; i++) {
        let pos = arr[i].search(extension);
        if (arr[i].length - pos === extension.length)
            files.push(arr[i]);
    }
    return files;
}

function print_file(filename){
    const fs = require("fs");

    console.log("\n\nСодержимое файла " + filename);
    if (fs.existsSync(filename)) {
        const contentString = fs.readFileSync(filename, "utf8");
        console.log(contentString);
    } else {
        console.log("Файл " + filename + "не найден.");
        return -1;
    }
}

let extension = readlineSync.question("Введите расширение файла: ");

let address = readlineSync.question("Введите адресс папки: ");

let arr =  find_files(extension, address);

if (arr.length == 0){
    console.log("Файлов с таким расширением нет.")
} else {
    console.log("Список файлов с данным расширением: ");
}

for (let i = 0; i < arr.length; i++)
    print_file(arr[i]);

