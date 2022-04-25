(function () {
    'use strict';
    let planetsString = 'Mercury|Venus|Earth|Mars|Jupiter|Saturn|Uranus|Neptune';
    let planetsArray;

    // ############################################################ //

    planetsArray = planetsString.split('|');
    console.log(planetsArray);

    // ############################################################ //

    let htmlString = planetsArray.join('<br/>');
    console.log(htmlString);

    // ############################################################ //

    // Foreach method
    let listElements = '';
    planetsArray.forEach(planet => listElements += '<li>' + planet + '</li>');
    let unorderedList = '<ul>' + listElements + '</ul>';
    console.log(unorderedList);


    document.body.innerHTML += unorderedList;


})();
