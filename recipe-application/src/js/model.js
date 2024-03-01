// MODEL
// exports application state
// -- handles current recipe, bookmarks and search functionality
// -- exports load recipe

import { API_URL } from "./config";
import { getJSON } from "./helpers";
import { RES_PER_PAGE } from "./config"; 

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks:[],
};

export const loadRecipe = async function (id) {
  try {
    // load static recipe
    const data = await getJSON(`${API_URL}get?rId=${id}`);

    // refactor data
    let { recipe } = data;
    state.recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      };

      if (state.bookmarks.some(b => b.id === id))
          state.recipe.bookmarked = true;
      else state.recipe.bookmarked = false; 
      
  } catch (err) {
      throw err; 
  }
};

export const loadSearchResult = async function (query) {
    try {
        const data = await getJSON(`${API_URL}search?q=${query}`); 
        state.search.results = data.recipes.map(rec => {
            return {
                id: rec.recipe_id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        }); 
        state.search.page = 1; 
        console.log(
          `*** found ${state.search.results.length} results (${API_URL}search?q=${query})`
        );
    } catch (err) {
        throw err; 
    }
    
}



export const getSearchResultsPage = function (page = state.search.page) {
    const start = (page - 1) * state.search.resultsPerPage; 
    const end = page * state.search.resultsPerPage; 
    state.search.page = page; 
    
    const results = state.search.results.slice(start, end);
    console.log(`*** found ${results.length} entries for page ${page}`); 
    return results; 
}

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};


export const addBookmark = function (recipe) {
    // add bookmark
    state.bookmarks.push(recipe); 

    // mark current recipe as bookmark
    if (recipe.id === state.recipe.id)
        state.recipe.bookmarked = true; 

    persistBookmarks(); 
    console.log(`*** added bookmark with id ${recipe.id}`); 
}

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // mark current recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmarks(); 

    console.log(`*** removed bookmark with id ${id}`); 
}

const init = function () {
    const storage = localStorage.getItem('bookmarks'); 
    if (storage) state.bookmarks = JSON.parse(storage); 
    console.log('*** initialized model')
}

// debugger function
const clearBookmarks = function(){
    localStorage.clear('bookmarks');
}

init(); 
