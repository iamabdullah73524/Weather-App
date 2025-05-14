const apikey = "20da423906ccf27bec8c2d81c8f4a2eb";

const weatherdata = document.querySelector(".weather-detail");

const cityname =document.querySelector("#city-name");

const formele = document.querySelector("form");

const imgicon = document.querySelector(".icon");

formele.addEventListener("submit",(e)=>{
    e.preventDefault()
    const cityvalue = cityname.value
    console.log(cityvalue);
    getweatherdata(cityvalue)
});

async function getweatherdata(cityvalue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response is not ok");
            
        }
        const data = await response.json();


        console.log(data);

        const tempreture = Math.floor(data.main.temp);

        const description = data.weather[0].description;
        
        const icon = data.weather[0].icon

        weatherdata.querySelector(".degree").textContent =`${tempreture}°C`;
        weatherdata.querySelector(".dicr").textContent =`${description}`;
        imgicon.innerHTML=`<img src="https://openweathermap.org/img/wn/${icon}.png" alt="" id="">`

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `wind speed: ${data.wind.speed}m/s`
        ];

        weatherdata.querySelector(".details").innerHTML=details.map((details)=>{
           return `<div>${details}</div>`
        }).join("")


    }
   catch(err){
  console.error(err);
}

}