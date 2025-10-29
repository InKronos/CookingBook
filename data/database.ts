import * as SQLite from 'expo-sqlite';
export const db = SQLite.openDatabaseSync('recipes.db');

export function initDatabase() {
  //db.execSync('DROP TABLE IF EXISTS recipes');
  db.execSync(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      cookTime TEXT,
      imageUrl TEXT,
      ingredients TEXT,
      favorite BOOLEAN,
      stars REAL
    );
  `);
  const existing = db.getAllSync('SELECT * FROM recipes');
  if (existing.length === 0) {
    seedData();
  }
}


function seedData(){
    const recipes = [
        { name: 'Pizza Pepperoni', cookTime: '40', favorite: true, stars: 4.5, ingredients: 'Drożdze,Ser Mozzarella,Salami,Mąka,Woda,Sól,opcjonalnie przyprawy,Pastata pomidorowa', description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.", imageUrl: "assets/foods/pizza.jpg" },
        { name: 'Hotdog', cookTime: '15', favorite: false, stars: 4, ingredients: "Parówka,Bułka do hotdogów,Keczup", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.", imageUrl: "assets/foods/hotdog.jpg"},
        { name: 'Hamburger', cookTime: '50', favorite: true, stars: 3.5, ingredients: "Mięso mielone,Bułka przenna,Sałata,Ogórki kiszone,Keczup", description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.", imageUrl: "assets/foods/hamburger.jpg" },
    ]
    recipes.forEach(recipe => {
        db.runSync(
            'INSERT INTO recipes (name, cookTime, favorite, stars, ingredients, description, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [recipe.name, recipe.cookTime, recipe.favorite ? 1 : 0, recipe.stars, recipe.ingredients, recipe.description, recipe.imageUrl]
        )
    })
}