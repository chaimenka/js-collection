// MODEL
// exports application state
// -- handles current recipe, bookmarks and search functionality
// -- exports load recipe

import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
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
    // temp error handling
    console.error(err);
  }
};
