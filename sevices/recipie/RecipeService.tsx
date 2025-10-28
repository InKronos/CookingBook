import { Recipe } from "@/model/Recipe.model";

export class RecipeService {

    getRecipesByID(id: number): Recipe{
      return this.getAllRecipes().find(recipe => recipe.id == id)!;
    }

    getRecipesBySearchTerm(searchTerm: string): Recipe[] {
      return searchTerm === "" ? [] : this.getAllRecipes().filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
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