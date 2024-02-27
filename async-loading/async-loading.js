'use-strict';


// DOM elements
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

let img = document.createElement('img');
const imgContainer = document.querySelector('.images'); 

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    
    //set source attribute
    img.src = imgPath;

    // resolve promise if image is loaded, reject otherwise
    img.addEventListener('load', resolve(img)); 
    img.addEventListener('error', reject(new Error('promise reject-ception'))); 
  },
    // error handling
    err => new Error('could not load image')
  )
}

createImage('img\\img-1.jpg')
  // add image to dom 
  .then(img => imgContainer.append(img))
  .then(() => wait(2))
  .then(() => {
    img.style.display = 'none'; 
    return createImage('img\\img-2.jpg');
  })
  // display error
  .catch(err=> console.error(err))
  .finally(); 
  