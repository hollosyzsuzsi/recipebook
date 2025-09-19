import { useState, useEffect } from 'react'
import { getAllIngredients } from '../api/recipesService'

export const useIngredientsMap = () => {
  const [map, setMap] = useState({})

  const [list, setList] = useState([])

  useEffect(() => {
    getAllIngredients().then((data) => {
      const ingredientsById = {}

      data.forEach((ing) => (ingredientsById[ing.id] = ing.name))
      setMap(ingredientsById)
      setList(data)
    })
  }, [])

  return { ingredientsMap: map, ingredientsList: list }
}
