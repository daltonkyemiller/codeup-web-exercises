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

const getWeatherData = (location, units) => {
    return geocode(location, MAPBOX_API_KEY)
        .then(coords => {
            return $.get(OPEN_WEATHER_ENDPOINT, {
                APPID: OPEN_WEATHER_KEY,
                lat: coords[1],
                lon: coords[0],
                units: units
            })
                .catch(e => setModal({ title: 'Error retrieving weather data', type: 'error' }));
        })
        .catch(e => setModal({ title: 'Can\'t find the location...', type: 'error' }));
};

getWeatherData().then(res => console.log(res));

const setGradient = (date) => {
    const bgGradients = $('#bg [id*="gradient"]');
    const dawnGradient = $('#dawn-gradient');
    const dayGradient = $('#day-gradient');
    const duskGradient = $('#dusk-gradient');
    const nightGradient = $('#night-gradient');
    let currGradient = nightGradient;
    if (date.getHours() < 12) currGradient = dawnGradient;
    else if (date.getHours() < 18) currGradient = dayGradient;
    else if (date.getHours() < 20) currGradient = duskGradient;

    currGradient.animate({ opacity: 1 }, 1000);
    bgGradients.not(currGradient).animate({ opacity: 0 }, 1000);
    console.log(currGradient);

};

const setDailyWeatherCards = (weatherData) => {
    let cards = weatherData.daily.filter((day, idx) => idx < 6 && idx !== 0).map((day) => {
        const date = new Date(day.dt * 1000);
        return $(DayCard(date.toDateString(), day.temp.day, day.weather[0].description).element);
    });

    $('#forecast-daily-cards').html(cards);
};
const setCurrentCard = (weatherData, date) => {
    const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const todayCard = $('#today-card');
    let welcomeMsg = 'Good ';
    if (date.getHours() < 12) welcomeMsg += 'Morning';
    else if (date.getHours() < 18) welcomeMsg += 'Afternoon';
    else welcomeMsg += 'Evening';
    todayCard.find('.time').html(time);
    todayCard.find('.day').html(date.toLocaleDateString('en-US'));
    todayCard.find('.temp').html(weatherData.current.temp);
    todayCard.find('.welcome').html(welcomeMsg);
};


const renderData = () => {
    getWeatherData('San Antonio, TX', 'imperial')
        .then(weatherData => {
            setDailyWeatherCards(weatherData);
            setCurrentCard(weatherData, new Date());
            setGradient(new Date());
        });

};

renderData();
setInterval(renderData, 5000);


