import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

// não retorna nada, mas muda objeto state acima
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // temp
    console.error(`${err}`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query; // pesquisa pizza -> guarda no state

    const data = await getJSON(`${API_URL}?search=${query}`); // lista de receitas + pesquisa de pizza
    console.log(data);

    // lista de receitas -> retorna novos objetos -> guarda no state
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = page.search.page) {
  state.search.page = page;
  
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const en = page * state.search.resultsPerPage; // 9

  // retorna 10 resultados
  return state.search.results.slice(0, 9)
}