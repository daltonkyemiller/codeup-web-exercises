'use strict';
import { WEATHER_ICONS } from './weather_map/icons.js';

const OPEN_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';
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

const TodayCard = (temp, location, time, day, desc) => {
    return {
        //language=HTML
        element: htmlToElement(`
            <div id="today-card">
                <div class="temp">${temp}</div>
                <div class="ltd-container">
                    <!--<div class="welcome">Good Morning</div>-->
                    <div class="location">${location}</div>
                    <div class="time">${time}</div>
                    <div class="day">${day}</div>
                </div>
                <div class="desc-container">
                    <div class="desc-icon">${desc.icon}</div>
                    <div class="desc">${desc.label}</div>
                </div>
            </div>
        `)
    };
};

const WeatherIcon = (code) => {
    let icon;
    if (code >= 200) icon = WEATHER_ICONS.THUNDERSTORM;
    if (code >= 300) icon = WEATHER_ICONS.RAIN;
    if (code >= 312) icon = WEATHER_ICONS.HEAVY_RAIN;
    if (code >= 500) icon = WEATHER_ICONS.HEAVY_RAIN;
    if (code >= 600) icon = WEATHER_ICONS.SNOW;
    if (code >= 700) icon = WEATHER_ICONS.ATMOSPHERE;
    if (code >= 800) icon = WEATHER_ICONS.SUNNY;
    if (code >= 801) icon = WEATHER_ICONS.FEW_CLOUDS;


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
const cityFromAddress = (address) => address.split(',')[0];

const getWeatherData = (location, units) => {
    return geocode(location, MAPBOX_API_KEY)
        .then(coords => {
            return $.get(OPEN_WEATHER_ENDPOINT, {
                APPID: OPEN_WEATHER_KEY,
                lat: coords[1],
                lon: coords[0],
                units: units
            }).catch(e => setModal({ title: 'Can\'t fetch weather data', type: 'error' }));
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

    todayCard.fadeOut('fast', () => {
        todayCard.replaceWith(TodayCard(weatherData.temp, variables.location, time, date.toLocaleDateString('en-US'), {
            label: weatherData.weather[0].description,
            icon: WeatherIcon(weatherData.weather[0].id)
        }).element);
    });

    // todayCard.find('.time').html(time);
    // todayCard.find('.day').html(date.toLocaleDateString('en-US'));
    // todayCard.find('.temp').html(weatherData.temp);
    // todayCard.find('.welcome').html(welcomeMsg);
    // todayCard.find('.desc').html(weatherData.weather[0].description);
    // todayCard.find('.location').html(variables.location);
    //
    // todayCard.find('.desc-icon').html(WeatherIcon(weatherData.weather[0].id));
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
            const center = [weatherData.lon, weatherData.lat];
            MAP.flyTo({ center });
            MAP_MARKER.setLngLat(center);
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


MAP_MARKER.on('dragend', (e) => {
    reverseGeocode(e.target._lngLat, MAPBOX_API_KEY)
        .then(place => {
            variables.location = cityFromAddress(place.features[2].place_name);
            renderData();
        });
});

MAP_GEOCODER.on('result', (e) => {
    variables.location = e.result.place_name;
    MAP_MARKER.setLngLat({ lon: e.result.center[0], lat: e.result.center[1] });
    MAP.flyTo({
        center: e.result.center
    });
    renderData();
});