// MODEL
// exports application state
// -- handles current recipe, bookmarks and search functionality
// -- exports load recipe

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    // load static recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    
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
    console.error(err);
  }
};
