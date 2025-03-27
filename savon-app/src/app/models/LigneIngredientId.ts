// src/app/models/ligneIngredientId.model.ts
export class LigneIngredientId {
    ingredientId: number = 0;
    recetteId: number = 0;
  
    constructor(ingredientId: number = 0, recetteId: number = 0) {
      this.ingredientId = ingredientId;
      this.recetteId = recetteId;
    }
  }
  