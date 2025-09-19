import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { COOKING_MEASUREMENTS } from '../../const/cookingMeasurements'
import { useIngredientsMap } from '../../hooks/useIngredientsMap'

import deleteIcon from '../../assets/icons/deleterecipedrawer.svg'
import styles from './RecipeForm.module.scss'

export const RecipeForm = ({ onSubmit, initialValues = {}, isAddNewRecipe }) => {
  const { ingredientsMap, ingredientsList } = useIngredientsMap()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialValues.name || '',
      cookingTime: initialValues.cookingTime || '',
      description: initialValues.description || '',
      ingredientId: '',
      amount: 0,
      amountType: '',
    },
  })

  const [ingredients, setIngredients] = useState(initialValues.ingredients || [])

  useEffect(() => {
    setIngredients(initialValues.ingredients || [])
  }, [initialValues.ingredients])

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { ingredientId: '', ingredientName: '', amount: '', amountType: '' }])
  }

  const handleRemoveIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index))
  }

  const onFormSubmit = (data) => {
    const fullData = {
      cookingTime: Number(data.cookingTime),
      ingredients,
      isFavorite: initialValues.isFavorite || false,
      isPopular: initialValues.isPopular || false,
      isRecipeOfDay: initialValues.isRecipeOfDay || false,
      ...data,
    }
    onSubmit(fullData)
  }

  return (
    <form className={styles.recipeForm} onSubmit={handleSubmit(onFormSubmit)}>
      <div className={styles.firstRow}>
        <label htmlFor="name" className={styles.formLabel}>
          Name of recipe
          <input
            type="text"
            id="name"
            className={styles.recipeName}
            placeholder="Name"
            {...register('name', { required: 'Name is required' })}
          />
        </label>
        <div className={styles.timeWrapper}>
          <label htmlFor="cooking-time" className={styles.formLabel}>
            Cooking time
            <input
              type="text"
              id="cooking-time"
              className={styles.recipeCookingTime}
              placeholder="15"
              {...register('cookingTime', {
                required: 'Cooking time is required',
                validate: (value) => (!isNaN(value) && Number(value) > 0) || 'Must be a positive number',
              })}
            />
          </label>
          <span className={styles.minutes}>min</span>
        </div>
      </div>
      <div className={styles.errorWrapperRow}>
        {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
        {errors.cookingTime && <span className={styles.errorMsg}>{errors.cookingTime.message}</span>}
      </div>

      <label htmlFor="description" className={styles.formLabel}>
        Description
        <textarea
          id="description"
          className={styles.description}
          placeholder="description"
          {...register('description')}
        />
      </label>
      <div className={styles.errorWrapperRow}>
        {errors.description && <span className={styles.errorMsg}>{errors.description.message}</span>}
      </div>
      <div
        className={
          isAddNewRecipe ? `${styles.ingredientsListWrapper} ${styles.addRecipeModal}` : styles.ingredientsListWrapper
        }
      >
        {isAddNewRecipe && (
          <>
            <div className={styles.thirdRow}>
              <label htmlFor="select" className={styles.formLabel}>
                Ingredients
                <select className={styles.formSelectIng} id="select" {...register('ingredientId')}>
                  {ingredientsList.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className={styles.quantityWrapper}>
                <label htmlFor="quantity" className={styles.formLabel}>
                  Quantity
                  <input
                    type="text"
                    id="quantity"
                    placeholder="15"
                    className={styles.inputAmount}
                    {...register('amount', {
                      validate: (value) =>
                        value === '' || (!isNaN(value) && Number(value) > 0) || 'Must be a positive number',
                    })}
                  />
                </label>
                <select className={styles.formSelectUnit} {...register('amountType')}>
                  {COOKING_MEASUREMENTS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.errorWrapperRow}>
              {errors.ingredientId && <span className={styles.errorMsg}>{errors.ingredientId.message}</span>}
              {errors.amount && <span className={styles.errorMsg}>{errors.amount.message}</span>}
              {errors.amountType && <span className={styles.errorMsg}>{errors.amountType.message}</span>}
            </div>
          </>
        )}
        {ingredients.length > 0 && (
          <ul className={styles.ingredientsList}>
            {ingredients.map((ing, i) => (
              <li className={styles.ingredientsItem} key={i}>
                <div className={styles.quantityLine}>
                  <select
                    className={styles.formSelectIng}
                    value={ing.ingredientId}
                    onChange={(e) => {
                      const id = Number(e.target.value)
                      const name = ingredientsMap[id]
                      setIngredients((prev) =>
                        prev.map((item, index) =>
                          index === i ? { ...item, ingredientId: id, ingredientName: name } : item
                        )
                      )
                    }}
                  >
                    {ingredientsList.map((ingr) => (
                      <option key={ingr.id} value={ingr.id}>
                        {ingr.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    className={styles.inputAmount}
                    value={ing.amount}
                    onChange={(e) => {
                      const amount = e.target.value
                      setIngredients((prev) => prev.map((item, index) => (index === i ? { ...item, amount } : item)))
                    }}
                  />

                  <select
                    className={styles.formSelectUnit}
                    value={ing.amountType}
                    onChange={(e) => {
                      const amountType = e.target.value
                      setIngredients((prev) =>
                        prev.map((item, index) => (index === i ? { ...item, amountType } : item))
                      )
                    }}
                  >
                    {COOKING_MEASUREMENTS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <button className={styles.removeBtn} type="button" onClick={() => handleRemoveIngredient(i)}>
                    <img src={deleteIcon} alt="Remove ingredient" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.ingredientListControls}>
        <button className={styles.addBtn} type="button" onClick={handleAddIngredient}>
          + Add Ingredient
        </button>

        <button className={styles.submitBtn} type="submit">
          {initialValues.id ? 'Edit Recipe' : 'Add New Recipe'}
        </button>
      </div>
    </form>
  )
}

RecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    label: PropTypes.string,
    cookingTime: PropTypes.number,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredientId: PropTypes.number.isRequired,
        ingredientName: PropTypes.string,
        amount: PropTypes.number.isRequired,
        amountType: PropTypes.string.isRequired,
      })
    ),
    isFavorite: PropTypes.bool,
    isPopular: PropTypes.bool,
    isRecipeOfDay: PropTypes.bool,
  }),
  isAddNewRecipe: PropTypes.bool,
}
