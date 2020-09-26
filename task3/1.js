// С клавиатуры считывается число N.
//  Далее считывается N строк.
//   Необходимо создать массив и сохранять в него строки только с четной длинной. 
//   Получившийся массив необходимо преобразовать в строку JSON и сохранить в файл.

"use strict";

const readlineSync = require('readline-sync');

const N = readlineSync.questionInt("Input number of lines: ");
let arr = [];

for (let i = 0; i < N; i++){
    let str = readlineSync.question("Input string: ");
    if ((str.length % 2) == 0){
        arr.push(str);
    }
}

let json_str = JSON.stringify(arr);

const fs = require("fs");

const filename = "1.txt";

fs.writeFileSync(filename, json_str);

console.log("Create File OK");

