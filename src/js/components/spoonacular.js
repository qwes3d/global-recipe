// api/spoonacular.js
const API_KEY = "3e90eb7a08a04594a460ff4464e3cf06";

export async function searchRecipes(query) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=20`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { results: [] };
  }
}

export async function getRecipeDetails(recipeId) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
}