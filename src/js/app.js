// app.js
import { searchRecipes, getRecipeDetails } from './components/spoonacular.js';
import { RecipeCard } from './components/recipe-card.js';
import { RecipeDetail } from './components/recipe-detail.js';
import { RecipeSearch } from './components/recipe-search.js';
import { Slideshow } from './components/slideshow.js';

document.addEventListener("DOMContentLoaded", function () {
  // Initialize slideshow
  new Slideshow();

  const recipeDetail = new RecipeDetail();
  const resultsContainer = document.getElementById("results");

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