"use strict";

let seconds = 0;
let counter= 0;

function f(delay){
    let interval = setInterval(() => {
    seconds++;
    console.log(seconds);
    if(seconds === 10 || seconds === 20) {
        if (seconds === 10){
            delay = 1000;
        }else {
            delay = 2000;
            seconds = 0;
        }
        clearInterval(interval);
        f(delay)
    }
    }, delay);
}

f(2000);