// components/recipe-detail.js
export class RecipeDetail {
  constructor() {
    // Create modal element
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.setAttribute('aria-hidden', 'true');
    
    // Modal content structure
    this.modal.innerHTML = `
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button class="modal-close" aria-label="Close recipe details">&times;</button>
        <div class="recipe-modal-content"></div>
      </div>
    `;
    
    // Append to body
    document.body.appendChild(this.modal);
    
    // Cache DOM elements
    this.contentDiv = this.modal.querySelector('.recipe-modal-content');
    this.closeButton = this.modal.querySelector('.modal-close');
    
    // Event listeners
    this.closeButton.addEventListener('click', () => this.hide());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.hide();
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hide();
    });
    
    // Hide by default
    this.hide();
  }

  show(recipeData) {
    // Populate modal content
    this.contentDiv.innerHTML = `
      <img class="modal-image" src="${recipeData.image}" alt="${recipeData.title}" loading="lazy">
      <h2 class="modal-title" id="modal-title">${recipeData.title}</h2>
      <div class="modal-meta">
        <span class="time-meta">⏱ ${recipeData.readyInMinutes} mins</span>
        <span class="servings-meta">👨‍👩‍👧‍👦 Serves ${recipeData.servings}</span>
      </div>
      <div class="modal-section">
        <h3>Ingredients</h3>
        <ul class="ingredients-list">
          ${recipeData.extendedIngredients.map(ing => 
            `<li>${ing.original}</li>`
          ).join('')}
        </ul>
      </div>
      <div class="modal-section">
        <h3>Instructions</h3>
        <div class="instructions">${recipeData.instructions || 'No instructions provided'}</div>
      </div>
    `;
    
    // Show modal
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus on close button for better keyboard navigation
    this.closeButton.focus();
  }

  hide() {
    // Hide modal
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }
}