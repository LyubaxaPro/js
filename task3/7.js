// Из файла считывается строка в формате JSON.
//  В этой строке информация об объекте, в котором находится большое количество вложенных друг в друга полей. 
//  Объект представляет из себя дерево. Необходимо рекурсивно обработать дерево и найти максимальную вложенность в дереве.
//  Необходимо вывести на экран ветку с максимальной вложенностью.

"use strict";

const fs = require("fs");

function find_max_way(obj, h, way){
    if (typeof obj != 'object')
        return {"h" : h, "way" : way};

    way.push(obj.name);

    let way_left = way.slice(0);
    let way_right = way.slice(0);

    let left_obj = find_max_way(obj.left, h + 1, way_left);

    let right_obj = find_max_way(obj.right, h + 1, way_right);

    if (left_obj.h >= right_obj.h){
        return left_obj;
    } else {
        return right_obj;
    }
}

let stringJSON = fs.readFileSync("7_json.txt", "utf8");
let global = JSON.parse(stringJSON);

let obj = find_max_way(global, 0, []);
console.log(obj);


