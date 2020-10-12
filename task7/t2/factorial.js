"use strict";

const x = "" + process.argv[2];

let result = 1;
for (let i = 2; i <= parseInt(x); i++){
    result *= i;
}

console.log("" + result);