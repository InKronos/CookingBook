import type { Recipe } from '@/model/Recipe.model';
import { RecipeDatabase } from '@/model/RecipeDatabase.model';
import { db } from './database';

export const RecipeRepository = {
  getAll(): Recipe[] {
    const result = db.getAllSync<RecipeDatabase>('SELECT * FROM recipes');
    return result.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        favorite: !!row.favorite,
        stars: row.stars,
        imageUrl: row.imageUrl,
        ingredients: row.ingredients.split(","),
        cookTime: row.cookTime
    }));
  },

  getRecipesBySearchTerm(searchTerm: string): Recipe[] {
    const result = db.getAllSync<RecipeDatabase>(`SELECT * FROM recipes WHERE (? IS NOT NULL AND TRIM(?) <> '') AND LOWER(name) LIKE '%' || LOWER(?) || '%';`, [searchTerm, searchTerm, searchTerm]);
    return result.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        favorite: !!row.favorite,
        stars: row.stars,
        imageUrl: row.imageUrl,
        ingredients: row.ingredients.split(","),
        cookTime: row.cookTime
    }));
  },

  getById(id: number): Recipe | undefined {
    const result = db.getAllSync<RecipeDatabase>('SELECT * FROM recipes WHERE id = ?', [id]);
    return {
       id: result[0].id,
        name: result[0].name,
        description: result[0].description,
        favorite: !!result[0].favorite,
        stars: result[0].stars,
        imageUrl: result[0].imageUrl,
        ingredients: result[0].ingredients.split(","),
        cookTime: result[0].cookTime
    };
  },

  async insert(recipe: Omit<Recipe, 'id'>) {
    db.runAsync(
      'INSERT INTO recipes (name, cookTime, favorite, stars, ingredients, description, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [recipe.name, recipe.cookTime, recipe.favorite ? 1 : 0, recipe.stars, recipe.ingredients.toString(), recipe.description, recipe.imageUrl]
    );
  },

  updateFavorite(id: number, favorite: boolean) {
    db.runSync('UPDATE recipes SET favorite = ? WHERE id = ?', [favorite ? 1 : 0, id]);
  },

  async updateRecipe(recipe: Recipe) {
    db.runAsync(
      'UPDATE recipes SET name = ?, cookTime = ?, favorite = ?, stars = ?, ingredients = ?, description = ?, imageUrl = ? WHERE id = ?',
      [recipe.name, recipe.cookTime, recipe.favorite ? 1 : 0, recipe.stars, recipe.ingredients.toString(), recipe.description, recipe.imageUrl, recipe.id]
    )
  },

  async deleteRecipe(recipe: Recipe) {
    db.runAsync(
      'DELETE FROM recipes WHERE id = ?',
      recipe.id
    )
  }
};