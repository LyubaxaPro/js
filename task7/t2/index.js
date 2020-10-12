"use strict";
// В Node js дочерние процессы создаются для выполнения ресурсоемких операций, которые во время выполнения 
// блокируют цикл событий основного процесса.
// получаем параметры скрипта
const valueA = "" + process.argv[2];
// const valueB = "" + process.argv[3];

// импортируем библиотеку
const execSync = require('child_process').execSync;

// функция для вызова программы и получения результата её работы
function useCmd(s) {
	const options = {encoding: 'utf8'};
    const cmd = s.toString();
    //метод не вернется, пока дочерний процесс не будет полностью закрыт.
	const answer = execSync(cmd, options);
	return answer.toString();
}

// получаем факториал
const factorialCommand = `node factorial.js ${valueA}`;
console.log(factorialCommand);
let factorial = useCmd(factorialCommand);
factorial = parseInt(factorial);
console.log(factorial);

// получаем массив факториалов
//${valueA}
//const factorial_arrCommand = `node factorial_arr.js`;
// console.log(factorial_arrCommand);
// let factorial_arr = useCmd(factorial_arrCommand);
// //factorial_arr = parseInt(factorial);
// console.log(factorial_arr);