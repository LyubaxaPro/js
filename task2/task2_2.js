"use strict";

class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    checkTriangle(){
        if (((this.a + this.b) > this.c) && ((this.c + this.b) > this.a) 
        && ((this.a + this.c) > this.b))
            return true;
        return false;  
    }

    getPerimeter(){
        return (this.a + this.b + this.c);
    }

    getSqure(){
        let p = this.getPerimeter() / 2;
        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    }

    checkHypot(a, b, c){
        if (Math.abs(((this.a * this.a + this.b * this.b)-(this.c * this.c))) < 0.0000003)
            return true;
        return false;
    }

    checkRightTringle(){
        if (this.checkHypot(this.a, this.b, this.c) ||
        this.checkHypot(this.b, this.c, this.a) ||
        this.checkHypot(this.c, this.a, this.b))
            return true;
        return false;
    }
}

let triangle = new Triangle(3.3, 4.5, 5.7);

let is_triangle = triangle.checkTriangle();
console.log(is_triangle);

let perimeter = triangle.getPerimeter();
console.log("\nПериметр треугольника: " + perimeter);

let square = triangle.getSqure();
console.log("\nПлощадь треугольника: " + square);

let is_right = triangle.checkRightTringle();
console.log(is_right);