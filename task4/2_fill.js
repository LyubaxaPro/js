"use strict";

let ob_a = {"name" : "Ann", "age" : 30, "hobbie" : "bowling"};
let ob_b = {"name" : "Stella", "age" : 8, "hobbie" : "circus"};
let ob_c = {"name" : "Lillian", "age" : 45, "hobbie" : "breeding animals "};

let arr = [ob_a, ob_b, ob_c];
const jsonString = JSON.stringify(arr);

const fs = require("fs");

fs.writeFileSync("2_arr.txt", jsonString);

let stringJSON = fs.readFileSync("2_arr.txt", "utf8");
let arr_ = JSON.parse(stringJSON);

for (let i = 0; i < arr_.length; i++){
    console.log(arr_[i]);
}
