export class Recipe {
    id!: number;
    name!: string;
    recipe!: string;
    favorite:boolean = false;
    stars:number = 0;
    imageUrl!:string;
    origins!:string[];
    cookTime!:string;
}