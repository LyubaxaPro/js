"use strict";

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    printFields() {
        console.log("x: " + this.x );
        console.log("y: " + this.y );
    }
}

class Section{
    constructor(x1, y1, x2, y2){
        this.p1 = new Point(x1, y1);
        this.p2 = new Point(x2, y2);
    }

    printFields(){

        console.log("\nТочка 1 отрезка: ");
        this.p1.printFields();
        console.log("\nТочка 2 отрезка: ");
        this.p2.printFields();
    }

    getLength(){
        return Math.sqrt(Math.pow((this.p1.x - this.p2.x), 2) + Math.pow((this.p1.y - this.p2.y), 2));
    }
}


let first = new Point(2, 7);
console.log("Поля класса Point");
first.printFields();

console.log("\nПоля отрезка: ");
let sect = new Section(3, 4, 5, 6);
sect.printFields();

let len = sect.getLength();
console.log("Длина отрезка: " + len);
