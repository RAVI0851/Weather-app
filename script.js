const list = document.getElementById('info_list');
const button = document.getElementById('startbtn');
const city = document.getElementById('cityinput')
button.addEventListener("click", async function(){
    const cityName = city.value;
    if(cityName!=="")
        addCity(cityName);
});
async function addCity(cityName){
    const li = document.createElement('li');
    li.textContent = cityName;
    const apiKey = '22823b28cef73fbc154965e0a0945dd7';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      if(!response.ok) {
      throw new Error('City not found,Try again');
      }
      const data = await response.json();
      displayWeather(li,data);
    }
    catch(error){
        li.textContent += `--->${error.message}`;
    }
    list.appendChild(li);
    city.value ="";
}
function displayWeather(listItem,weatherData) {
    listItem.textContent = ` Temperature: ${weatherData.main.temp}°C         
     Conditions: ${weatherData.weather[0].description}`;
}