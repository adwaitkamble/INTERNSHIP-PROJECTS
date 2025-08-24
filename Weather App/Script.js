async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "4257f579c247c1b9027796e21dd04f96"; // Replace with your OpenWeatherMap API key
  const weatherCard = document.getElementById("weather-card");
  const errorMsg = document.getElementById("error");

  if (!city) {
    errorMsg.textContent = "Please enter a city name.";
    weatherCard.classList.add("hidden");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    errorMsg.textContent = "";
    weatherCard.classList.remove("hidden");
  } catch (error) {
    errorMsg.textContent = "Error: " + error.message;
    weatherCard.classList.add("hidden");
  }
}
