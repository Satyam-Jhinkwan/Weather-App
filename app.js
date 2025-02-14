const apiKey = "a60a740213bfb4252eb902b1c10d4ace";
const weatherInfo = document.getElementById("weatherInfo");

async function getWeather(city) {
  if (!city) {
    const cityInput = document.getElementById("cityInput").value;
    if (cityInput === "") {
      weatherInfo.innerHTML = "<p>Please Enter A City Name</p>";
      return;
    }
    city = cityInput;
    localStorage.setItem("lastCity", city);
  }
  if (city === "") {
    city = cityInput.value;
    if (city === "") {
      weatherInfo.innerHTML = "<p>Please Enter A City Name</p>";
      return;
    }
    localStorage.setItem("lastCity", city);
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const weatherHTML = `
              <h3>${data.name}, ${data.sys.country}</h3>
              <p>Temperature: ${data.main.temp}°C</p>
              <p>Humidity: ${data.main.humidity}%</p>   
              <p>Condition: ${data.weather[0].description}</p>
              <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
      `;
    weatherInfo.innerHTML = weatherHTML;
    document.getElementById("cityInput").value = city;
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  }
}

window.onload = function () {
  const lastCity = localStorage.getItem("lastCity");
  const cityInput = document.getElementById("cityInput");
  if (lastCity) {
    cityInput.value = lastCity;
    getWeather(lastCity);
  }
};
