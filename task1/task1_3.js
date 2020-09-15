"use strict";
const readlineSync = require('readline-sync');

function create_arr(students){
    let num = readlineSync.questionInt('Введите количество точек: ');
    console.log(num);

    for (let i = 0; i < num; i++){
        console.log('\nТочка ' + (i + 1));
        create(students);
    }
}

function create(points){
    let name = readlineSync.question('Введите имя точки: ');
    let x_pos = readlineSync.questionFloat('Введите позицию X: ');
    let y_pos = readlineSync.questionFloat('Введите позицию Y: ');
    
    let flag = true;
    for (let i = 0; i < points.length && flag; i++){
        if (points[i]['name'] === name) flag = false;
    }

    if (!flag) {
        console.log('Данное имя точки уже используется. Введите другие данные.');
        create(points);
    }

    else{
        let point = {};
        point["name"] = name;
        point["x_pos"] = x_pos;
        point["y_pos"] = y_pos;
        points.push(point);
    }
}

function read(points){
    console.log("\nСписок точек:");
    for (let i = 0; i < points.length; i++){
        console.log("\nТочка " + (i + 1));
        console.log("Имя точки:" + points[i]["name"]);
        console.log("Позиция Х: " + points[i]["x_pos"]);
        console.log("Позиция Y: " + points[i]["y_pos"]);
    }
}

function read_point(point){
    console.log("\nТочка:");
    console.log("Имя точки:" + point["name"]);
    console.log("Позиция Х: " + point["x_pos"]);
    console.log("Позиция Y: " + point["y_pos"]);
}

function update(points){
    let name = readlineSync.question('Введите имя точки: ');
    
    let flag = true;
    let point_num = 0;
    for (let i = 0; i < points.length && flag; i++){
        if (points[i]['name'] === name) {
            flag = false;
            point_num = i;
        }
    }

    if (flag) {
        console.log("Точки с данным именем нет в базе.");
        return;
    }
    else read_point(points[point_num])

    console.log("\nПоля записи, которые можно изменить:\n");
    console.log("1. Имя точки");
    console.log("2. Позиция X");
    console.log("3. Позиция Y");

    let index_str = readlineSync.question("\nВведите номера полей, которые Вы хотите изменить(через пробел): ");

    let index = index_str.split(' ');

    for (let i = 0; i < index.length; i++){
        if (index[i] == 1){
            let new_name = readlineSync.question('\nВведите новое имя точки: ');
            points[point_num]["name"] = new_name;
        }

        if (index[i] == 2){
            let new_x_pos = readlineSync.questionFloat('\nВведите новую позицию X: ');
            points[point_num]["x_pos"] = new_x_pos; 
        }

        if (index[i] == 3){
            let new_y_pos = readlineSync.questionFloat('\nВведите новую позицию Y: ');
            points[point_num]["y_pos"] = new_y_pos; 
        }
    }
    console.log("\nИзменения успешно сохранены.");
}

function delete_(points){
    let name = readlineSync.question('Введите имя точки, которую Вы хотите удалить: ');

    let flag = true;
    let point_num = 0;
    for (let i = 0; i < points.length && flag; i++){
        if (points[i]["name"] === name) {
            flag = false;
            point_num = i;
        }
    }

    if (flag) {
        console.log("Точки с данным именем нет в базе.");
        return;
    }

    points.splice(point_num, 1);
}

function get_distance(a, b){
    return Math.sqrt(Math.pow((a["x_pos"] - b["x_pos"]), 2) + Math.pow((a["y_pos"] - b["y_pos"]), 2));
}

function get_points_max_distance(points){
    let max_distance = -1;
    let points_max_distance = {};
    if (points.length < 2){
        console.log("Недостаточно точек для вычислений.");
        return points_max_distance;
    }

    for (let i = 0; i < points.length; i++){
        for (let j = 1; j < points.length; j++){
            if (j == i) {

            } else {
                let distance = get_distance(points[i], points[j]);
                if (distance > max_distance){
                    max_distance = distance;
                    points_max_distance["t1"] = points[i];
                    points_max_distance["t2"] = points[j];
                }
            }
        }
    }
    return points_max_distance;
}

function get_const_len_points(points, const_len, name){
    let const_len_points = [];
    let flag = true;
    let point_num = 0;
    for (let i = 0; i < points.length && flag; i++){
        if (points[i]["name"] === name) {
            flag = false;
            point_num = i;
        }
    }

    if (flag) {
        console.log("Точки с данным именем нет в базе.");
        return const_len_points;
    }
    
    for (let i = 0; i < points.length; i++){
        if (get_distance(points[point_num], points[i]) <= const_len && i != point_num){
            const_len_points.push(points[i]);
        }
    }
    return const_len_points;
}

