"use strict";

// получаем параметры скрипта
const manSurname = "" + process.argv[2];
const manName = "" + process.argv[3];
const manAge = "" + process.argv[4];

// формируем сообщение
const surnameMessage = "Фамилия: " + manSurname;
const nameMessage = "Имя: " + manName;
const ageMessage = "Возраст: " + manAge;
const finanMessageValue = surnameMessage + "\n" + nameMessage + "\n" + ageMessage;

// вывод сообщения на экран
console.log(finanMessageValue);