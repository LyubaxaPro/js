"use strict";

function factorial(n){
    console.log("start = " + n);
    let result = 1;
    for (let i = 2; i <= parseInt(n); i++){
        result *= i;
    }
    console.log("result = " + result);
    return result;
}

const arr_str = "" + process.argv[2];
let arr = arr_str.split(' ');
console.log("Array " + arr);
let answ = "";

for (let i = 0; i < arr.length; i++) {
    let result = factorial(arr[i]);
    answ += result.toString();
}

console.log(answ);