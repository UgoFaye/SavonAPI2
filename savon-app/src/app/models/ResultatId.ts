// src/app/models/ResultatId.model.ts
export class ResultatId {
    caracteristiqueId: number;
    recetteId: number;
  
    constructor(caracteristiqueId: number, recetteId: number) {
      this.caracteristiqueId = caracteristiqueId;
      this.recetteId = recetteId;
    }
  }
  