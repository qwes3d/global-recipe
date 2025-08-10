// utils/favorites.js
const FAVORITES_KEY = 'recipeFavorites';

export function getFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(recipe) {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === recipe.id)) {
    favorites.push(recipe);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(recipeId) {
  let favorites = getFavorites();
  favorites = favorites.filter(fav => fav.id !== recipeId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(recipeId) {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === recipeId);
}