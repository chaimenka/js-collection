import icons from 'url:../img/icons.svg'; // Parcel 2
import 'core-js/stable';  //polyfill all except async/await
import 'regenerator-runtime/runtime'; // polyfill async/await

const recipeContainer = document.querySelector('.recipe');

// helper function for timeout
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// helper function to load images
const renderSpinner = function (parentEl) {
  const markup = `        
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

// load static recipe and print to console
const loadAndRenderRecipe = async function () {
  try {
    // get hash
    const id = window.location.hash.slice(1); 
    if (!id) return; 

    // loading icon
    renderSpinner(recipeContainer);

    // load static recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // refactor data
    let { recipe } = data;
    recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
    };

    // render recipe
    const html = `<figure class="recipe__fig">
          <img src=${recipe.image} alt=${recipe.title} class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">xx</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">xx</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map(ing => {
                return ` 
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="src/img/icons.svg#icon-check"></use>
                  </svg>
                  <div class="recipe__description">${ing}</div>
                </li>`;
              })
              .join('')}
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">0.5</div>
              <div class="recipe__description">
                <span class="recipe__unit">cup</span>
                ricotta cheese
              </div>
            </li>
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;

    // empty container
    recipeContainer.innerHTML = '';

    // insert recipe
    recipeContainer.insertAdjacentHTML('afterbegin', html);
    console.log(recipe);
  } catch (err) {
    console.error(err);
  }
};

// switch between recipes
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, loadAndRenderRecipe))
