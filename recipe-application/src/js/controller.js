const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const showRecipe = async function () {
  try {
    const res = await fetch(
      //'https://forkify-api.herokuapp.com/api/get?rId=47746'
      'https://forkify-api.herokuapp.com/api/get?rId=46956'
    );
    const data = await res.json(); 
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    
    console.log(data); 

    // refactor data
    let { recipe } = data; 
    recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
    } 

    console.log(recipe); 

  } catch (err) {
    console.error(err); 
  }
}

showRecipe(); 
console.log('hello js'); 