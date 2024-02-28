import 'core-js/stable'; //polyfill all except async/await
import 'regenerator-runtime/runtime'; // polyfill async/await

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

const recipeContainer = document.querySelector('.recipe');

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
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults); 
};

const controlSearchResults = async function () {
  try {
    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResult(query);

    // render results
    console.log(model.state.search.results); 
  } catch (err) {
    console.log(err);
  }
};

init();
controlSearchResults();