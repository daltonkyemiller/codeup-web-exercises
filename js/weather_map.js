'use strict';
import { WEATHER_ICONS } from './weather_map/icons.js';
import { MOCK_WEATHER_DATA } from './weather_map/placeholder_data.js';

const OPEN_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';
const STATE = {
    location: 'San Antonio, TX',
    currTime: new Date(),
    userSetTime: new Date(),
    units: 'imperial',
    weatherData: MOCK_WEATHER_DATA,
    setLocation: (newLoc) => {
        geocode(newLoc, MAPBOX_API_KEY)
            .then(data => {
                return getWeatherData(data, STATE.units);
            })
            .then(weatherData => {
                MAP_MARKER.setLngLat({ lon: weatherData.lon, lat: weatherData.lat });
                MAP.flyTo({
                    center: [weatherData.lon, weatherData.lat]
                });
                STATE.location = newLoc;
                STATE.setWeatherData(weatherData);
            });
    },
    setUserSetTime: (newTime) => {
        STATE.userSetTime = newTime;
        setBG(newTime);
        setCurrentCard(newTime);
    },
    setUnits: (newUnits) => updateState(() => STATE.units = newUnits),
    setWeatherData: (newWeatherData) => updateState(() => STATE.weatherData = newWeatherData)
};
const updateState = (callback) => {
    callback();
    redraw();
};
const replaceEl = (oldEl, newEl, options = { fadeOutSpeed: 400 }) => {
    oldEl.fadeTo(options.fadeOutSpeed, 0, 'swing', () => {
        oldEl.replaceWith(newEl);
    });
};


// Card Component for Daily Forecast
const DayCard = (day, temp, desc, idx) => {
    return {
        //language=HTML
        element: htmlToElement(`
            <div class="day-card" style="--delay: ${idx}">
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

// Card Component Showing Current Weather Conditions
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

// Icon Component Translates Icon Code to Custom Icons
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

// Times for Gradient and Greeting
const TIMES = {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    NIGHT: 'night'
};


// Returns the Current Time of Day
const getTimeOfDay = (date) => {
    let time;
    if (date.getHours() < 12 && date.getHours() > 4) time = TIMES.MORNING;
    else if (date.getHours() < 18 && date.getHours() > 4) time = TIMES.AFTERNOON;
    else if (date.getHours() < 20 && date.getHours() > 4) time = TIMES.EVENING;
    else time = TIMES.NIGHT;

    return time;
};

// Returns the place or region from a set of features
const getBestFeature = (features) =>
    features.filter(feature => feature.place_type.includes('place') || feature.place_type.includes('region'))[0];

// Returns a promise after geocoding a location and getting the weather data associated with it
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

// Set's the background and the dark/light mode
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

// Renders the daily weather cards
const setDailyWeatherCards = (weatherData, numOfCards) => {
    let cards = weatherData.daily
        .filter((day, idx) => idx <= numOfCards && idx > 0)
        .map((day, idx) => {
            const date = new Date(day.dt * 1000);
            return $(DayCard(date.toDateString(), day.temp.day, {
                    desc: day.weather[0].description,
                    iconCode: day.weather[0].id,
                },
                idx
            ).element);
        });
    const dailyCards = $('#forecast-daily-cards');
    const newDailyCards = dailyCards.clone().html(cards);
    replaceEl(dailyCards, newDailyCards);

    // $('#forecast-daily-cards').fadeTo(500, 0, 'swing', function () {
    //     $(this).html(cards);
    //     $(this).fadeTo(500, 1);
    // });
};
const setCurrentCard = (date) => {
    const currentData = STATE.weatherData.hourly.reduce((accum, curr) => {
        const time = STATE.userSetTime.getTime() / 1000;
        return Math.abs(curr.dt - time) < Math.abs(accum.dt - time) ? curr : accum;
    });
    const fadeOutSpeed = 400;
    const todayCard = $('#today-card');
    const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    const newCard = TodayCard(currentData.temp, STATE.location, time, date.toLocaleDateString('en-US'), {
        label: currentData.weather[0].description,
        icon: WeatherIcon(currentData.weather[0].id)
    }).element;

    replaceEl(todayCard, newCard);
};


const initTimeSlider = () => {
    $('#hourly-ticks').children().each((idx, option) => {
        const hours = new Date();
        hours.setHours(STATE.currTime.getHours() + idx);
        const am = hours.getHours() < 12;
        $(option).attr('label', ((hours.getHours() + 24) % 12 || 12) + (am ? 'AM' : 'PM'));
    });
};

const redraw = () => {
    initTimeSlider();
    setDailyWeatherCards(STATE.weatherData, 7);
    setCurrentCard(STATE.userSetTime);
    setBG(STATE.userSetTime);
};

if (navigator.geolocation) {
    setModal({ title: 'Getting your location...' });
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            reverseGeocode({ lng: pos.coords.longitude, lat: pos.coords.latitude }, MAPBOX_API_KEY)
                .then(place => {
                    MODAL.close();
                    STATE.setLocation(getBestFeature(place.features).place_name);
                });
        },
        (error) => {
            MODAL.close();
            redraw();
        });
} else {
    redraw();
}

$('#time-range').change((e) => {
    const newDate = new Date();
    newDate.setHours(new Date().getHours() + parseInt(e.target.value));
    STATE.setUserSetTime(newDate);
});

$('#search-form').submit((e) => {
    e.preventDefault();
    STATE.setLocation($('#location-search').val());
});


MAP_MARKER.on('dragend', (e) => {
    reverseGeocode(e.target._lngLat, MAPBOX_API_KEY)
        .then(place => {
            STATE.setLocation(getBestFeature(place.features).place_name);
        })
        .catch(error => setModal({ title: 'Cannot find location weather data', type: 'error' }));
});

MAP_GEOCODER.on('result', (e) => {
    STATE.setLocation(e.result.place_name);
});