import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable'
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return; // guard clause se não houver #???
    recipeView.renderSpinner();

    // 1 - loading recipe
    await model.loadRecipe(id);

    // 2 - rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1 - get search query
    const query = searchView.getQuery();
    if (!query) return; // se não hover palavra na barra de pesquisa -> ignore

    // 2 - load search results
    await model.loadSearchResults(query); // não retorna nada; apenas muda state

    // 3 - render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
