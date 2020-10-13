// //  Из файла считывается строка в формате JSON.
// //  В этой строке информация об объекте, в котором находится большое количество вложенных друг в друга полей. 
// //  Объект представляет из себя дерево. Необходимо рекурсивно обработать дерево и найти максимальную вложенность в дереве.
// //  Необходимо вывести на экран ветку с максимальной вложенностью.

"use strict";

const fs = require("fs");

function find_max(arr){
    let m = arr[0];
    for (let i = 0; i < arr.length; i++){
        if (arr[i] > m){
            m = arr[i]
        }
    }
    return m;
}

function getProp(o, h, mas_h, way, max_h) {
    h += 1;
    for(let prop in o) {                        
        if(typeof(o[prop]) === 'object') {  // проверяет равенство без приведения типов  
            way.push(o.field);           
            getProp(o[prop], h, mas_h, way, max_h);
        } else {    
            way.push(o.field); 
            way = way.slice(0, way.length - h - 1);                  
            if (max_h > 0 && max_h == h){
                way.push(o.field);
                console.log(way);
            }
            else if (max_h < 0){
                mas_h.push(h);
            }
        }
    }
    return (mas_h);
}

function proc(obj) {
    let h = 0;
    let max_h = -1;
    let mas_h = [];
    let way = [];
    mas_h = getProp(obj, h, mas_h, way, max_h);  
    max_h = find_max(mas_h);
    console.log("Max height = " + max_h);
    h = 0;
    way = []
    getProp(obj, h, mas_h, way, max_h);  
}

let stringJSON = fs.readFileSync("test_7.txt", "utf8");

let global = JSON.parse(stringJSON);

proc(global);


