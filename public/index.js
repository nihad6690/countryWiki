
const input = document.querySelector('.countryForm');
const countryName = document.getElementById('inputItem')
const container = document.querySelector('.allText-container');
let allMarkers = new Array();
let map = L.map('map').setView([0, 0], 2);




// when a country is entered by the user the client sends the information to the server
// the server then finds the information through the API and returns the given information about the given country

input.addEventListener('submit', (e) => {

    document.querySelector('.countryTitle').innerHTML = "";
    document.querySelector('.flag').innerHTML = "";
    document.querySelector('.coatArms').innerHTML = "";
    document.querySelector('.capitalText').innerHTML = "";
    document.querySelector('.continentText').innerHTML = "";
    document.querySelector('.languagesText').innerHTML = "";
    document.querySelector('.currencyNameText').innerHTML = "";
    document.querySelector('.borders').innerHTML = ""
    document.querySelector('.populationText').innerHTML = ""
    e.preventDefault();
    country = countryName.value;


    if (country.value === '') {
        return;
    }
    const data = {
        countryName: country
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // the country name is stored in the body and sent to the server through fetch
        body: JSON.stringify(data)
    }
    fetch('http://localhost:4000/countries', options).then(res => res.json()).then(data => executor(data))


})

const executor = (data) => {
    console.log(data);
    if (data.status === 404) {
        console.log("Enter the correct country name")
    } else {
        container.classList.add("show-container")
        const name = data['0'].name.common
        const flag = data['0'].flags.png;
        const coatArms = data['0'].coatOfArms.png;
        const capital = data['0'].capital['0'];
        const currencies = data['0'].currencies;
        const continent = data['0'].continents['0'];
        const language = data['0'].languages;
        const lat = data['0'].capitalInfo.latlng['0'];
        const long = data['0'].capitalInfo.latlng['1'];
        const borders = data['0'].borders;
        const population = data['0'].population;
        displayName(name)
        displayImages(flag, coatArms);
        displayOtherInfo(population, capital, currencies, continent, language);
        displayMap([lat, long]);
        callBorders(borders);


    }

}

const RemoveChild = (id, parent) => {
    if ($(id).children().length > 0) {
        parent.removeChild(parent.firstChild)

    }
}

const displayName = (country) => {
    const name = document.querySelector('.countryTitle')
    const countryText = document.createElement("div")
    countryText.textContent = country;
    name.appendChild(countryText)

}
const displayImages = (flagUrl, coatArmsUrl) => {
    let image = document.createElement("img");
    image.src = flagUrl;
    image.alt = 'flag could not be loaded'
    image.style.border = "6px solid rgb(0, 0, 0)";
    const flag = document.querySelector('.flag');
    flag.appendChild(image);


    let newImage = document.createElement("img");
    newImage.src = coatArmsUrl;
    newImage.alt = 'Coat of Arms could not be loaded'
    newImage.style.border = "6px solid rgb(0, 0, 0)";
    newImage.width = 500;
    newImage.height = 500;
    const coatArms = document.querySelector('.coatArms');
    coatArms.appendChild(newImage);


}
const displayOtherInfo = (populationNum, capitalName, currencies, continentName, languages) => {
    const population = document.querySelector('.populationText')
    const populationText = document.createElement("div")
    populationText.textContent = populationNum;
    populationText.style.display = "inline"
    population.appendChild(populationText);

    const capital = document.querySelector('.capitalText')
    const capitalText = document.createElement("div")
    capitalText.style.display = "inline"
    capitalText.textContent = capitalName;
    capital.appendChild(capitalText);



    const continent = document.querySelector('.continentText')
    const continentText = document.createElement("div")
    continentText.style.display = "inline"
    continentText.textContent = continentName;
    continent.appendChild(continentText);

    let languagesValue = Object.values(languages);
    let allLanguagesText = languagesValue.join(', ')
    const allLanguages = document.querySelector('.languagesText')
    const lanText = document.createElement("div")
    lanText.style.display = "inline"
    lanText.textContent = allLanguagesText;
    allLanguages.appendChild(lanText);

    let currenciesValueValue = Object.values(currencies);
    let currenciesValue = Object.values(currenciesValueValue['0']);

    const currency = document.querySelector('.currencyNameText');
    const currencyText = document.createElement("div");
    currencyText.style.display = "inline"
    currencyText.textContent = String(`${currenciesValue[1]} ${currenciesValue[0]}`);

    currency.appendChild(currencyText);


}

const displayMap = (latLong) => {

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    if (allMarkers.length > 0) {
        map.removeLayer(allMarkers[0]);
        allMarkers.pop()
    }
    let marker = new L.marker(latLong).addTo(map)
    allMarkers.push(marker)
    map.addLayer(allMarkers[0])
    map.setView(latLong, 4);
}

const callBorders = (borders) => {
    for (i = 0; i < borders.length; i++) {
        const data = {
            borderName: borders[i]
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            // the country name is stored in the body and sent to the server through fetch
            body: JSON.stringify(data)
        }
        fetch('http://localhost:4000/borders', options).then(res => res.json()).then(data => displayBorders(data['0'].flags.png))
    }


}

const displayBorders = (url) => {
    let image = document.createElement("img");
    image.src = url;
    image.style.margin = "2% 2% 2% 2%"
    image.alt = 'border map could not be loaded'
    image.style.border = "6px solid rgb(0, 0, 0)";
    const flag = document.querySelector('.borders');
    flag.appendChild(image);


}



