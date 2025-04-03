import { Recette } from "./Recette"; // Importation de la classe Recette
import { Ingredient } from "./Ingredient"; // Importation de la classe Ingredient
import { LigneIngredientId } from "./LigneIngredientId"; // Importation de la classe LigneIngredientId

export class LigneIngredient {
 ingredientId:number | null=null
 recetteId:number | null=null// Clé composite, un objet qui contient les identifiants
  quantite: number = 0; // Quantité de l'ingrédient
  pourcentage: number = 0; // Pourcentage de l'ingrédient
  ingredient: Ingredient | null = null; // Relation avec l'ingredient
  recette: Recette | null = null; // Relation avec la recette

  constructor(
    ingredient: Ingredient | null = null,
    quantite: number,
    pourcentage: number,
    recette: Recette | null = null
  ) {
    
    this.quantite = quantite;
    this.pourcentage = pourcentage;
    this.ingredient = ingredient;
    this.recette = recette;
    this.ingredientId=ingredient?.id!!;
    this.recetteId = recette?.id!!

  }
}
