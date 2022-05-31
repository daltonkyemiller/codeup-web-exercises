'use strict';
import { WEATHER_ICONS } from './weather_map/icons.js';

const OPEN_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/3.0/onecall';
let variables = {
    location: 'San Antonio, TX',
    currTime: new Date(),
    userSetTime: new Date(),
    units: 'imperial'
};


const DayCard = (day, temp, desc) => {
    return {
        //language=HTML
        element: htmlToElement(`
            <div class="day-card">
                <div class="day">${day}</div>
                <div class="temp">${temp}</div>
                <div class="desc-container">
                    <div class="desc">${desc.desc}</div>
                    <div class="desc-img">${WeatherIcon(desc.iconCode)}</div>
                </div>
            </div>

        `)
    };
};

const WeatherIcon = (code) => {
    let icon;
    console.log(code.toString()[0]);
    switch (code.toString()[0]) {
        case '2':
            icon = WEATHER_ICONS.THUNDERSTORM;
            break;
        case '3':
            icon = WEATHER_ICONS.RAIN;
            break;
        case '5':
            icon = WEATHER_ICONS.RAIN;
            break;
        case '6':
            icon = WEATHER_ICONS.SNOW;
            break;
        case '7':
            icon = WEATHER_ICONS.ATMOSPHERE;
            break;
        case '8':
            icon = WEATHER_ICONS.SUNNY;
            break;
        default:
            icon = WEATHER_ICONS.RAIN;


    }
    //language=HTML
    return `
        <div class="weather-icon">${icon}</div>`;
};

const TIMES = {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    NIGHT: 'night'
};


const getTimeOfDay = (date) => {
    if (date.getHours() < 12 && date.getHours() > 4) return TIMES.MORNING;
    else if (date.getHours() < 18 && date.getHours() > 4) return TIMES.AFTERNOON;
    else if (date.getHours() < 20 && date.getHours() > 4) return TIMES.EVENING;
    else return TIMES.NIGHT;
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


const setBG = (date) => {
    const bgGradients = $('#bg [id*="gradient"]');
    const dawnGradient = $('#dawn-gradient');
    const dayGradient = $('#day-gradient');
    const duskGradient = $('#dusk-gradient');
    const nightGradient = $('#night-gradient');
    const clouds = $('#bg #morning-clouds');
    let currGradient;

    switch (getTimeOfDay(date)) {
        case TIMES.MORNING:
            currGradient = dawnGradient;
            clouds.css('background', 'url("../../img/weather_map/morning-clouds.jpg") top right');
            setDarkMode(false);
            break;
        case TIMES.AFTERNOON:
            currGradient = dayGradient;
            clouds.css('background', 'url("../../img/weather_map/clouds.jpg") bottom right');
            setDarkMode(false);
            break;
        case TIMES.EVENING:
            currGradient = duskGradient;
            clouds.css('background', 'url("../../img/weather_map/morning-clouds.jpg") top right');
            setDarkMode(true);
            break;
        case TIMES.NIGHT:
            clouds.css('background', 'url("../../img/weather_map/morning-clouds.jpg") top right');
            currGradient = nightGradient;
            setDarkMode(true);
            break;
    }
    currGradient.fadeTo(500, 1);
    bgGradients.not(currGradient).fadeTo(500, 0);

};

const setDailyWeatherCards = (weatherData) => {
    let cards = weatherData.daily.filter((day, idx) => idx < 6 && idx !== 0).map((day) => {
        const date = new Date(day.dt * 1000);
        return $(DayCard(date.toDateString(), day.temp.day, {
                desc: day.weather[0].description,
                iconCode: day.weather[0].id,
            },
        ).element);
    });

    $('#forecast-daily-cards').html(cards);
};
const setCurrentCard = (weatherData, date) => {

    const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const todayCard = $('#today-card');
    let welcomeMsg = 'Good ' + getTimeOfDay(date);

    todayCard.find('.time').html(time);
    todayCard.find('.day').html(date.toLocaleDateString('en-US'));
    todayCard.find('.temp').html(weatherData.temp);
    todayCard.find('.welcome').html(welcomeMsg);
    todayCard.find('.desc').html(weatherData.weather[0].description);
    todayCard.find('.location').html(variables.location);

    todayCard.find('.desc-icon').html(WeatherIcon(weatherData.weather[0].id));
};

const initTimeSlider = () => {
    $('#hourly-ticks').children().each((idx, option) => {
        const hours = new Date();
        hours.setHours(variables.currTime.getHours() + idx);
        $(option).attr('label', (hours.getHours() + 24) % 12 || 12);
    });
};

const renderData = () => {
    getWeatherData(variables.location, variables.units)
        .then(weatherData => {
            const currentData = weatherData.hourly.reduce((accum, curr) => {
                const time = variables.userSetTime.getTime() / 1000;
                return Math.abs(curr.dt - time) < Math.abs(accum.dt - time) ? curr : accum;
            });
            initTimeSlider();
            setDailyWeatherCards(weatherData);
            setCurrentCard(currentData, variables.userSetTime);
            setBG(variables.userSetTime);
        });

};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        reverseGeocode({ lng: pos.coords.longitude, lat: pos.coords.latitude }, MAPBOX_API_KEY).then(place => {
            variables.location = place.features[2].place_name.split(',')[0];
            console.log('reverse geo');
            renderData();
        });
    });
}
renderData();


$('#time-range').change((e) => {
    variables.userSetTime = new Date();
    variables.userSetTime.setHours(new Date().getHours() + parseInt(e.target.value));
    renderData();
});

$('#search-form').submit((e) => {
    e.preventDefault();
    variables.location = $('#location-search').val();
    renderData();
});