import { MAPBOX_API_KEY } from '../keys.js';

mapboxgl.accessToken = MAPBOX_API_KEY;
let lightMode = false;
export const MAP = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-114.46599678089287, 42.64074126204625], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

export const MAP_MARKER = new mapboxgl.Marker({
    draggable: true
})
    .setLngLat([0, 0])
    .addTo(MAP);

export const MAP_GEOCODER = new MapboxGeocoder({
    accessToken: MAPBOX_API_KEY,
    marker: false,
    mapboxgl: mapboxgl
});


document.getElementById('geocoder').appendChild(MAP_GEOCODER.onAdd(MAP));
const mapContainer = $('#map-container');
// mapContainer.find('*').attr('tabIndex', '-1');
$('#open-map').click(function () {
    mapContainer.toggleClass('show');
    // Remove focus from the button
    $(this).blur();
});
$('#map-container .exit').click(() => {
    mapContainer.removeClass('show');
});

// const MAP_GEOCODER = new mapboxgl.GeoC;