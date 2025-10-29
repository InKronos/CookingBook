export class Recipe {
    id!: number;
    name!: string;
    description!: string;
    favorite:boolean = false;
    stars:number = 0;
    imageUrl!:string;
    ingredients!:string[];
    cookTime!:string;
}