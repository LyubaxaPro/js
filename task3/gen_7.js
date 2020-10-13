"use strict";
let a = {"field": "a"};
let b = {"field": "b"};
let c = {"field" : "c"};
let d = {"field" : "d"};
let e = {"field" : "e"};
let k = {"field" : "k"};
let m =  {"field" : "m"};
let t =  {"field" : "t"};
let o =  {"field" : "o"};
let z =  {"field" : "z"};
let q =  {"field" : "q"};
let w =  {"field" : "w"};
let r =  {"field" : "r"};
let n =  {"field" : "n"};
let x =  {"field" : "x"};
let p =  {"field" : "p"};
let y =  {"field" : "y"};

a.left = b;
a.right = c;
a.middle = w;

b.left = d;
b.right = e;

c.right = k;
c.left = q;
c.middle = x;
c.r_right = p;

k.right = m;

m.left = t;

t.right = o;
t.middle = r;
t.left = n;
t.r_right = y;

o.right = z;


const jsonString = JSON.stringify(a, null, "\t");

const fs = require("fs");

fs.writeFileSync("test_7.txt", jsonString);

