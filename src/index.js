const url = 'https://ipinfo.io/json?token=d1d8c4c5eabe00'

import 'bootstrap';
import 'jquery'
var mapboxgl = require('../node_modules/mapbox-gl/dist/mapbox-gl.js');


$.getJSON(url , function(response) {
    var loc = response.loc.split(',').reverse();
    mapboxgl.accessToken = 'pk.eyJ1IjoibGluYXZtaWR1IiwiYSI6ImNrYXV2ZWkxMzB5emsyemwyYXBmbjh5NWQifQ.0h2HEaq7feO-o7y7zLvCXw';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: loc,
    zoom: 12,
});
document.getElementById('longtitude').innerHTML=`Longtitude: ${loc[0]}`
document.getElementById('latitude').innerHTML=`Latitude: ${loc[1]}`
document.getElementById('button-addon2').addEventListener('click', async function mapFly(){
    let city = document.querySelector('.input').value
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiYW50b241NTMzMjIiLCJhIjoiY2thdXZmbDRoMDV6YzJ4dTk3Ymk5b3E4dyJ9.mdkX1Z26DQVJEa54fEEGTA`
    let response = await fetch(url)
    let data = await response.json()
    let coords = data.features[0].center
    document.getElementById('longtitude').innerHTML=`Longtitude: ${coords[0]}`
    document.getElementById('latitude').innerHTML=`Latitude: ${coords[1]}`
    map.flyTo({
        center: [coords[0], coords[1]],
        essential: true 
        });
    getcurrentWeather(coords[0] , coords[1])
})
});

async function getcurrentWeather(lat,lon){
    let url = `https://api.weatherapi.com/v1/forecast.json?key=a4ba5ff5d7e34884bc9173803203105&q=${lat},${lon}&days=3` 
    let response = await fetch(url) 
    let data = await response.json()
    console.log(data)
    createWeather(data)
}

function createWeather(data){
    document.querySelector('#weather').innerHTML = ''
    let currentWeather = document.createElement('div') 
    let nextDaysWether = document.createElement('div') 
    currentWeather.classList.add('currentWeather') 
    nextDaysWether.classList.add('nextDaysWether') 
    currentWeather.innerHTML = `<p class='avg_temp_c'>Temperature: ${data.current.temp_c}°С</p>
    <p>Feels like: ${data.current.feelslike_c} </p>
    <p>${data.current.condition.text} <img src="${data.current.condition.icon}" alt=""> </p>`
    document.querySelector('#weather').appendChild(currentWeather)
}



document.querySelector('.img-change').addEventListener('click', changebackground)

async function changebackground() {
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=HfnaaV0DUIzeODJBl5XcxAcW2kesfr5HwKt8IJqItmQ'
    let response = await fetch(url)
    let data = await  response.json()
    console.log(data.urls.full)
    document.body.style.backgroundImage  = `url("${data.urls.full}")`
}

$('.calvin').button('toggle')