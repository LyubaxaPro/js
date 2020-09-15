"use strict";
const readlineSync = require('readline-sync');

function create_arr(children){
    let num = readlineSync.questionInt('Введите количество детей: ');
    console.log(num);

    for (let i = 0; i < num; i++){
        console.log('\nРебенок ' + (i + 1));
        create(children);
    }
}

function create(children){
    let surname = readlineSync.question('Введите фамилию ребенка: ');
    let age = readlineSync.questionInt('Введите возраст ребенка: ');

    let flag = true;
    for (let i = 0; i < children.length && flag; i++){
        if (children[i]['surname'] === surname) flag = false;
    }

    if (!flag) {
        console.log('Данная фамилия уже используется. Введите другие данные.');
        create(children);
    }

    else if (age <= 0){
        console.log('Возраст не может быть отрицательным. Введите другие данные.');
        create(children);
    }
    else{
        let child = {};
        child["surname"] = surname;
        child["age"] = age;
        children.push(child);
    }
}

function read(children){
    console.log("\nСписок детей:");
    for (let i = 0; i < children.length; i++){
        console.log("\nРебенок " + (i + 1));
        console.log("Фамилия:" + children[i]["surname"]);
        console.log("Возраст: " + children[i]["age"] + "\n");
    }
}

function read_child(child){
    console.log("\nРебёнок:");
    console.log("Фамилия: " + child["surname"]);
    console.log("Возраст: " + child["age"] + "\n");
}

function update(children){
    let surname = readlineSync.question('Введите фамилию ребенка: ');
    
    let flag = true;
    let child_num = 0;
    for (let i = 0; i < children.length && flag; i++){
        if (children[i]['surname'] === surname) {
            flag = false;
            child_num = i;
        }
    }

    if (flag) {
        console.log("Ребёнка с данной фамилией нет в базе.");
        return;
    }
    else read_child(children[child_num])

    console.log()

    let keys = ['фамилия', 'возраст', 'фамилия и возраст'];
    let index = readlineSync.keyInSelect(keys, "\nКакое поле Вы хотите изменить?");

    if (index == 0){
        let new_surname = readlineSync.question('\nВведите новую фамилию ребенка: ');
        children[child_num]["surname"] = new_surname;
    }

    else if (index == 1){
        let new_age = readlineSync.questionInt('\nВведите новый возраст ребенка: ');
        children[child_num]["age"] = new_age;
    }
    else if (index == 2){
        let new_surname = readlineSync.question('\nВведите новую фамилию ребенка: ');
        children[child_num]["surname"] = new_surname;

        let new_age = readlineSync.questionInt('\nВведите новый возраст ребенка: ');
        children[child_num]["age"] = new_age;
    }

    console.log("\nИзменения успешно сохранены.");
}

function delete_(children){
    let surname = readlineSync.question('Введите фамилию ребенка, которого Вы хотите удалить: ');

    let flag = true;
    let child_num = 0;
    for (let i = 0; i < children.length && flag; i++){
        if (children[i]['surname'] === surname) {
            flag = false;
            child_num = i;
        }
    }

    if (flag) {
        console.log("Ребёнка с данной фамилией нет в базе.");
        return;
    }

    children.splice(child_num, 1);
}

function is_empty(children){
    if (children.length === 0){
        console.log("В базе нет детей. Операция невозможна.");
        return true;
    }
    return false;
}

function get_middle_age(children){
    let sum = 0;
    if (is_empty(children)) return 0;

    for (let i = 0; i < children.length; i++){
        sum += children[i]["age"];
    }
    return sum / children.length;
}

function get_older(children){
    let older_children = [];

    let max_age = -1;

    for (let i = 0; i < children.length; i++){
        if (children[i]["age"] > max_age){
            max_age = children[i]["age"];
            older_children.splice(0, older_children.length);
            older_children.push(children[i]);
        }

        else if (children[i]["age"] === max_age) older_children.push(children[i]);
    }
    return older_children;
}

function get_cut_children(children, min_age, max_age){
    let cut_children = [];
    
    for (let i = 0; i < children.length; i++){
        if (children[i]["age"] >= min_age && children[i]["age"] <= max_age){
           cut_children.push(children[i]);
        }
    }
    return cut_children;
}

