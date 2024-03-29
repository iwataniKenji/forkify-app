import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return; // guard clause
    recipeView.renderSpinner();

    // 1 - update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 2 - loading recipe
    await model.loadRecipe(id);

    // 3 - rendering recipe
    recipeView.render(model.state.recipe);

    // 4 - updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1 - get search query
    const query = searchView.getQuery();
    if (!query) return; // ignore if there is no word on search bar

    // 2 - render initial pagination buttons
    paginationView.render(model.state.search);

    // 3 - load search results
    await model.loadSearchResults(query);

    // 4 - render results
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1 - render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2 - render new pagination buttons
  paginationView.render(model.state.search);
};

// when user clicks on "increase or decrease portion" button
const controlServings = function (newServings) {
  // update the recipe servings (in the state)
  model.updateServings(newServings);

  // update the recipe view
  recipeView.update(model.state.recipe);
};

// when user clicks on bookmark button
const controlAddBookmark = function () {
  // 1 - add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2 - update recipe view
  recipeView.update(model.state.recipe);

  // 3 - render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    addRecipeView.renderSpinner();

    // upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change id in url
    window.history.pushState(null, '', `${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
