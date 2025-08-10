// js/recipeDetail.js

const apikey = "3e90eb7a08a04594a460ff4464e3cf06";

export async function viewRecipe(recipeId) {
  const recipeDetail = document.getElementById("recipe-detail");
  const recipeContentDiv = document.getElementById("recipe-content");

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apikey}`
    );
    const recipeData = await response.json();

    recipeContentDiv.innerHTML = `
      <h2>${recipeData.title}</h2>
      <img src="${recipeData.image}" alt="${recipeData.title}">
      <p><strong>Ingredients:</strong> ${recipeData.extendedIngredients
        .map((ingredient) => ingredient.original)
        .join(", ")}</p>
      <p><strong>Instructions:</strong> ${recipeData.instructions || "No instructions available."}</p>
    `;

    recipeDetail.style.display = "flex";
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}

export function closeRecipeDetails() {
  const recipeDetailDiv = document.getElementById("recipe-detail");
  recipeDetailDiv.style.display = "none";
}
