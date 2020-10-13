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

//     // ajax get
//     function ajaxGet(urlString, callback) {
//         let r = new XMLHttpRequest();
//         r.open("GET", urlString, true);
//         r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
//         r.send(null);
//         r.onload = function() {
//             callback(r.response);
//         };
//     };

//     // click event
//     btn.onclick = function() {
//         const surname = f_surname.value;
//         const tel = f_tel.value;
//         const email = f_email.value;
//         const url = `/send?surname=${surname}&tel=${tel}&email=${email}`;
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
        surname = f_surname.value;
        tel = f_tel.value;
        email = f_email.value;
        ajaxPost("/save/info", JSON.stringify({
            f1_v, f2_v, f3_v
        }), function(answerString) {
            const objectAnswer = JSON.parse(answerString);
            const result = objectAnswer.result;
            label.innerHTML = `Ответ: ${result}`
        });
    }
};
