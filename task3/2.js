// Необходимо считать содержимое файла, в котором хранится массив строк в формате JSON.
//  Нужно вывести только те строки на экран, в которых содержатся только гласные буквы.

"use strict";
const fs = require("fs");

const readlineSync = require('readline-sync');

function write_to_file(filename){

    const N = readlineSync.questionInt("Введите количество строк: ");
    let arr = [];
    
    for (let i = 0; i < N; i++){
        let str = readlineSync.question("Введите строку: ");
        arr.push(str);
    }
    
    let json_str = JSON.stringify(arr);
    fs.writeFileSync(filename, json_str);
    
    console.log("Файл создан и заполнен");
}

function read_file(filename){
    if (fs.existsSync(filename)) {
        return  fs.readFileSync(filename, "utf8");;
    } else {
        console.log("Файл не найден");
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

    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr[i].length; j++){
            letter_is_vowel = is_vowel(arr[i][j].toLowerCase());
            if (!letter_is_vowel)
                break;
        }
        if (letter_is_vowel) {
            vowel_arr.push(arr[i]);
        }
    }
    console.log(vowel_arr)
    return vowel_arr;
}

write_to_file("2.txt");
let jstr = read_file("2.txt");
let arr = get_lines(jstr);

if (arr.length == 0){
    console.log("Нет слов, состоящих из гласных.")
} else {
    console.log("Слова состоящие из гласных букв: ");
    for (let i = 0; i < arr.length; i++) 
        console.log(arr[i]);
}