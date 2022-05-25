import { MAPBOX_API_KEY } from './keys.js';
import { geocode, reverseGeocode } from './mapbox-geocoder-utils.js';

(() => {
    mapboxgl.accessToken = MAPBOX_API_KEY;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-114.46599678089287, 42.64074126204625], // starting position [lng, lat]
        zoom: 10 // starting zoom
    });
    const searchMarker = new mapboxgl.Marker({ color: 'red' }).setLngLat([0, 0]).addTo(map);
    const Popup = (title, body, img) => {
        //language=HTML
        return `
            <div class="popup">
                ${img ? `<img class="popup-img" alt="${title}" src="${img}">` : ''}
                <h1 class="popup-title">${title}</h1>
                <div class="popup-body">
                    <p>${body}</p>
                </div>
            </div>`;
    };

    const MY_FAVORITE_RESTAURANTS = [
        {
            name: 'A Taste Of Thai',
            img: '/img/mapbox/thai.jpg',
            desc: 'The only good thing in Twin Falls, Idaho. Also, there\'s a canyon',
            coords: [-114.46167291591969, 42.5936391499276]
        },
        {
            name: 'Paesanos',
            desc: 'Upscale destination with traditional & contemporary Italian fare, a long wine list & patio dining.',
            coords: [-98.55435370890409, 29.606755699998647]
        },
        {
            name: 'Cappys',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, porro.',
            coords: [-98.46326308609152, 29.473884340231457]
        }
    ];
    MY_FAVORITE_RESTAURANTS.forEach((restaurant) => {
        const resturauntMarker = new mapboxgl.Marker()
            .setLngLat(restaurant.coords)
            .addTo(map);

        const popup = new mapboxgl.Popup()
            //language=HTML
            .setHTML(Popup(restaurant.name, restaurant.desc, restaurant.img));

        resturauntMarker.setPopup(popup);
    });

    const mapSearch = (where) => {
        geocode(where, MAPBOX_API_KEY).then((coords) => {
            console.log(coords);
            map.flyTo({ center: coords });
            searchMarker
                .setLngLat(coords)
                .addTo(map);
        }).catch((e) => alert(e));
    };


    const mapSearchForm = $('#map-search');
    mapSearchForm.submit((e) => {
        e.preventDefault();
        const searchVal = $('#map-search-input').val();
        if (searchVal === '') return alert('Nothing to search');

        mapSearch();
    });
    const zoomSelect = $('#map-zoom-level');
    zoomSelect.change((e) => {
        const zoomTarget = parseInt(e.target.value.replace('x', ''));
        map.zoomTo(zoomTarget);
    });
})();