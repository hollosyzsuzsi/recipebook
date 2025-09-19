import { api } from './api'

export const getAllRecipes = () => api.get('/recipes')

export const getRecipeById = (id) => api.get(`/recipes/${id}`)

export const getRecipesOfTheDay = () => api.get('/recipes?isRecipeOfDay=true')

export const getFavoriteRecipes = () => api.get('/recipes?isFavorite=true')

export const addRecipe = (recipe) => api.post('/recipes', recipe)

export const updateRecipe = (id, updatedData) => api.put(`/recipes/${id}`, updatedData)

export const patchRecipe = (id, updatedData) => api.patch(`/recipes/${id}`, updatedData)

export const deleteRecipe = (id) => api.delete(`/recipes/${id}`)

export const toggleFavorite = async (id, currentState) => api.patch(`/recipes/${id}`, { isFavorite: !currentState })

export const getAllIngredients = () => api.get('/ingredients')
