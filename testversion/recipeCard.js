// js/recipeCard.js

import { viewRecipe } from './recipeDetail.js';

export function createRecipeCard(recipe) {
  const recipeItem = document.createElement("div");
  recipeItem.className = "recipe-item";

  const recipeTitle = document.createElement("h3");
  recipeTitle.textContent = recipe.title;

  const recipeImage = document.createElement("img");
  recipeImage.src = recipe.image;
  recipeImage.alt = recipe.title;

  const recipeButton = document.createElement("button");
  recipeButton.textContent = "View Recipe";
  recipeButton.addEventListener("click", () => viewRecipe(recipe.id));

  recipeItem.appendChild(recipeImage);
  recipeItem.appendChild(recipeTitle);
  recipeItem.appendChild(recipeButton);

  return recipeItem;
}
