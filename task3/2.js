// Необходимо считать содержимое файла, в котором хранится массив строк в формате JSON.
//  Нужно вывести только те строки на экран, в которых содержатся только гласные буквы.

"use strict";

const readlineSync = require('readline-sync');

function write_to_file(filename){

    const N = readlineSync.questionInt("Input number of lines: ");
    let arr = [];
    
    for (let i = 0; i < N; i++){
        let str = readlineSync.question("Input string: ");
        arr.push(str);
    }
    
    let json_str = JSON.stringify(arr);
    const fs = require("fs");
    fs.writeFileSync(filename, json_str);
    
    console.log("Create File OK");
}

function read_file(filename){
    const fs = require("fs");
    if (fs.existsSync(filename)) {
        return  fs.readFileSync(filename, "utf8");;
    } else {
        console.log("File was not found");
        return false;
    }
}

function is_vowel(letter){
    let vowel = ['а', 'у', 'о', 'ы', 'э', 'е', 'ё', 'и', 'ю', 'я',
'a', 'o', 'u', 'e', 'i', 'y'];

    for (let i = 0; i < vowel.length; i++){
        if (letter == vowel[i]) return true;
    }
    return false;
}

function get_lines(json_str){
    let arr = JSON.parse(json_str);
    let letter_is_vowel = true;
    let vowel_arr =[ ];

    for (let i = 0; i < arr.lenght; i++){
        for (let j = 0; j < arr[i].lenght && letter_is_vowel; j++){
            letter_is_vowel = is_vowel(arr[i][j]);
        }
        if (letter_is_vowel) {
            vowel_arr.push(arr[i]);
        }
    }
    console.log(vowel_arr);
    return vowel_arr;
}

write_to_file("2.txt");
let jstr = read_file("2.txt");
console.log(jstr);
if (jstr){
    let arr = get_lines(jstr);
    console.log("Слова состоящие из гласных букв: ");
    console.log(arr.lenght);
    for (let i = 0; i < arr.lenght; i++) 
        console.log(arr[i]);
}