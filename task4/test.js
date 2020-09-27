"use strict";

const express = require("express");

const app = express();
const port = 5014;
app.listen(port);
console.log("My server on port " + port);

app.get("/calculate/sum", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const sInt = aInt + bInt;
    const answerJSON = JSON.stringify({result: sInt});
    response.end(answerJSON);
});