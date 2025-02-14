/**
 * Copyright (c) 2024 Vili
 * Licensed under the GPL-3.0
 */

let n = new Date();
let y = n.getFullYear();
let m = n.getMonth() + 1;
let d = n.getDate();
document.getElementById("date").innerHTML = "Current date: " + d + "/" + m + "/" + y;

let weather = {
    fetchWeather: function (city) {
        fetch('/api/weather?city=' + city)
            .then(response => response.json())
            .then(data => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, feels_like } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Today's weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C, feels like " + feels_like + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

console.log(weather.fetchWeather)

// If user clicks on search button, run search function.
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

// If user presses enter, run search function.
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});


// Get user's current city and fetch weather from there.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        fetch('/api/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude)
            .then(response => response.json())
            .then(data => {
                const {name} = data;
                weather.fetchWeather(name);
            });
    });
} else {
    alert("Geolocation is not supported by this browser. Fetching weather from default location.");
    weather.fetchWeather("London");
}