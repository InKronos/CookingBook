import { RecipeRepository } from "@/data/recipeRepository";
import { Recipe } from "@/model/Recipe.model";
import * as FileSystem from "expo-file-system/legacy";
export class RecipeService {

    getRecipesByID(id: number): Recipe | undefined{
      //return this.getAllRecipes().find(recipe => recipe.id == id)!;
      return RecipeRepository.getById(id);
    }

    getRecipesBySearchTerm(searchTerm: string): Recipe[] {
      //return searchTerm === "" ? [] : this.getAllRecipes().filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return RecipeRepository.getRecipesBySearchTerm(searchTerm)
    }

    getAllRecipesDatabase():Recipe[]{
      return RecipeRepository.getAll();
    }

    updateFavorite(id:number, favorite: boolean): void {
      RecipeRepository.updateFavorite(id, favorite);
    }

    async addRecipe(recipe: Omit<Recipe, 'id'>): Promise<void> {
      const newPath = FileSystem.documentDirectory + 'recipes/' + Date.now() + '.jpg';
      await FileSystem.copyAsync({ from: recipe.imageUrl, to: newPath });
      await RecipeRepository.insert(recipe);
    }

    async updateRecipe(recipe: Recipe, defaultImageUrl: string) {
      if(recipe.imageUrl !== defaultImageUrl){
        if(!defaultImageUrl.includes('assets')) 
          await FileSystem.deleteAsync(defaultImageUrl);
        const newPath = FileSystem.documentDirectory + 'recipes/' + Date.now() + '.jpg';
        await FileSystem.copyAsync({ from: recipe.imageUrl, to: newPath });
        await RecipeRepository.updateRecipe(recipe);
      }
      else{
        await RecipeRepository.updateRecipe(recipe);
      }
    }

    async deleteRecipe(recipe: Recipe) {
      if(!recipe.imageUrl.includes('assets')) 
        await FileSystem.deleteAsync(recipe.imageUrl);
      await RecipeRepository.deleteRecipe(recipe);
    }

    getAllRecipes(): Recipe[]{
        return [
             {
        id: 1,
        name: 'Pizza Pepperoni',
        cookTime: '40',
        favorite: false,
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
        ingredients: ['Drożdze', 'Ser Mozzarella', 'Salami', 'Mąka', 'Woda', 'Sól', 'opcjonalnie przyprawy', 'Pastata pomidorowa'],
        stars: 4.5,
        imageUrl: require('../../assets/foods/pizza.jpg'),
      },
      {
        id: 2,
        name: 'Hotdog',
        cookTime: '15',
        favorite: true,
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
        ingredients: ['Parówka', 'Bułka do hotdogów', 'Keczup'],
        stars: 5,
        imageUrl: require('../../assets/foods/pizza.jpg'),
      },
      {
        id: 3,
        name: 'Hamburger',
        cookTime: '50',
        favorite: false,
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
        ingredients: ['Mięso mielone', 'Bułka przenna', 'Sałata', 'Ogórki kiszone', 'Keczup'],
        stars: 3.5,
        imageUrl: require('../../assets/foods/pizza.jpg'),
      },
      {
        id: 4,
        name: 'Pieczone Ziemiaki',
        cookTime: '20',
        favorite: true,
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
        ingredients: ['Ziemniaki', 'Przyprawa do ziemniaków'],
        stars: 2.5,
        imageUrl: require('../../assets/foods/pizza.jpg'),
      },
      {
        id: 5,
        name: 'Sałatka',
        cookTime: '30',
        favorite: false,
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
        ingredients: ['sałata', 'kukurydza'],
        stars: 3.0,
        imageUrl: require('../../assets/foods/pizza.jpg'),
      }
        ]
    }
}