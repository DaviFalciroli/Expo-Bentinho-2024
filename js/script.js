const apiKey = "3f8ece6f105b91e7b7072152514d7c03";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    console.log(data);
    return data;
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if (data.cod === "404") {
        alert("Cidade não encontrada!");
        return;
    }

    cityElement.innerText = data.name || "N/A";
    tempElement.innerText = data.main ? parseInt(data.main.temp) : "N/A";
    descElement.innerText = data.weather ? data.weather[0].description : "N/A";
    weatherIconElement.setAttribute("src", data.weather ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : "");
    humidityElement.innerText = data.main ? `${data.main.humidity}%` : "N/A";
    windElement.innerText = data.wind ? `${data.wind.speed}km/h` : "N/A";
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city);
});
