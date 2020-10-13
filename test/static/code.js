// // // "use strict";
// // // DOMContentLoaded – браузер полностью загрузил HTML, было построено DOM-дерево, но внешние ресурсы, такие как картинки <img> и стили, могут быть ещё не загружены.
// // // load – браузер загрузил HTML и внешние ресурсы (картинки, стили и т.д.).
// // // beforeunload/unload – пользователь покидает страницу.

// // // Событие load на объекте window наступает, 
// // // когда загрузилась вся страница, включая стили, картинки и другие ресурсы.
// // window.onload = function() {
// //     // get links to buttons
// //     //получаем идентификатор элемента
// //     const a = document.getElementById("a-btn-id");
// //     const b = document.getElementById("b-btn-id");

// //     // event click
// //     // Событие onclick возникает при щелчке 
// //     // левой кнопкой мыши на элементе, к которому добавлен атрибут onclick.
// //     //вешаем на него событие
// //     a.onclick = function() {
// //         alert("I am A");
// //     };

// //     // event click
// //     b.onclick = function() {
// //         alert("I am B");
// //     };
// // };

// "use strict";

// window.onload = function() {
//     // input fields
//     const f1 = document.getElementById("field-first");
//     const f2 = document.getElementById("field-second");

//     // button
//     const btn = document.getElementById("sum-find-btn");

//     // label
//     const label = document.getElementById("result-label");

//     // ajax get
//     //XMLHttpRequest это встроенный в браузер объект, который даёт возможность
//     // делать HTTP-запросы к серверу без перезагрузки страницы.
//     function ajaxGet(urlString, callback) {
//         let r = new XMLHttpRequest();
//         // open()  позволяет инициализировать только что созданный запрос (определить параметры запроса), или повторно инициализировать существующий запрос
//         r.open("GET", urlString, true);
//        // задает значение заголовка HTTP запроса.
//     //    В частности, при POST обязателен заголовок Content-Type, содержащий кодировку. Это указание для 
//     //    сервера – как обрабатывать (раскодировать) пришедший запрос.
//         r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
//         // отправляет запрос. принимает необязательные аргументы в тело запросов. 
//         //по умолчанию null
//         r.send(null);
//         r.onload = function() {
//             callback(r.response);
//         };
//     };

//     // click event
//     btn.onclick = function() {
//         const a = f1.value;
//         const b = f2.value;
//         const url = `/sum?a=${a}&b=${b}`;
//         ajaxGet(url, function(stringAnswer) {
//             const objectAnswer = JSON.parse(stringAnswer);
//             const result = objectAnswer.result;
//             label.innerHTML = `Ответ: ${result}`;
//         });
//     };
// };

"use strict";

window.onload = function() {
    // input fields
    const f_surname = document.getElementById("field-surname");
    const f_tel = document.getElementById("field-tel");
    const f_email = document.getElementById("field-email");
    // button
    const btn = document.getElementById("send-btn");

    // label
    const label = document.getElementById("result-label");

    
    function ajaxPost(urlString, bodyString, callback) {
        let r = new XMLHttpRequest();
        r.open("POST", urlString, true);
        //    В частности, при POST обязателен заголовок Content-Type, содержащий кодировку. Это указание для 
    //    сервера – как обрабатывать (раскодировать) пришедший запрос.
        r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        r.send(bodyString);
        r.onload = function() {
            callback(r.response);
        }
    }

    // click event
    btn.onclick = function() {
        f1_v = f1.value;
        f2_v = f2.value;
        f3_v = f3.value;
        console.log(":JGF");
        ajaxPost("/save/info", JSON.stringify({
            f1_v, f2_v, f3_v
        }), function(answerString) {
            const objectAnswer = JSON.parse(answerString);
            const result = objectAnswer.result;
            label.innerHTML = `Ответ: ${result}`
        });
    }
};
