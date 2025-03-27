import { Recette } from "./Recette"; // Importation de la classe Recette
import { Ingredient } from "./Ingredient"; // Importation de la classe Ingredient
import { LigneIngredientId } from "./LigneIngredientId"; // Importation de la classe LigneIngredientId

export class LigneIngredient {
  ligneIngredientId: LigneIngredientId | null = null; // Clé composite, un objet qui contient les identifiants
  quantite: number = 0; // Quantité de l'ingrédient
  pourcentage: number = 0; // Pourcentage de l'ingrédient
  ingredient: Ingredient | null = null; // Relation avec l'ingredient
  recette: Recette | null = null; // Relation avec la recette

  constructor(
    ligneIngredientId: LigneIngredientId | null,
    quantite: number,
    pourcentage: number,
    ingredient: Ingredient | null = null,
    recette: Recette | null = null
  ) {
    this.ligneIngredientId = ligneIngredientId;
    this.quantite = quantite;
    this.pourcentage = pourcentage;
    this.ingredient = ingredient;
    this.recette = recette;
  }
}
