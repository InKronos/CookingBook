import { Recipe } from '@/model/Recipe.model';
import { RecipeService } from '@/sevices/recipie/RecipeService';
import { useEffect, useState } from 'react';
const service = new RecipeService();


export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = service.getAllRecipesDatabase();
    setRecipes(data);
    setLoading(false);
  }, []);

  return { recipes, loading };
}

export function useRecipe(id: number) {
    const [recipe, setRecipe] = useState<Recipe | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = service.getRecipesByID(id);
        setRecipe(data);
        setLoading(false);
    }, []);

    return { recipe, loading };
}

export function useUpdateFavorite() {


  async function updateFavorite(id: number, favorite: boolean) {
    service.updateFavorite(id, favorite);
  }

  return { updateFavorite };
}