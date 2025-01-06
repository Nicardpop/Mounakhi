let button = document.querySelector('.button')
let geobutton = document.querySelector('.geolocation')
let inputvalue = document.querySelector('.inputValue')


let nameVal = document.querySelector('.name');
let countryName = document.querySelector('.cty');
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');
let humi = document.querySelector('.humi');
let wind = document.querySelector('.wind');

let icon = document.getElementById('wicon');
let main = document.querySelector('displayWeather');

let lati = document.querySelector('.lat');
let long = document.querySelector('.lon');

(()=>{
    main.innerHTML = "Waiting ...";
   
})

geobutton.addEventListener('click', function(){
    function success(position){
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=108dd9a67c96f23039937fe6f3c91963`)
    .then(response =>{
        if (response.status == 200){
            return response.json()
        }else{
            return console.err(response.status);
        }
    } )
    .then(displayData).catch(err => console.log(err) 
    ); 
    }
    function error(err){
        temp.textContent = `Please Allow the browser to access your location for this option to work !`

    }
    if(!navigator.geolocation){
        temp.textContent = `Geolocation is not supported or Allowed by your browser`;
    }else{
        temp.textContent = `Locating...`;
        navigator.geolocation.getCurrentPosition(success,error);
    }
    

})
function click(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputvalue.value}&units=metric&appid=108dd9a67c96f23039937fe6f3c91963`)
    .then(response =>{
        if (response.status == 200){
            temp.textContent = `loading...`;

            return response.json()
        }else if(response.status == 404){
            return alert('Wrong City name')
        }else if(response.status == 400){
            return alert('Enter a country name')
        }else{
            return console.err(response.status);
        }
    } )
    .then(displayData).catch(err => console.log(err)
        
    ); 

}
button.addEventListener('click', click)
// for detecting the "enter" key press 
inputvalue.addEventListener('keydown',(event) => {if(event.key === 'Enter'){
    click()
}});

const displayData=(weather)=>{
    var iconcode = weather.weather[0].icon;

    var cty = weather.name;
    countryName.innerText = `Country : ${cty}`;

    let temperature = Math.round(weather.main.temp);
    let description = weather.weather[0].description;
    let windSpeed = Math.round(weather.wind.speed);
    let humdity = Math.round(weather.main.humidity);

    let longitude = weather.coord.lon;
    let latitude = weather.coord.lat;
    console.log(longitude);
    console.log(latitude);

    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    lati.innerText = `latitude : ${latitude}`
    long.innerText = `longitude : ${longitude}`

    icon.src = iconurl;
    temp.innerText=`${temperature}°C`
    desc.innerText=`${description}`
    wind.innerText = `Wind speed :${windSpeed} Km`
    humi.innerText=`Humidity :${humdity} RH`

}
    
