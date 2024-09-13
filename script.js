const getWeather = document.querySelector("#getWeather");

getWeather.addEventListener("click", (e) => {
  let cityInput = document.querySelector("#city");
  let city = cityInput.value;

  if (!city) {
    alert('Please Enter a city name');
    return;
  }

  const apiKey = "eae80a54dc637d9fbeca7590582b47dd";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error('City not found');  // Handle response errors
      }
      return res.json();
    })
    .then((data) => {
      document.querySelector("#cityName").textContent = data.name;
      document.querySelector("#temperature").textContent = `Temperature: ${data.main.temp} °C`;
      document.querySelector("#description").textContent = `Description: ${data.weather[0].description}`;

      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.querySelector("#weatherIcon").setAttribute('src', iconUrl);

      // Clear the input field
      cityInput.value = "";
    })
    .catch((error) => {
      alert('Error: City not found. Please enter a valid city name.');
      console.error('Error fetching weather data:', error);
    });
});
