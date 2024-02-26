'use-strict';

// DOM elements
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const apiKey = 'DM8B8x4DaDieSgu5ATsafN8fHAl3iTfG';

// fetch and handle error
const getJSON = function (url, errorMsg = '') {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`request failed with message: ${errorMsg}`);
    return response.json();
  });
};

const renderCountry = function (data, className = '') {
  console.log(data); 
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${Object.values(data.flags)[0]}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
        </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const whereAmI = function (lat, lng) {
  const url = `https://api.geocodify.com/v2/reverse?api_key=${apiKey}&lat=${lat}&lng=${lng}`;
  const errorMsg = 'reverse geocoding request failed';

  // ajax call
  getJSON(url, errorMsg)
    .then(data => {
      if (data.response.features.length === 0)
        throw new Error('no features found');
      const country = data.response.features[0].properties.country;
      return getJSON(`https://restcountries.com/v3.1/name/${country}`, 'country request failed')
    })
    .then(data => {
      renderCountry([data][0][0]); 
    })
    .catch(err => {
      console.error(`*** ${err} ***`);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => whereAmI(51.50354, -0.12768));