function get_letter_children(children, letter){
    let letter_children = [];

    for (let i = 0; i < children.length; i++){
        if (children[i]["surname"].charAt(0) == letter){
           letter_children.push(children[i]);
        }
    }
    return letter_children;
}

function get_longer_surname_children(children, len){
    let longer_children = [];
    
    for (let i = 0; i < children.length; i++){
        if (children[i]["surname"].length > len){
           longer_children.push(children[i]);
        }
    }
    return longer_children;
}

function get_vowel_children(children){
    let vowel_children = [];

    let vowel = ['а', 'у', 'о', 'ы', 'э', 'е', 'ё', 'и', 'ю', 'я',
'a', 'o', 'u', 'e', 'i', 'y'];

    for (let i = 0; i < children.length; i++){
        for (let j = 0; j < vowel.length; j++){
            if (children[i]["surname"].charAt(0) == vowel[j]){
                vowel_children .push(children[i]);
            }
        }
    }
    return vowel_children;
}

function get_index(){
    let keys = ['Добавить ребёнка в базу', 'Вывести список детей', 'Изменить данные ребёнка', 
    'Удалить ребёнка из базы', 'Получить средний возраст детей', 'Получить инормацию о самом старшем ребёнке',
    'Получить информацию о детях, возраст которых входит в заданный отрезок',
    'Получить информацию о детях, фамилия которых начинается с заданной буквы',
    'Получить информацию о детях, фамилия которых длиннее заданного количества символов',
    'Получить информацию о детях, фамилия которых начинается с гласной буквы'];

    let index = readlineSync.keyInSelect(keys, "\nВыберите действие");
    return index;
}

let children = [];
create_arr(children);

for (;;){
    switch(get_index()){
        case -1: return;

        case 0: {
            create(children);
            break;
        }

        case 1: {
            read(children);
            break;
        }

        case 2: {
            update(children);
            break;
        }

        case 3: {
            delete_(children);
            break;
        }

        case 4: {
            let mid = get_middle_age(children);
            if (mid != 0)
            console.log("Средний возраст детей: " + mid);
            break;
        }

        case 5:{
            let older_children = get_older(children);
            if (older_children.length === 1){
                console.log("\nСамый старший ребёнок: ");
                console.log("Фамилия: " + older_children[0]["surname"]);
                console.log("Возраст: " + older_children[0]["age"] + "\n");
            } 

            if (older_children.length > 1){
                console.log("\nСамые старшие дети: ");
                read(older_children);
            }
            break;
        }

        case 6:{
            let min_age = readlineSync.questionInt('Введите минимальный возраст на отрезке ');
            let max_age = readlineSync.questionInt('Введите максимальный возраст на отрезке ');

            let cut_children = get_cut_children(children, min_age, max_age);
            if (cut_children.length === 0) console.log("В базе нет детей в таком возрастном диапазоне.");

            if (cut_children.length >= 1){
                console.log("\nДети в заданном диапазоне: ");
                read(cut_children);
            }
            break;
        }

        case 7:{
            let letter = readlineSync.question('Введите букву: ');
            let letter_children = get_letter_children(children, letter);
            if (letter_children.length === 0) console.log("В базе нет детей фамилия которых начинается с заданной буквы.");

            if (letter_children.length >= 1){
                console.log("\nДети, фамилия которых начинается с заданной буквы: ");
                read(letter_children);
            }
            break;
        }

        case 8:{
            let len = readlineSync.questionInt('Введите количество символов: ');
            let longer_children = get_longer_surname_children(children, len);
            if (longer_children.length === 0) console.log("В базе нет детей фамилия которых длиннее заданного количества символов.");

            if (longer_children.length >= 1){
                console.log("\nДети, фамилия которых длиннее заданного количества символов: ");
                read(longer_children);
            }
            break;
        }

        case 9:{
            let vowel_children = get_vowel_children(children);
            if (vowel_children.length === 0) console.log("В базе нет детей фамилия которых начинается с гласной.");

            if (vowel_children.length >= 1){
                console.log("\nДети, фамилия которых начинается с гласной: ");
                read(vowel_children);
            }
            break;
        }
    }
}






