
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

document.querySelector('.locationInput').addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type a city name');
    } else {
        cityInput = search.value;
        console.log(cityInput)
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${month}/${day}/${year}`).getDay()];
}

function fetchWeatherData() {
    console.log(cityInput);
    fetch(`http://api.weatherapi.com/v1/current.json?key=be52b745735847b1b9e223020242805&q=${cityInput}`, {
        mode: 'cors' // Correct mode for fetching data
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const dy=data.current.is_day
        let ttd
        if (dy) {
            ttd="day"
            
        }else{
            ttd="night"
        }
        const time = date.substr(11);
        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = data.location.name;
        const iconUrl = data.current.condition.icon;
        const iconId = iconUrl.split("/").pop(); // This extracts the file name at the end of the URL
        console.log(iconId)
        icon.src = `./icons/64x64/${ttd}/${iconId}`;
        


        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + " km/h";

        let timeOfDay = "day";
        if (!data.current.is_day) {
            timeOfDay = "night";
        }

        const code = data.current.condition.code;
        if (code == 1000) {
            app.style.backgroundImage = `url(./${timeOfDay}/clear.jpg)`;
            btn.style.background = '#e5ba92';
            if (timeOfDay == "night") {
                btn.style.background = '#181e27';
            }
        } else if ([1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(code)) {
            app.style.backgroundImage = `url(./${timeOfDay}/cloud.jpg)`;
            btn.style.background = '#fa6d1b';
            if (timeOfDay == 'night') {
                btn.style.background = '#181e27';
            }
        } else if ([1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1279, 1192, 1195, 1204, 1207, 1240, 1243, 1246, 1249, 1252].includes(code)) {
            app.style.backgroundImage = `url(./${timeOfDay}/rain.jpg)`;
            btn.style.background = '#647d75';
            if (timeOfDay == "night") {
                btn.style.background = '#325c80';
            }
        } else {
            app.style.backgroundImage = `url(./${timeOfDay}/snow.jpg)`;
            btn.style.background = '#4d72aa';
            if (timeOfDay == "night") {
                btn.style.background = '#1b1b1b';
            }
        }
        app.style.opacity = "1";
    })
    .catch(() => {
        alert('City not found');
        app.style.opacity = "1";
    });
}

fetchWeatherData();
app.style.opacity = "1";

