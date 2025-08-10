// app.js
import { searchRecipes, getRecipeDetails } from './components/spoonacular.js';
import { RecipeCard } from './components/recipe-card.js';
import { RecipeDetail } from './components/recipe-detail.js';
import { RecipeSearch } from './components/recipe-search.js';

document.addEventListener("DOMContentLoaded", function () {
  const recipeDetail = new RecipeDetail();
  const resultsContainer = document.getElementById("results");

  // Add link to favorites page
  const header = document.createElement('header');
  header.innerHTML = `
    <h1>Recipe Finder</h1>
    <a href="favorites.html">My Favorites</a>
  `;
  document.body.insertBefore(header, document.body.firstChild);

  // Initialize search functionality
  new RecipeSearch(async (query) => {
    const data = await searchRecipes(query);
    resultsContainer.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      resultsContainer.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    data.results.forEach(recipe => {
      const card = new RecipeCard(recipe, (id) => {
        getRecipeDetails(id).then(details => {
          if (details) recipeDetail.show(details);
        });
      });
      resultsContainer.appendChild(card.render());
    });
  });
});