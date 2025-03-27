import { Mention } from "./Mention"; // Je suppose qu'il y a une classe Mention
import { Resultat } from "./Resultat"; // La classe Resultat existe déjà

export class Caracteristique {
  id: number | null = null;
  nom: string = '';
  mentions: Mention[] = [];
  resultats: Resultat[] = [];
}
