import { geocode, reverseGeocode } from './mapbox-geocoder-utils.js';
import { MAPBOX_API_KEY } from './keys.js';

(() => {
    // ############################## MAPBOX INIT ############################## //
    mapboxgl.accessToken = MAPBOX_API_KEY;
    const MAP = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
        center: [-114.46599678089287, 42.64074126204625], // starting position [lng, lat]
        zoom: 10 // starting zoom
    });

    const searchMarkerPopup = new mapboxgl.Popup();
    const customMarker = $('#marker').get();
    const searchMarker = new mapboxgl.Marker({
        color: 'red',
        draggable: true
    }).setLngLat([0, 0]).setPopup(searchMarkerPopup).addTo(MAP);

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

    // Interaction elements
    const mapSearchForm = $('#map-search');
    const zoomSelect = $('#map-zoom-level');
    const coordinates = $('#map-options .coordinates');
    const searchVal = $('#map-search-input');

    // Function to change the current coordinates of the pin + zooming the map to those coordinates
    const setCoordinates = (coords) => {
        if (MODAL) MODAL.close();
        MAP.flyTo({ center: coords });
        searchMarker
            .setLngLat(coords);
        reverseGeocode({ lng: coords[0], lat: coords[1] }, MAPBOX_API_KEY).then((data) => {
            searchMarkerPopup.setHTML(Popup(data, ''));
            coordinates.html(data);
        });
    };
    setCoordinates([-98.489765, 29.426742]);

    // When user stops dragging the marker, it goes sets the coordinates
    searchMarker.on('dragend', (e) => {
        setCoordinates([e.target._lngLat.lng, e.target._lngLat.lat]);
    });
    // Set the zoom to 8 after the map coordinates change
    MAP.on('flyend', () => MAP.zoomTo(8, { duration: 1000 }));

    // Reset zoom value when user zooms with mouse/touchpad
    MAP.on('wheel', () => zoomSelect.val('...'));

    /* Define an array of objects with my favorite restaurants...
    then loop through them and add a pin and a popup */
    const MY_FAVORITE_RESTAURANTS = [
        {
            name: 'A Taste Of Thai',
            img: '/img/mapbox/thai.jpg',
            desc: 'The only good thing in Twin Falls, Idaho. Also, there\'s a canyon',
            coords: [-114.46167291591969, 42.5936391499276]
        },
        {
            name: 'Paesanos',
            img: '/img/mapbox/paesanos.jpeg',
            desc: 'Upscale destination with traditional & contemporary Italian fare, a long wine list & patio dining.',
            coords: [-98.55435370890409, 29.606755699998647]
        },
        {
            name: 'Cappys',
            desc: 'New American-Eclectic fine dining fare presented in an upscale casual space with warm wood tones.',
            coords: [-98.46326308609152, 29.473884340231457]
        },
        {
            name: 'Some place in Japan',
            desc: 'Can\'t remember the name, but it was pretty good.',
            coords: [138.2529, 36.2048]
        }

    ];
    MY_FAVORITE_RESTAURANTS.forEach((restaurant) => {
        const restaurantMarkerEl = $('<i class="fa-solid fa-utensils restaurant-marker"></i>').clone().get()[0];
        const restaurantMarker = new mapboxgl.Marker({
            element: restaurantMarkerEl
        })
            .setLngLat(restaurant.coords)
            .addTo(MAP);

        const popup = new mapboxgl.Popup()
            //language=HTML
            .setHTML(Popup(restaurant.name, restaurant.desc, restaurant.img));

        restaurantMarker.setPopup(popup);
    });

    // Function that gets called when a user uses searchbar
    const mapSearch = (where) => {
        geocode(where, MAPBOX_API_KEY).then((coords) => {
            setCoordinates(coords);
        });
    };


    mapSearchForm.submit((e) => {
        e.preventDefault();
        const val = searchVal.val();
        if (val === '') return setModal({ title: 'Nothing to search', type: 'error' });
        mapSearch(val);

    });
    zoomSelect.change((e) => {
        const zoomTarget = parseInt(e.target.value);
        MAP.zoomTo(zoomTarget);
    });
})();