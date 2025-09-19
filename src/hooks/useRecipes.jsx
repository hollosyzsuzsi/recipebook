import { useEffect, useState } from 'react'

export const useRecipes = (getRecipesByKind) => {
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipesByKind()

        setRecipes(data)
      } catch (err) {
        setError(`Failed to fetch recipes. ${err}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { recipes, isLoading, error }
}
