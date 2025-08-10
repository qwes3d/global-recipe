// favorites-page.js
import { getFavorites, removeFavorite } from './utils/favorites.js';
import { RecipeCard } from './components/recipe-card.js';

document.addEventListener("DOMContentLoaded", function () {
  const favoritesList = document.getElementById("favorites-list");
  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesList.innerHTML = "<p>You haven't saved any favorites yet.</p>";
    return;
  }

  favorites.forEach(recipe => {
    const card = new RecipeCard(recipe, () => {
      // Optional: You could implement a detail view here too
      alert(`Showing details for ${recipe.title}`);
    });
    
    // Override the toggleFavorite to just remove from favorites
    card.toggleFavorite = () => {
      removeFavorite(recipe.id);
      card.element.remove();
      if (favoritesList.children.length === 0) {
        favoritesList.innerHTML = "<p>You haven't saved any favorites yet.</p>";
      }
    };
    
    favoritesList.appendChild(card.render());
  });
});