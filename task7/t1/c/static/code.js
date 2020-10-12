// "use strict";

// window.onload = function() {
//     // input fields
//     const f_surname = document.getElementById("field-surname");
//     const f_tel = document.getElementById("field-tel");
//     const f_email = document.getElementById("field-email");
//     // button
//     const btn = document.getElementById("send-btn");

//     // label
//     const label = document.getElementById("result-label");

    
//     function ajaxPost(urlString, bodyString, callback) {
//         let r = new XMLHttpRequest();
//         r.open("POST", urlString, true);
//         //    В частности, при POST обязателен заголовок Content-Type, содержащий кодировку. Это указание для 
//     //    сервера – как обрабатывать (раскодировать) пришедший запрос.
//         r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//         r.send(bodyString);
//         r.onload = function() {
//             callback(r.response);
//         }
//     }

//     // click event
//     btn.onclick = function() {
//         const surname = f_surname.value;
//         const tel = f_tel.value;
//         const email = f_email.value;
//         ajaxPost("/save/info", JSON.stringify({
//             surname, tel, email
//         }), function(answerString) {
//             const objectAnswer = JSON.parse(answerString);
//             const result = objectAnswer.result;
//             label.innerHTML = `Ответ: ${result}`
//         });
//     }
// };


// ajax get
function ajaxGet(urlString, callback) {
    let r = new XMLHttpRequest();
    r.open("GET", urlString, true);
    r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    r.send(null);
    r.onload = function() {
        callback(r.response);
    };
};


function makeAction0() {
    const inputMessage = "Введите название машины и её цену";
    const inputDefault = "car 0";
    const input = prompt(inputMessage, inputDefault);

    if(!input) return;
    if(!input.trim()) return;

    const arr = input.trim().split(" ");
    const car = arr[0];
    const cost = arr[1];

    const url = `/create/new/car?car=${car}&cost=${cost}`;
    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        const result = objectAnswer.answer;
        alert(result);
    });
}


function makeAction1() {
    const inputMessage = "Введите название машины";
    const inputDefault = "car";
    const input = prompt(inputMessage, inputDefault);

    if(!input) return;
    if(!input.trim()) return;

    const arr = input.trim().split(" ");
    const car = arr[0];

    const url = `/get/data/car?car=${car}`;
    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        const result = objectAnswer.answer;
        if (result)
            alert(result);
        else{
            s = "Нет машины с таким названием.";
            alert(s);
        }
    });
}

function makeAction2() {
    const inputMessage = "Введите название склада и названия машин";
    const inputDefault = "WN";
    const input = prompt(inputMessage, inputDefault);

    if(!input) return;
    if(!input.trim()) return;

    const arr = input.trim().split(" ");
    const warehouse = arr[0];
    arr.shift();

    const url = `/create/new/warehouse?warehouse=${warehouse}&cars_arr=${arr}`;
    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        const result = objectAnswer.answer;
        alert(result);
    });
}

function makeAction3() {
    const inputMessage = "Введите название склада";
    const inputDefault = "WN";
    const input = prompt(inputMessage, inputDefault);

    if(!input) return;
    if(!input.trim()) return;

    const arr = input.trim().split(" ");
    const warehouse = arr[0];

    const url = `/get/data/warehouse?warehouse=${warehouse}`;
    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        const result = objectAnswer.answer;
        if (result)
            alert(result);
        else{
            s = "Нет склада с таким названием.";
            alert(s);
        }
    });
}

var radio = document.getElementsByName('prim');

for (var i=0; i<radio.length; i++) {
	radio[i].onchange = testRadio;
}

function testRadio(){
	console.log (this.value);
}

document.getElementById('one').onclick = checkRadio;

function checkRadio(){
	var m = document.getElementsByName('prim');
	for( var i=0; i<m.length; i++){
		if ( m[i].checked ) {
            if (i === 0)
                makeAction0();
            if (i === 1)
                makeAction1();
            if (i === 2)
                makeAction2();
            if (i === 3)
                makeAction3();
			break;
		}
	}
}

