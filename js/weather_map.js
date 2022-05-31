'use strict';


const OPEN_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/3.0/onecall';
let variables = {
    location: 'San Antonio, TX',
    currTime: new Date(),
    userSetTime: new Date(),
    units: 'imperial'
};


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        reverseGeocode({ lng: pos.coords.longitude, lat: pos.coords.latitude }, MAPBOX_API_KEY).then(place => {
            variables.location = place.features[2].place_name.split(',')[0];
        });
    });
}

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
    else return 'night';

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


const setGradient = (date) => {
    const bgGradients = $('#bg [id*="gradient"]');
    const dawnGradient = $('#dawn-gradient');
    const dayGradient = $('#day-gradient');
    const duskGradient = $('#dusk-gradient');
    const nightGradient = $('#night-gradient');
    let currGradient;

    switch (getTimeOfDay(date)) {
        case TIMES.MORNING:
            currGradient = dawnGradient;
            setDarkMode(false);
            break;
        case TIMES.AFTERNOON:
            currGradient = dawnGradient;
            setDarkMode(false);
            break;
        case TIMES.EVENING:
            currGradient = duskGradient;
            setDarkMode(true);
            break;
        case TIMES.NIGHT:
            currGradient = nightGradient;
            setDarkMode(true);
            break;
    }

    currGradient.animate({ opacity: 1 }, 500);
    bgGradients.not(currGradient).animate({ opacity: 0 }, 500);

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
    let welcomeMsg = 'Good ' + getTimeOfDay(date);

    todayCard.find('.time').html(time);
    todayCard.find('.day').html(date.toLocaleDateString('en-US'));
    todayCard.find('.temp').html(weatherData.temp);
    todayCard.find('.welcome').html(welcomeMsg);
    todayCard.find('.desc').html(weatherData.weather[0].description);
    todayCard.find('.location').html(variables.location);
    
    todayCard.find('.desc-icon').html('<img src="http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png">');
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
            console.log(weatherData.hourly);
            console.log(weatherData);
            console.log(currentData);
            initTimeSlider();
            setDailyWeatherCards(weatherData);
            setCurrentCard(currentData, variables.userSetTime);
            setGradient(variables.userSetTime);
        });

};


renderData();


$('#time-range').change((e) => {
    variables.userSetTime = new Date();
    variables.userSetTime.setHours(new Date().getHours() + parseInt(e.target.value));
    renderData();
});

