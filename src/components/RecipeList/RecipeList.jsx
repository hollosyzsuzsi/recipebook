import PropTypes, { func, string } from 'prop-types'
import { useState, useEffect } from 'react'

import { useRecipes } from '../../hooks/useRecipes'

import { RecipeCard } from '../RecipeCard/RecipeCard'
import { RecipeDrawer } from '../RecipeDrawer/RecipeDrawer'

import styles from './RecipeList.module.scss'

export const RecipeList = ({ listType, onEdit }) => {
  const { recipes, isLoading, error } = useRecipes(listType.fetchFunction)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isRecipeDrawerOpen, setIsRecipeDrawerOpen] = useState(false)

  useEffect(() => {
    if (isRecipeDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isRecipeDrawerOpen])

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe)
    setIsRecipeDrawerOpen(true)
  }

  const closeDrawer = () => {
    setSelectedRecipe(null)
    setIsRecipeDrawerOpen(false)
  }

  if (isLoading) return <p>Loading recipes...</p>
  if (error) return <p>{error}</p>

  return (
    <div className={styles.recipeListWrapper}>
      {listType.title !== 'Favorite Recipes' ? <h2 className={styles.recipeListTitle}>{listType.title}</h2> : null}
      <div className={styles.recipeList}>
        {recipes.length ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => handleCardClick(recipe)}
              onEdit={() => onEdit(recipe)}
            />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

      {selectedRecipe && <RecipeDrawer recipe={selectedRecipe} onClose={closeDrawer} />}
    </div>
  )
}

RecipeList.propTypes = {
  listType: PropTypes.shape({
    fetchFunction: func.isRequired,
    title: string.isRequired,
  }),
  onEdit: PropTypes.func,
}
