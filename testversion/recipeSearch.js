// js/recipeSearch.js

import { createRecipeCard } from './recipeCard.js';

const apikey = "3e90eb7a08a04594a460ff4464e3cf06";

export async function searchRecipes() {
  const searchQuery = document.getElementById("Query").value;
  const recipelist = document.getElementById("results");
  recipelist.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&query=${searchQuery}&number=20`
    );
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      recipelist.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    data.results.forEach((recipe) => {
      const recipeCard = createRecipeCard(recipe);
      recipelist.appendChild(recipeCard);
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}
