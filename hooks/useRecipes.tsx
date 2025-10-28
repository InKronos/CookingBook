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