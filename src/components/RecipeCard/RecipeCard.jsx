import PropTypes from 'prop-types'

import { useDeleteModal } from '../../hooks/useDeleteModal'

import { deleteRecipe } from '../../api/recipesService'
import { toggleFavorite } from '../../api/recipesService'

import addToFavoritesIcon from '../../assets/icons/addtofavorites.svg'
import inFavoritesIcon from '../../assets/icons/favorite.svg'
import deleteRecipeIcon from '../../assets/icons/deleterecipe.svg'
import editRecipeIcon from '../../assets/icons/editrecipe.svg'

import styles from './RecipeCard.module.scss'

export const RecipeCard = ({ recipe, onClick, onEdit }) => {
  const { openModal } = useDeleteModal()

  const handleDelete = () => {
    openModal({
      onConfirm: async () => {
        try {
          await deleteRecipe(recipe.id)

          window.location.reload(true)
        } catch (err) {
          alert('Failed to delete recipe.')
        }
      },
    })
  }

  return (
    <>
      <div className={styles.recipeCardWrapper} onClick={onClick}>
        <div className={styles.buttonsWrapper}>
          <div className={styles.favoriteBtnWrapper}>
            <button
              className={recipe.isFavorite ? styles.favBtn : styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(recipe.id, recipe.isFavorite)
                window.location.reload(true)
              }}
            >
              <img src={recipe.isFavorite ? inFavoritesIcon : addToFavoritesIcon} alt="Add to favorites" />
            </button>
          </div>

          <div className={styles.restBtnsWrapper}>
            <button
              className={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
            >
              <img src={editRecipeIcon} alt="Edit recipe" />
            </button>

            <button
              className={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation()
                handleDelete()
              }}
            >
              <img src={deleteRecipeIcon} alt="Delete recipe" />
            </button>
          </div>
        </div>

        <div className={styles.textWrapper}>
          <h3 className={styles.recipeCardTitle}>{recipe.name}</h3>
          <div className={styles.recipeDataWrapper}>
            <p className={styles.recipeCardIngredients}>{recipe.ingredients?.length} ingredients</p>
            <p className={styles.recipeCardTime}>{recipe.cookingTime} min</p>
          </div>
        </div>
      </div>
    </>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredientId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        amountType: PropTypes.string,
      })
    ).isRequired,
    cookingTime: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
}
