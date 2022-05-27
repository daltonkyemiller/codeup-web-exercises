'use strict';
import { MAPBOX_API_KEY, OPEN_WEATHER_KEY } from './keys.js';
import { geocode } from './mapbox-geocoder-utils.js';

const OPEN_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';


const DayCard = (day, temp, desc) => {
    return {
        //language=HTML
        element: htmlToElement(`
            <div class="day-card">
                <div class="day">${day}</div>
                <div class="temp">${temp}</div>
                <div class="desc">${desc}</div>
            </div>

        `)
    };
};

const getWeatherData = async () => {
    const coords = await geocode('San Antonio, TX', MAPBOX_API_KEY);
    return $.get(OPEN_WEATHER_ENDPOINT, {
        APPID: OPEN_WEATHER_KEY,
        lat: coords[1],
        lon: coords[0],
        units: 'imperial'
    });
};

console.log(await getWeatherData());


const setWeatherCards = async () => {
    (await getWeatherData()).daily.filter((day, idx) => idx < 6 && idx !== 0).forEach((day) => {
        const date = new Date(day.dt * 1000);
        console.log(day.weather[0].description);
        $('#forecast #forecast-cards').append($(DayCard(date.toDateString(), day.temp.day, day.weather[0].description).element));
    });
};
await setWeatherCards();


const bgGradients = $('#bg [id*="gradient"]');
$('.time-change').click(e => {
    const gradient = $(`#${e.target.value.toLowerCase()}-gradient`);
    gradient.animate({ opacity: 1 }, 1000);
    bgGradients.not(gradient).animate({ opacity: 0 }, 1000);
});