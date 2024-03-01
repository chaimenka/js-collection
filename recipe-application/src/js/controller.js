import 'core-js/stable'; //polyfill all except async/await
import 'regenerator-runtime/runtime'; // polyfill async/await

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

// // parcel hot reloading
// if (model.hot) {
//   model.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');

// load static recipe and print to console
const controlRecipes = async function () {
  try {
    // get hash
    const id = window.location.hash.slice(1);
    if (!id) return;

    // loading icon
    recipeView.renderSpinner();

    // mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // update bookmarks
    bookmarksView.update(model.state.bookmarks); 
    
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
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addHandlerRender(controlRenderBookmark);
  console.log('*** initialized controller'); 
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResult(query);

    // render results
    resultsView.render(model.getSearchResultsPage());
    
    // render pagination buttons
    paginationView.render(model.state.search);
    
    // update bookmarks view
    bookmarksView.update(model.state.bookmarks); 

    console.log('*** controlled search results')
  } catch (err) {
    console.error(err); 
  }
};

const controlPagination = function (goToPage) {
  // render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render new pagination buttons
  paginationView.render(model.state.search);

  console.log('*** finished controll pagination'); 
};

const controlRenderBookmark = function () {
  bookmarksView.render(model.state.bookmarks); 
}

const controlAddBookmark = function () {

  // add or remove bookmark
  if (!model.state.recipe.bookmarked)
    model.addBookmark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks); 
  console.log('*** finished controll bookmark'); 
};

init();
