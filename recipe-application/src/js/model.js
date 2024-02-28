// MODEL
// exports application state
// -- handles current recipe, bookmarks and search functionality
// -- exports load recipe

import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        results:[],
    },
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

    } catch (err) {
        throw err; 
    }
    
}

