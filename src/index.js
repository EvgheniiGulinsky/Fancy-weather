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
    createWeather(data)
    getcurrentWeather(coords[0] , coords[1])
})
});

async function getcurrentWeather(lat,lon){
    let url = `http://api.weatherapi.com/v1/forecast.json?key=a4ba5ff5d7e34884bc9173803203105&q=${lat},${lon}&days=3` 
    let response = await fetch(url) 
    let data = await response.json()
    console.log(data)
    let condition = data.current.condition
    let feelslike_c = data.current.feelslike_c
    let feelslike_f = data.current.feelslike_f
    let temp_c = data.current.temp_c
    let temp_f = data.current.temp_f
    createWeather(data)
}

function createWeather(data){
    document.querySelector('.weatherOnToday').innerHTML = ''
    let currentWeather = document.createElement('div') 
    let nextDaysWether = document.createElement('div') 
    currentWeather.classList.add('currentWeather') 
    nextDaysWether.classList.add('nextDaysWether') 
    currentWeather.innerHTML = ' '
    currentWeather.innerHTML = `<p class='avg_temp_c'>${data.current.temp_c}°С</p>
    <p>${data.current.feelslike_c} </p>
    <p>${data.current.condition.text}</p>
    <img src="${data.current.condition.icon}" alt="">`
    document.querySelector('.weatherOnToday').appendChild(currentWeather)
}

