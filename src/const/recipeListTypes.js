import { getAllRecipes, getFavoriteRecipes, getRecipesOfTheDay } from '../api/recipesService'

export const recipeListTypes = {
  allRecipes: {
    fetchFunction: getAllRecipes,
    title: 'Explore Recipes',
  },
  dailyRecipes: {
    fetchFunction: getRecipesOfTheDay,
    title: 'Recipe of the day',
  },
  favoriteRecipes: {
    fetchFunction: getFavoriteRecipes,
    title: 'Favorite Recipes',
  },
}
