import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // for polyfilling (others)
import 'regenerator-runtime/runtime'; // for polyfilling (async-await)

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // pega hash da url inteira

    if (!id) return; // guard clause se não houver #???
    recipeView.renderSpinner();

    // 1 - loading recipe
    await model.loadRecipe(id); // async -> retorna promise

    // 2 - rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes)); // vários eventos para o mesmo handler