function get_with_position(points, axes, position){
    let choosen_points = [];
    let key;
    if (axes == 0) key = 'y_pos';
    else key = 'x_pos';

    for (let i = 0; i < points.length; i++){
            if (position == 0 && points[i][key] > 0) choosen_points.push(points[i]);
            if (position == 1 && points[i][key] < 0) choosen_points.push(points[i]);
    }
    return choosen_points;
}

function get_in_rect(points, min_x, max_x, min_y, max_y){
    let choosen_points = [];
    
    for (let i = 0; i < points.length; i++){
          
        if (((points[i]["x_pos"] > min_x) && (points[i]["x_pos"] < max_x)) && ((points[i]["y_pos"] > min_y) && (points[i]["y_pos"] < max_y))){
            choosen_points.push(points[i]);
        }
    }
    return choosen_points;
}

function get_index(){
    let keys = ['Добавить точку в базу', 'Вывести список точек', 'Изменить данные о точке', 
    'Удалить точку из базы', 'Получить две точки, между которыми наибольшее расстояние',
'Получить точки, находящихся от заданной точки на расстоянии, не превышающем заданную константу',
'Получить точки, находящиеся выше / ниже / правее / левее заданной оси координат',
'Получить точки, входящие внутрь заданной прямоугольной зоны'];

    let index = readlineSync.keyInSelect(keys, "\nВыберите действие");
    return index;
}

let points = [];
create_arr(points);

for (;;){
    switch(get_index()){
        case -1: return;

        case 0: {
            create(points);
            break;
        }

        case 1: {
            read(points);
            break;
        }

        case 2: {
            update(points);
            break;
        }

        case 3: {
            delete_(points);
            break;
        }
        case 4: {
            let points_max_distance = get_points_max_distance(points);
            console.log("Пара точек c наибольшим расстоянием между ними");
            read_point(points_max_distance["t1"]);
            read_point(points_max_distance["t2"]); 
            break;      
        }

        case 5: {
            let len = readlineSync.questionFloat('Введите расстояние до точки: ');
            let name = readlineSync.question('Введите имя точки: ');
            let const_len_points = get_const_len_points(points, len, name);
            if (const_len_points.length != 0) {
                console.log("Точки, не превышвющие расстояния " + len + "от точки " + name);
                read(const_len_points);
            }
            else {
                console.log("Нет точек, удовлетворяющих данному условию.");
            }
            break;
        }

        case 6: {
            let keys_coordinat = ['OX', 'OY'];
            let index_axes = readlineSync.keyInSelect(keys_coordinat, "\nВыберите ось координат");
            if (index_axes < 0){
                console.log("Не выбрана ось координат.");
                break;
            }
            let position;
            let index_position;
            if (index_axes == 0){
                position = ['Выше', 'Ниже'];
                index_position = readlineSync.keyInSelect(position, "\nВыберите положение");
            }

            if (index_axes == 1){
                position = ['Правее', 'Левее'];
                index_position = readlineSync.keyInSelect(position, "\nВыберите положение");
            }
            if (index_position < 0){
                console.log("Не выбрано положение.");
                break;
            }
            let choosen_points = get_with_position(points, index_axes, index_position);
            if (choosen_points.length == 0){
                console.log("Нет точек, удовлетворяющих условию");
            }
            else{
                console.log("Точки, удовлетворяющие условию: ");
                read(choosen_points);
            }
            break; 
        }
        case 7: {
            let str_coordinates = readlineSync.question('Введите координаты левой нижней и правой верхней вершин прямоугольника в формате x1 y1 x2 y2: ');

            let coordinates = [];
            if (str_coordinates.length != 0)
                coordinates = str_coordinates.split(' ');

            for (let i = 0; i < coordinates.length; i++){
                coordinates[i] = parseInt(coordinates[i]);
            }

            if (coordinates.length != 4){
                    console.log('Некорректный ввод данных.');
                    break;
            }
            let min_x = coordinates[0];
            let max_x = coordinates[2];
            let min_y = coordinates[1];
            let max_y = coordinates[3];

            let choosen_points = get_in_rect(points, min_x, max_x, min_y, max_y);
            if (choosen_points.length == 0){
                console.log("Нет точек, лежащих внутри заданного прямоугольника");
            }
            else{
                console.log("Точки, лежащие внутри заданного прямоугольника: ");
                read(choosen_points);
            }
            break;
        }
    }
}






