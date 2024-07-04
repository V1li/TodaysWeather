/**
 * Copyright (c) 2024 Vili
 * Licensed under the GPL-3.0
 */

require('dotenv').config({ path: './.env' });
var host = "127.0.0.1";
var port = 1337;
var express = require("express");
var axios = require("axios");

var app = express();
app.use(express.static(__dirname + "/static")); // use static files in ROOT/public folder

app.get("/", function(request, response){ // root dir
    response.sendFile(__dirname + "/index.html");
});

app.get("/api/weather", function(request, response){ // new endpoint to retrieve weather data
    const apiKey = process.env.API_KEY;
    // console.log(apiKey)
    const city = request.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url)
        .then(response => response.data)
        .then(data => {
            response.json(data);
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: "Failed to retrieve weather data" });
        });
});

app.listen(port, host);
console.log("Server started on https://" + host + ":" + port);