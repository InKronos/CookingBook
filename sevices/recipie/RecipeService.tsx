import { Recipe } from "@/model/Recipe.model";

export class RecipeService {


    getRecipiesBySearchTerm(searchTerm: string): Recipe[] {
      return searchTerm === "" ? [] : this.getAllRecipes().filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    getAllRecipes(): Recipe[]{
        return [
             {
        id: 1,
        name: 'Pizza Pepperoni',
        cookTime: '40',
        favorite: false,
        recipe: "dududududdudududuududud",
        origins: ['italy'],
        stars: 4.5,
        imageUrl: require('../../assets/foods/pizza.jpg'),
      },
      {
        id: 2,
        name: 'Hotdog',
        cookTime: '15',
        favorite: true,
        recipe: "dududududdudududuududud",
        origins: ['us', 'france'],
        stars: 5,
        imageUrl: require('../../assets/foods/pizza.jpg'),
      },
      {
        id: 3,
        name: 'Hamburger',
        cookTime: '50',
        favorite: false,
        recipe: "dududududdudududuududud",
        origins: ['germany', 'us'],
        stars: 3.5,
        imageUrl: require('../../assets/foods/pizza.jpg'),
      },
      {
        id: 4,
        name: 'Fried Potatoes',
        cookTime: '20',
        favorite: true,
        recipe: "dududududdudududuududud",
        origins: ['belgium', 'france'],
        stars: 2.5,
        imageUrl: require('../../assets/foods/pizza.jpg'),
      },
      {
        id: 5,
        name: 'Salad',
        cookTime: '30',
        favorite: false,
        recipe: "dududududdudududuududud",
        origins: ['italy', 'poland'],
        stars: 3.0,
        imageUrl: require('../../assets/foods/pizza.jpg'),
      }
        ]
    }
}