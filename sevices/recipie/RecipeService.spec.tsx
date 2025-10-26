import { RecipieService } from "./RecipeService";
import { Recipe } from '@/model/Recipe.model';

describe('RecipieService', () => {
  let service: RecipieService;

  beforeEach(() => {
    service = new RecipieService();
  });

  it('powinien zostać utworzony', () => {
    expect(service).toBeTruthy();
  });

  it('powinien zwrócić listę przepisów', () => {
    const recipies = service.getAllRecipies();
    expect(Array.isArray(recipies)).toBe(true);
    expect(recipies.length).toBe(5);
  });

  it('powinien zwracać poprawne dane dla każdego przepisu', () => {
    const recipies = service.getAllRecipies();

    recipies.forEach((recipe: Recipe) => {
      expect(recipe).toHaveProperty('id');
      expect(recipe).toHaveProperty('name');
      expect(recipe).toHaveProperty('cookTime');
      expect(recipe).toHaveProperty('favorite');
      expect(recipe).toHaveProperty('recipe');
      expect(recipe).toHaveProperty('origins');
      expect(recipe).toHaveProperty('stars');
      expect(recipe).toHaveProperty('imageUrl');
    });
  });

  it('powinien zawierać przepis o nazwie "Pizza Pepperoni"', () => {
    const recipies = service.getAllRecipies();
    const pizza = recipies.find(r => r.name === 'Pizza Pepperoni');
    expect(pizza).toBeDefined();
    expect(pizza?.origins).toContain('italy');
    expect(pizza?.stars).toBe(4.5);
  });

  it('powinien zawierać co najmniej jeden ulubiony przepis', () => {
    const recipies = service.getAllRecipies();
    const favorites = recipies.filter(r => r.favorite);
    expect(favorites.length).toBeGreaterThan(0);
  });

  it('powinien mieć unikalne identyfikatory', () => {
    const recipies = service.getAllRecipies();
    const ids = recipies.map(r => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
