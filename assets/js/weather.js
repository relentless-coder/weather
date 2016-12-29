setInterval(realClock, 1000);

function realClock() {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    document.getElementById("hour").innerHTML = hours;
    document.getElementById("minute").innerHTML = minutes;
    document.getElementById("second").innerHTML = seconds;
}

function createAlarm() {
    var hoursSelected = document.getElementById("select-hours").value;
    var minutesSelected = document.getElementById("select-minutes").value;
    alarmClock(hoursSelected, minutesSelected);
}

function alarmClock(hours, minutes) {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var alarmTime = new Date();
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alert("let's go");
    var alarmMilliseconds = alarmTime.getTime();
    var setOffAlarm = setInterval(function() {
        var currentTime = new Date();
        var currentMilliseconds = currentTime.getTime();
        console.log(alarmTime);
        console.log(currentTime);
        console.log(alarmMilliseconds);
        console.log(currentMilliseconds);
        if ((Math.floor(alarmMilliseconds / 1000)) === (Math.floor(currentMilliseconds / 1000))) {
            alert("Hey, I worked!");
            clearInterval(setOffAlarm);
        }
    }, 1000);
}

// Functions to be run to show time and hide time

function hideTime() {
    document.getElementById("clock").classList.remove("show-time");
    document.getElementById("clock").classList.add("hide-time");
    this.classList.add("hide");
    document.getElementById("show-clock-button").classList.remove("hide");
}

function showTime() {
    document.getElementById("clock").classList.remove("hide-time");
    document.getElementById("clock").classList.add("show-time");

    this.classList.add("hide");
    document.getElementById("hide-clock-button").classList.remove("hide");

}

//Button click events

document.getElementById("set-alarm").addEventListener("click", createAlarm);

document.getElementById("show-clock-button").addEventListener("click", showTime);
document.getElementById("hide-clock-button").addEventListener("click", hideTime);

document.getElementById("set-alarm").addEventListener("click", function() {
    document.getElementById("alarm").classList.add("hide");
});

document.getElementById("create-alarm-button").addEventListener("click", function() {
    document.getElementById("alarm").classList.remove("hide");
    this.classList.add("hide");
    document.getElementById("close-alarm-button").classList.remove("hide");
});

document.getElementById("close-alarm-button").addEventListener("click", function() {
    document.getElementById("alarm").classList.add("hide");
    this.classList.add("hide");

    document.getElementById("create-alarm-button").classList.remove("hide");
});

document.getElementById("get-weather").addEventListener("click", function() {
    document.getElementById("display-weather").style.display = "block";
})

// Angular Code

var myApp = angular.module("weatherClock", []);

myApp.controller("AlarmCtrl", ["$scope", function($scope) {
    $scope.hours = [];
    for (var i = 0; i < 24; i++) {
        $scope.hours.push(i);
    }
    $scope.minutes = [];
    for (var j = 0; j < 60; j++) {
        $scope.minutes.push(j);
    }

}]);

myApp.controller("GeoWeatherCtrl", ["$http", function($http) {
    var store = this;
    store.city = "";
    console.log(store.city);
    store.strings = [];
    this.getStrings = function() {
        store.strings = ["It is", "0", "C", "in"];
    };
    this.demandWeather = {};
    this.demandWeatherFunction = function() {
        $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + store.city + "&units=metric&APPID=99980bcecccbbeeacf1cba8385c23358").then(function(data) {
            console.log(store.city);
            console.log(data);
            store.demandWeather = data;
            store.city = "";
            return data;
        });
    };
}]);
