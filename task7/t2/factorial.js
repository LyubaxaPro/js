"use strict";

function factorial(x){
    let result = 1;
    for (let i = 2; i <= parseInt(x); i++){
        result *= i;
    }
    console.log(result);
}

factorial(process.argv[2]);