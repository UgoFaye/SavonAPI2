// src/app/models/ingredient.model.ts
import { LigneIngredient } from './LigneIngredient'; // Assurez-vous que le fichier existe et est bien exporté

export class Ingredient {
  id: number | null;
  nom: string;
  iode: number;
  ins: number;
  sapo: number;
  volMousse: number;
  tenueMousse: number;
  douceur: number;
  lavant: number;
  durete: number;
  solubilite: number;
  sechage: number;
  estCorpsGras: boolean;
  ligneIngredients: LigneIngredient[];

  constructor(
    id: number | null = null,
    nom: string = '',
    iode: number = 0,
    ins: number = 0,
    sapo: number = 0,
    volMousse: number = 0,
    tenueMousse: number = 0,
    douceur: number = 0,
    lavant: number = 0,
    durete: number = 0,
    solubilite: number = 0,
    sechage: number = 0,
    estCorpsGras: boolean = true,
    ligneIngredients: LigneIngredient[] = []
  ) {
    this.id = id;
    this.nom = nom;
    this.iode = iode;
    this.ins = ins;
    this.sapo = sapo;
    this.volMousse = volMousse;
    this.tenueMousse = tenueMousse;
    this.douceur = douceur;
    this.lavant = lavant;
    this.durete = durete;
    this.solubilite = solubilite;
    this.sechage = sechage;
    this.estCorpsGras = estCorpsGras;
    this.ligneIngredients = ligneIngredients;
  }
}

// Optionnel : Permet d'importer avec `import Ingredient from './ingredient.model';`
export default Ingredient;
