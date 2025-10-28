import { Recipe } from '@/model/Recipe.model';
import { RecipeService } from '@/sevices/recipie/RecipeService';
import { useEffect, useState } from 'react';

const recipeService = new RecipeService();

export function useFilteredRecipes(searchTerm: string) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = recipeService.getRecipesBySearchTerm(searchTerm);
    setRecipes(data);
    setLoading(false);
  }, [searchTerm]); 

  return { recipes, loading };
}