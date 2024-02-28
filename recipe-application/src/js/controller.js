import 'core-js/stable';  //polyfill all except async/await
import 'regenerator-runtime/runtime'; // polyfill async/await

import * as model from './model.js'; 
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

// helper function for timeout
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


// load static recipe and print to console
const controlRecipes = async function () {
  try {
    // get hash
    const id = window.location.hash.slice(1); 
    if (!id) return; 

    // loading icon
    recipeView.renderSpinner();

    await model.loadRecipe(id); 

    // render recipe
    recipeView.render(model.state.recipe); 

  } catch (err) {
    console.error(err);
  }
};

// switch between recipes
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes))
