// Из файла считывается строка в формате JSON.
//  В этой строке информация об объекте, в котором находится большое количество вложенных друг в друга полей. 
//  Объект представляет из себя дерево. Необходимо рекурсивно обработать дерево и найти максимальную вложенность в дереве.
//  Необходимо вывести на экран ветку с максимальной вложенностью.

"use strict";


const fs = require("fs");

function find_max_d(obj){
    let h = 0;
    for (let key in obj){
       // console.log(key);
        if (typeof obj[key] === 'object'){
            h = find_max_d(obj[key]) + 1;
        } 
    }
    return h;
}

function find_key(obj){
    let max_h = 0;
    let max_key = 0;
    for (let key in obj){
        let h = find_max_d(obj[key]);
        console.log(key);
        console.log(h);
        if (h > max_h){
            max_key = key;
            max_h = h;
        }
    }
    return {"h" : max_h, "max_key" : max_key};
}

let stringJSON = fs.readFileSync("7_json.txt", "utf8");
let global = JSON.parse(stringJSON);

let obj = find_key(global);
console.log("Глубина: " + obj.h);
console.log(obj.max_key);

