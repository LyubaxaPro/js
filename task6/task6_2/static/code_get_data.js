"use strict";

window.onload = function() {
    // label
    const login_label = document.getElementById("login-label");
    const hobby_label = document.getElementById("hobby-label");
    const age_label = document.getElementById("age-label");
    const password_label = document.getElementById("password-label");

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

    const url = `/api/get`;
    ajaxGet(url, function(stringAnswer) {
        const objectAnswer = JSON.parse(stringAnswer);
        if (objectAnswer.status){
            const login = objectAnswer.login;
            const hobby = objectAnswer.hobby;
            const age = objectAnswer.age;
            const password = objectAnswer.password;
            login_label.innerHTML = `Login: ${login}`;
            hobby_label.innerHTML = `Hobby: ${hobby}`;
            age_label.innerHTML = `Age: ${age}`;
            password_label.innerHTML = `Password: ${password}`;
        } else {
            login_label.innerHTML = `Wrong user data`;
        }
        
    });
};
