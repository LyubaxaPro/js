"use strict";
let a = {"name": "a"};
let b = {"name": "b"};
let c = {"name" : "c"};
let d = {"name" : "d"};
let e = {"name" : "e"};
let n1 = {"name" : "n1"};
let n2 =  {"name" : "n2"};
let n3 =  {"name" : "n3"};
let n4 =  {"name" : "n4"};
let n5 =  {"name" : "n5"};
let n6 =  {"name" : "n6"};

a.left = b;
a.right = c;
b.left = d;
d.left = e;

c.right = n1;
n1.right = n2;
n2.left = n3;
n3.right = n4;
n4.right = n5;

c.left = n6;

const jsonString = JSON.stringify(a);

const fs = require("fs");

fs.writeFileSync("7_json.txt", jsonString);


