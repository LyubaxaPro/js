
"use strict";

const readlineSync = require('readline-sync');

function write_to_file(filename){

    const N = readlineSync.questionInt("Введите количество складов: ");
    let arr = [];
    
    for (let i = 0; i < N; i++){
        let str = readlineSync.question("Введите название склада: ");

        let cars_arr = [];
        let N_w = readlineSync.questionInt("Введите количество машин на складе: ");
        for (let i = 0; i < N_w; i++){
            let current = readlineSync.question("Введите название машины: ");
            cars_arr.push(current);
        }
        arr.push({'warehouse' : str, 'cars_arr' : cars_arr});
    }
    
    let json_str = JSON.stringify(arr);
    const fs = require("fs");
    fs.writeFileSync(filename, json_str);
    
    console.log("Файл создан и заполнен");
}

write_to_file('warehouse.txt');