import { Recipe } from "@/model/Recipe.model";

export class RecipieService {
    getAllRecipies(): Recipe[]{
        return [
             {
        id: 1,
        name: 'Pizza Pepperoni',
        cookTime: '10-20',
        favorite: false,
        recipe: "dududududdudududuududud",
        origins: ['italy'],
        stars: 4.5,
        imageUrl: 'images/pizza.jpg',
      },
      {
        id: 2,
        name: 'hotdog',
        cookTime: '20-30',
        favorite: true,
        recipe: "dududududdudududuududud",
        origins: ['us', 'france'],
        stars: 5,
        imageUrl: 'images/hotdog.jpg',
      },
      {
        id: 3,
        name: 'Hamburger',
        cookTime: '10-15',
        favorite: false,
        recipe: "dududududdudududuududud",
        origins: ['germany', 'us'],
        stars: 3.5,
        imageUrl: 'images/burger.jpeg',
      },
      {
        id: 4,
        name: 'Fried Potatoes',
        cookTime: '15-20',
        favorite: true,
        recipe: "dududududdudududuududud",
        origins: ['belgium', 'france'],
        stars: 2.5,
        imageUrl: 'images/fries.jpg',
      },
      {
        id: 5,
        name: 'Salad',
        cookTime: '40-50',
        favorite: false,
        recipe: "dududududdudududuududud",
        origins: ['italy', 'poland'],
        stars: 3.0,
        imageUrl: 'images/salad.jpeg',
      }
        ]
    }
}