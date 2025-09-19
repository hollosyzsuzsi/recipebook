import { useEffect, useState } from 'react'

export const useRecipe = (getRecipeByKind) => {
  const [recipe, setRecipe] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeByKind()

        setRecipe(data)
      } catch (err) {
        setError(`Failed to fetch recipe. ${err}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipe()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { recipe, isLoading, error }
}
