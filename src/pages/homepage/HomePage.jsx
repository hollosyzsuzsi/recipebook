import { useState, useEffect } from 'react'

import { RecipeList } from '../../components/RecipeList/RecipeList'
import { AddRecipeModal } from '../../components/AddRecipe/AddRecipeModal'
import { EditRecipeModal } from '../../components/EditRecipe/EditRecipeModal'

import { addRecipe, updateRecipe } from '../../api/recipesService'
import { recipeListTypes } from '../../const/recipeListTypes'

import styles from '../homepage/HomePage.module.scss'

export const HomePage = () => {
  const [editingRecipe, setEditingRecipe] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const openEditModal = (recipe) => {
    setIsEditModalOpen(true)
    setEditingRecipe(recipe)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingRecipe(null)
  }

  const closeAddRecipeModal = () => {
    setIsAddModalOpen(false)
  }

  const isAnyModalOpen = isAddModalOpen || isEditModalOpen

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isAnyModalOpen])

  const handleAddRecipe = async (newRecipe) => {
    try {
      await addRecipe(newRecipe)

      setIsAddModalOpen(false)
      window.location.reload(true)
    } catch (err) {
      alert('Failed to add recipe')
    }
  }

  const handleUpdateRecipe = async (id, newRecipe) => {
    try {
      await updateRecipe(id, newRecipe)

      setIsEditModalOpen(false)
      setEditingRecipe(null)

      window.location.reload(true)
    } catch (err) {
      alert('Failed to add recipe')
    }
  }

  return (
    <>
      <div className={styles.homePageWrapper}>
        <div className={styles.homePageHeader}>
          <h1 className={styles.homePageTitle}>Recipes</h1>
          <button className={styles.addRecipeBtn} onClick={() => setIsAddModalOpen(true)}>
            + Add new recipe
          </button>
        </div>
        <RecipeList onEdit={openEditModal} listType={recipeListTypes.dailyRecipes} />
        <RecipeList onEdit={openEditModal} listType={recipeListTypes.allRecipes} />
      </div>
      {isAddModalOpen && (
        <AddRecipeModal isOpen={isAddModalOpen} onClose={closeAddRecipeModal} onSubmit={handleAddRecipe} />
      )}
      {isEditModalOpen && (
        <EditRecipeModal
          onSubmit={handleUpdateRecipe}
          onClose={closeEditModal}
          initialValues={editingRecipe}
          isOpen={isEditModalOpen}
        />
      )}
    </>
  )
}
