"use strict";
const readlineSync = require('readline-sync');

function create_arr(students){
    let num = readlineSync.questionInt('Введите количество студентов: ');
    console.log(num);

    for (let i = 0; i < num; i++){
        console.log('\nСтудент ' + (i + 1));
        create(students);
    }
}

function create(students){
    let groupe = readlineSync.question('Введите группу: ');
    let number = readlineSync.questionInt('Введите номер студенческого билета: ');

    let marks_str = readlineSync.question('Введите оценки по программированию (через пробел): ');
    let marks = [];
    if (marks_str.length != 0)
        marks = marks_str.split(' ');
    for (let i = 0; i < marks.length; i++){
        marks[i] = parseInt(marks[i]);
    }
        

    if (marks.length != 0){
        for (let i = 0; i < marks.length; i++){
            if (!Number.isInteger(marks[i])){
                console.log('Оценки должны быть целыми числами. Введите другие данные.');
                create(students);
            }
        }
    }
    
    let flag = true;
    
    for (let i = 0; i < students.length && flag; i++){
        if (students[i]['number'] === number) flag = false;
    }

    if (!flag) {
        console.log('Данный студенческий билет уже используется. Введите другие данные.');
        create(students);
    }

    else{
        let student = {};
        student["groupe"] = groupe;
        student["number"] = number;
        student["marks"] = marks;
        students.push(student);
    }
}

function read(students){
    console.log("\nСписок студентов:");
    for (let i = 0; i < students.length; i++){
        console.log("\nСтудент " + (i + 1));
        console.log("Группа:" + students[i]["groupe"]);
        console.log("Номер студенческого билета: " + students[i]["number"]);
        console.log("Оценки по программированию: " + students[i]["marks"].join(' '));
    }
}

function read_student(student){
    console.log("\nСтудент:");
    console.log("Группа:" + student["groupe"]);
    console.log("Номер студенческого билета: " + student["number"]);
    console.log("Оценки по программированию: " + student["marks"].join(' '));
}

function update(students){
    let number = readlineSync.questionInt('Введите номер студенческого билета: ');
    
    let flag = true;
    let student_num = 0;
    for (let i = 0; i < students.length && flag; i++){
        if (students[i]['number'] === number) {
            flag = false;
            student_num = i;
        }
    }

    if (flag) {
        console.log("Студента с данным номером студенческого билета нет в базе.");
        return;
    }
    else read_student(students[student_num])

    console.log("\nПоля записи, которые можно изменить:\n");
    console.log("1. Номер студенческого билета");
    console.log("2. Группа");
    console.log("3. Оценки");

    let index_str = readlineSync.question("\nВведите номера полей, которые Вы хотите изменить(через пробел): ");

    let index = index_str.split(' ');

    for (let i = 0; i < index.length; i++){
        if (index[i] == 1){
            let new_number = readlineSync.question('\nВведите новый номер студенческого билета: ');
            students[student_num]["number"] = new_number;
        }

        if (index[i] == 2){
            let new_groupe = readlineSync.question('\nВведите новый номер группы: ');
            students[student_num]["groupe"] = new_groupe; 
        }

        if (index[i] == 3){
            let new_marks_str = readlineSync.question('Введите новые оценки по программированию (через пробел): ');
            students[student_num]["marks"].slice(0, students[student_num]["marks"].length);
            students[student_num]["marks"] = new_marks_str.split(' ');
        }
    }
    console.log("\nИзменения успешно сохранены.");
}

function delete_(students){
    let number = readlineSync.questionInt('Введите номер студенческого билета студента, которого Вы хотите удалить: ');

    let flag = true;
    let student_num = 0;
    for (let i = 0; i < students.length && flag; i++){
        if (students[i]["number"] === number) {
            flag = false;
            student_num = i;
        }
    }

    if (flag) {
        console.log("Студента с данным номером студенческого билета нет в базе.");
        return;
    }

    students.splice(student_num, 1);
}

function get_mid_student(students, number){
    
    let flag = true;
    let sum = 0;
    let student_num = 0;
    for (let i = 0; i < students.length && flag; i++){
        if (students[i]["number"] === number) {
            flag = false;
            student_num = i;
        }
    }

    if (flag) {
        console.log("Студента с данным номером студенческого билета нет в базе.");
        return;
    }

    if (students[student_num]["marks"].length == 0){
        console.log("У студента с данным номером студенческого нет оценок.");
        return 0;
    }
    else {
        for (let i = 0; i < students[student_num]["marks"].length; i++){
                sum += students[student_num]["marks"][i];
        }
    }
    return sum / students[student_num]["marks"].length;
}

function get_student_in_groupe(students, groupe){
    let groupe_students = [];
    for (let i = 0; i < students.length; i++){
        if (students[i]["groupe"] == groupe){
            groupe_students.push(students[i]);
        }
    }
    return groupe_students;
}

function get_max_groupe_student(students, groupe){
    let groupe_students = get_student_in_groupe(students, groupe);
    let max = 0;
    let max_student = [];
    
    for (let i = 0; i < groupe_students.length; i++){
        if (groupe_students[i]["marks"].length > max){
            max =  groupe_students[i]["marks"].length;
            max_student.splice(0, max_student.length);
            max_student.push(groupe_students[i]);
        }
        else if (groupe_students[i]["marks"].length == max) 
            max_student.push(groupe_students[i]);
    }
    return max_student;
}

function get_student_without_marks(students){
    let without_marks_students = [];

    for (let i = 0; i < students.length; i++){
        if (students[i]["marks"].length == 0){
            without_marks_students.push(students[i]);
        }
    }
    return without_marks_students;
}

function get_index(){
    let keys = ['Добавить студента в базу', 'Вывести список студентов', 'Изменить данные о студенте', 
    'Удалить студента из базы', 'Получить среднюю оценку заданного студента',
'Получить информацию о студентах в заданной группе', 'Получить студента, у которого наибольшее количество оценок в заданной группе',
'Получить студента, у которого нет оценок'];

    let index = readlineSync.keyInSelect(keys, "\nВыберите действие");
    return index;
}

let students = [];
create_arr(students);

for (;;){
    switch(get_index()){
        case -1: return;

        case 0: {
            create(students);
            break;
        }

        case 1: {
            read(students);
            break;
        }

        case 2: {
            update(students);
            break;
        }

        case 3: {
            delete_(students);
            break;
        }

        case 4: {
            let number = readlineSync.questionInt('Введите номер студенческого билета студента: ');
            let mid_num = get_mid_student(students, number);
            if (mid_num != 0)
                console.log("Средний балл данного студента " + mid_num);
                break;
        }

        case 5: {
            let groupe = readlineSync.question('Введите номер группы студента: ');
            let groupe_students = get_student_in_groupe(students, groupe);
            if (groupe_students.length == 0) console.log("Нет студентов с таким номером группы.")

            else {
                console.log("Студенты в заданной группе:")
                read(groupe_students);
            }
            break;
        }

        case 6: {
            let groupe = readlineSync.question('Введите номер группы студента: ');
            let max_students = get_max_groupe_student(students, groupe);
            if (max_students.length == 0) console.log("Нет студентов с таким номером группы.")
            else {
                console.log("Студенты, у которых наибольшее количество оценок в заданной группе:")
                read(max_students);
            }
            break;
        }

        case 7: {
            let without_marks_students = get_student_without_marks(students);
            if (without_marks_students.length == 0) console.log("Нет студентов, у которых нет оценок.");
            else{
                console.log("Студенты, у которых нет оценок:")
                read(without_marks_students);
            }
            break;
        }
    }
}






