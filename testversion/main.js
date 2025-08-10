// js/main.js

import { searchRecipes } from './recipeSearch.js';
import { closeRecipeDetails } from './recipeDetail.js';

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchBtn").addEventListener("click", searchRecipes);
  document.getElementById("closeRecipeDetail").addEventListener("click", closeRecipeDetails);

  // Hide the recipe detail on load
  document.getElementById("recipe-detail").style.display = "none";
});
