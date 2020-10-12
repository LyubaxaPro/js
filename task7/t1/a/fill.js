
"use strict";

const readlineSync = require('readline-sync');

function write_to_file(filename){

    const N = readlineSync.questionInt("Введите количество машин: ");
    let arr = [];
    
    for (let i = 0; i < N; i++){
        let str = readlineSync.question("Введите название машины: ");
        let cost = readlineSync.questionInt("Введите стоимость машины: ");
        arr.push({'car' : str, 'cost' : cost});
    }
    
    let json_str = JSON.stringify(arr);
    const fs = require("fs");
    fs.writeFileSync(filename, json_str);
    
    console.log("Файл создан и заполнен");
}

write_to_file('cars.txt');