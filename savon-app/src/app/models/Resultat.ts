import { Recette } from "./Recette"; // Importation de la classe Recette
import { Caracteristique } from "./Caracteristique"; // Importation de la classe Caracteristique
import { Mention } from "./Mention"; // Importation de la classe Mention
import { ResultatId } from "./ResultatId" ; // On suppose que la classe ResultatId existe pour gérer la clé composite

export class Resultat {
  resultatId: ResultatId;  // Utilisation d'une clé composite, qui est une autre classe
  score: number = 0;
  recette: Recette | null = null; // Relation avec la Recette
  caracteristique: Caracteristique | null = null; // Relation avec la Caracteristique
  mention: Mention | null = null; // Relation avec la Mention

  constructor(
    resultatId: ResultatId,
    score: number,
    recette: Recette | null = null,
    caracteristique: Caracteristique | null = null,
    mention: Mention | null = null
  ) {
    this.resultatId = resultatId;
    this.score = score;
    this.recette = recette;
    this.caracteristique = caracteristique;
    this.mention = mention;
  }
}
