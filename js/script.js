// variable to store fetched data
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


// empty array to store cities in
const cities = [];

// function to fetch the json data, read it as json data and then assign to the empty array cities
fetch(endpoint)
    // then is a tag along, es6 function to return blob parsed as json data
    .then(blob => blob.json())
    // then return the data to the cities array by spreading the data
    .then(data => cities.push(...data));

// function to find matching cities/state depending on search using the objects data in the cities array
function findMatches (wordToMatch, cities) {

    return cities.filter(place => {
        // we need to figure out if city/state matches what was typed
        // create a variable to store the criteria for the search - g- global - i-insensitive (lowercase or upper)
        const regex = new RegExp(wordToMatch, "gi");
        // return the state/city if it matches the input for regex
        return place.city.match(regex) || place.state.match(regex)
    
    })
}

// function that displays the population numbers with commas
function numWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// display function on page
function displayMatches () {
    // array to store the value searched versus the cities array
    const matchArray = findMatches(this.value, cities);
    // variable to store the function of adding the datat to html
    const html = matchArray.map(place => {
        // variable which stores the expression
        const regex = new RegExp(this.value, "gi");
        // for the city/state to replace the regex value with a highlighted class of html
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        // if the input matches anything in the array then display this list item and text with this class
        return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        
        <span class="population">pop: ${numWithCommas(place.population)}<span>
        </li>
        `
        // // numwithcommas function called to place.population to display numbers with commas
        // then join the data together
    }).join('');
    // add the html to the suggestion element
    suggestions.innerHTML = html;
}

// variable to store the search bar
const searchInput = document.querySelector('.search');
// variable to store suggestions based on search
 const suggestions = document.querySelector('.suggestions');
// event listener for search input
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);