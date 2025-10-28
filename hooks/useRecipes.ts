import { Recipe } from '@/model/Recipe.model';
import { RecipeService } from '@/sevices/recipie/RecipeService';
import { useEffect, useState } from 'react';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const service = new RecipeService();
    const data = service.getAllRecipes();
    setRecipes(data);
    setLoading(false);
  }, []);

  return { recipes, loading };
}

export function useRecipe(id: number) {
    const [recipe, setRecipe] = useState<Recipe>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const service = new RecipeService();
        const data = service.getRecipesByID(id);
        setRecipe(data);
        setLoading(false);
    }, []);

    return { recipe, loading };
}