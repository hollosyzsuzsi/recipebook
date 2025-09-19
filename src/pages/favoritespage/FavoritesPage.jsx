import { useState, useEffect } from 'react'

import { RecipeList } from '../../components/RecipeList/RecipeList'
import { EditRecipeModal } from '../../components/EditRecipe/EditRecipeModal'

import { recipeListTypes } from '../../const/recipeListTypes'
import { updateRecipe } from '../../api/recipesService'

import styles from '../favoritespage/FavoritesPage.module.scss'

export const FavoritesPage = () => {
  const [editingRecipe, setEditingRecipe] = useState(null)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const openEditModal = (recipe) => {
    setIsEditModalOpen(true)
    setEditingRecipe(recipe)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingRecipe(null)
  }

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isEditModalOpen])

  const handleEditRecipe = async (editedData) => {
    const updatedIngredients = editedData.ingredients?.map((ing) => ({
      ...ing,
      ingredientId: Number(ing.ingredientId),
      amount: ing.amount ? Number(ing.amount) : undefined,
    }))

    const completeData = {
      ...editingRecipe,
      ...editedData,
      ingredients: updatedIngredients || editingRecipe.ingredients,
    }

    try {
      await updateRecipe(completeData)

      setIsEditModalOpen(false)
      setEditingRecipe(null)

      window.location.reload(true)
    } catch (err) {
      alert('Failed to edit recipe')
    }
  }

  return (
    <>
      <div className={styles.favoritesPageWrapper}>
        <div className={styles.favoritesPageHeader}>
          <h1 className={styles.favoritesTitle}>Favorite recipes</h1>
        </div>
        <RecipeList onEdit={openEditModal} listType={recipeListTypes.favoriteRecipes} />
      </div>
      {isEditModalOpen && (
        <EditRecipeModal
          onSubmit={handleEditRecipe}
          onClose={closeEditModal}
          initialValues={editingRecipe}
          isOpen={isEditModalOpen}
        />
      )}
    </>
  )
}
