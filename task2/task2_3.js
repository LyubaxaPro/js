"use strict";

let seconds = 0;
let counter= 0;
let delay = 1000;

let interval = setInterval(() => {
    seconds++;
    console.log(seconds);
    if(seconds === 10) {
        delay = 2000;
        clearInterval(interval);
    }
}, delay);