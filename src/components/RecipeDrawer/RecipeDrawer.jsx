import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { useIngredientsMap } from '../../hooks/useIngredientsMap'
import { useDeleteModal } from '../../hooks/useDeleteModal'
import { deleteRecipe, updateRecipe, toggleFavorite } from '../../api/recipesService'

import { EditRecipeModal } from '../EditRecipe/EditRecipeModal'

import addToFavoritesIcon from '../../assets/icons/favoritedrawer.svg'
import inFavoritesIcons from '../../assets/icons/favorite.svg'
import editRecipeIcon from '../../assets/icons/editrecipedrawer.svg'
import deleteRecipeIcon from '../../assets/icons/deleterecipedrawer.svg'
import closeDrawerIcon from '../../assets/icons/closedrawer.svg'

import styles from './RecipeDrawer.module.scss'

export const RecipeDrawer = ({ recipe, onClose }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { ingredientsMap } = useIngredientsMap()
  const { openModal } = useDeleteModal()

  const handleDelete = () => {
    openModal({
      onConfirm: async () => {
        try {
          await deleteRecipe(recipe.id)

          onClose()
        } catch (err) {
          alert('Failed to delete recipe.')
        }
      },
    })
  }
  const handleUpdateRecipe = async (id, newRecipe) => {
    try {
      await updateRecipe(id, newRecipe)

      setIsEditModalOpen(false)
      window.location.reload(true)
    } catch (err) {
      alert('Failed to add recipe')
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (Object.keys(ingredientsMap).length === 0) {
    return null
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.drawerOverlay} onClick={handleOverlayClick}>
        <aside className={`${styles.drawerContainer} ${styles.open}`}>
          <div className={styles.recipeImg} role="img" aria-label="recipe image" />
          <div className={styles.drawerText}>
            <button className={`${styles.actionBtn} ${styles.closeBtn}`} onClick={onClose}>
              <img src={closeDrawerIcon} alt="Close drawer" />
            </button>

            <div className={styles.drawerHeader}>
              <h3 className={styles.recipeName}>{recipe.name}</h3>
              <h3 className={styles.recipeTime}>{recipe.cookingTime} min.</h3>
            </div>

            <p className={styles.description}>{recipe.description}</p>

            <h2 className={styles.ingredientsTitle}>Ingredients</h2>
            <ul className={styles.ingredientsList}>
              {recipe.ingredients.map((item) => (
                <li key={item.ingredientId} className={styles.ingredientsItem}>
                  {ingredientsMap[item.ingredientId] || '...'}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.buttonsWrapper}>
            <div className={styles.firstButtonWrapper}>
              <button
                className={recipe.isFavorite ? styles.favBtn : styles.actionBtn}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(recipe.id, recipe.isFavorite)
                  window.location.reload(true)
                }}
              >
                <img src={recipe.isFavorite ? inFavoritesIcons : addToFavoritesIcon} alt="Add to favorites" />
              </button>
            </div>

            <div className={styles.remainingButtonsWrapper}>
              <button className={styles.actionBtn} onClick={() => setIsEditModalOpen(true)}>
                <img src={editRecipeIcon} alt="Edit recipe" />
              </button>

              <button className={styles.actionBtn} onClick={handleDelete}>
                <img src={deleteRecipeIcon} alt="Delete recipe" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      <EditRecipeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateRecipe}
        initialValues={recipe}
      />
    </>,
    document.getElementById('portal-root')
  )
}

RecipeDrawer.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    cookingTime: PropTypes.number.isRequired,
    description: PropTypes.string,
    isFavorite: PropTypes.bool.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredientId: PropTypes.number.isRequired,
        amount: PropTypes.number,
        amountType: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}
