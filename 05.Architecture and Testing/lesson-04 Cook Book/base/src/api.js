import * as request from './requester.js';

const baseUrl = `http://localhost:3030`;
const recipesUrl = `${baseUrl}/data/recipes`;
const loginUrl = `${baseUrl}/users/login`;

// Getting recipes with fetch !
export const getRecipes = () => request.get(recipesUrl);

// Creating recipes with fetch!
export const createRecipe = (recipeData) => {
  return request.post(recipesUrl, recipeData);
};
// Login fetch !
export const loginFetch = (email, password) =>
  request.post(loginUrl, { email, password });
