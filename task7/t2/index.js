"use strict";
// В Node js дочерние процессы создаются для выполнения ресурсоемких операций, которые во время выполнения 
// блокируют цикл событий основного процесса.
// получаем параметры скрипта
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
let arr = process.argv.slice(2);

	for (let i = 0; i < arr.length; i++){
		let factorialCommand = `node factorial.js ${arr[i]}`;
		console.log(factorialCommand);
		let factorial = useCmd(factorialCommand);
		console.log(factorial);
}
