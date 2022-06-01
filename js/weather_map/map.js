mapboxgl.accessToken = MAPBOX_API_KEY;
let lightMode = false;
const MAP = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
    center: [-114.46599678089287, 42.64074126204625], // starting position [lng, lat]
    zoom: 10 // starting zoom
});

const MAP_MARKER = new mapboxgl.Marker({
    draggable: true
})
    .setLngLat([0, 0])
    .addTo(MAP);

const MAP_GEOCODER = new MapboxGeocoder({
    accessToken: MAPBOX_API_KEY,
    marker: false,
    mapboxgl: mapboxgl
});


document.getElementById('geocoder').appendChild(MAP_GEOCODER.onAdd(MAP));
const mapContainer = $('#map-container');
$('#open-map').click(() => {
    mapContainer.toggleClass('show');

});
$('#map-container .exit').click(() => {
    mapContainer.removeClass('show');
});
$('').click((e) => {
    console.log('hi');
    if (mapContainer.hasClass('show')) mapContainer.removeClass('show');
});

// const MAP_GEOCODER = new mapboxgl.GeoC;