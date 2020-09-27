// Дана вложенная структура файлов и папок. Все файлы имеют раширение "txt".
// Необходимо рекурсивно перебрать вложенную структуру и вывести имена файлов, у которых содержимое не превышает по длине 10 символов.

"use strict";
const FILE_ERROR = -1;

function read_file(filename){
    const fs = require("fs");
    if (fs.existsSync(filename)) {
        const contentString = fs.readFileSync(filename, "utf8");
        return contentString;
    } else {
        console.log("Файл " + filename + "не найден.");
        return FILE_ERROR;
    }
}

// function find_in_folder(folder_name){
//     const fs = require("fs");
//     const arr = fs.readdirSync(folder_name);

//     for(let i = 0; i < arr.length; i++) {
//         const fileName = arr[i];
//         if (fileName.indexOf('.') == -1){
//             console.log(arr[i] + " - папка");
//            // find_in_folder((folder_name + "/" + arr[i]));
//         }
//         else {
//             let fileString = read_file(fileName);
//             if (fileString.length <= 10){
//                 console.log(arr[i]);
//             }
//         }
        
//     }
// }

// let folder_name = "./4_folder/b";
// find_in_folder(folder_name); 
"use strict";

function find_in_folder(folder_name){
    const fs = require("fs");

    const arr = fs.readdirSync(folder_name);

    for(let i = 0; i < arr.length; i++) {
        const fileName = arr[i];
        if (fileName.indexOf('.') == -1){
            find_in_folder(folder_name + "/" + fileName);
        } else{
            let fileString = read_file(folder_name + "/" + fileName);
            if (fileString.length <= 10)
                console.log(folder_name + "/" + fileName);
        }
    }
}

let folder_name = "./4_folder";
find_in_folder(folder_name);