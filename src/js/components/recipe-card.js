// components/recipe-card.js
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites.js';

export class RecipeCard {
  constructor(recipe, onViewRecipe) {
    this.recipe = recipe;
    this.onViewRecipe = onViewRecipe;
    this.isFav = isFavorite(recipe.id);
    this.element = null; // Store reference to the card element
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'recipe-item';
    
    this.element.innerHTML = `
      <img class="recipe-image" src="${this.recipe.image}" alt="${this.recipe.title}" loading="lazy">
      <div class="recipe-content">
        <h3 class="recipe-title">${this.recipe.title}</h3>
        <div class="recipe-meta">
          <span>⏱ ${this.recipe.readyInMinutes} mins</span>
          <span>👨‍👩‍👧‍👦 ${this.recipe.servings} servings</span>
        </div>
        <div class="recipe-actions">
          <button class="action-button view-button" aria-label="View ${this.recipe.title}">
            View Recipe
          </button>
          <button class="action-button favorite-button ${this.isFav ? 'active' : ''}" 
                  aria-label="${this.isFav ? 'Remove from favorites' : 'Add to favorites'}">
            ${this.isFav ? '❤️ Remove' : '♡ Add'}
          </button>
        </div>
      </div>
    `;

    // Add event listeners
    this.element.querySelector('.view-button').addEventListener('click', () => {
      this.onViewRecipe(this.recipe.id);
    });

    this.element.querySelector('.favorite-button').addEventListener('click', () => {
      this.toggleFavorite();
    });

    return this.element;
  }

  toggleFavorite() {
    if (this.isFav) {
      removeFavorite(this.recipe.id);
    } else {
      addFavorite(this.recipe);
    }
    this.isFav = !this.isFav;
    
    const favButton = this.element.querySelector('.favorite-button');
    favButton.classList.toggle('active');
    favButton.innerHTML = this.isFav ? '❤️ Remove' : '♡ Add';
    favButton.setAttribute('aria-label', this.isFav ? 'Remove from favorites' : 'Add to favorites');
  }
}