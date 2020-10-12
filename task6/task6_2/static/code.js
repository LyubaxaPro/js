"use strict";

window.onload = function() {
    // input fields
    const f_login = document.getElementById("field-login");
    const f_password = document.getElementById("field-password");
    // button
    const btn = document.getElementById("send-btn");

    // label
    const label = document.getElementById("result-label");

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

    // click event
    btn.onclick = function() {
        const login = f_login.value;
        const password = f_password.value;
        const url = `/api/save?login=${login}&password=${password}`;
        ajaxGet(url, function(stringAnswer) {
            // const objectAnswer = JSON.parse(stringAnswer);
            // const result = objectAnswer.result;
            alert(stringAnswer);
        });
    };
};
