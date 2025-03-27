// src/app/models/mention.model.ts
import { Caracteristique } from './Caracteristique';
import { Resultat } from './Resultat';

export class Mention {
  id: number | null = null;
  label: string = '';
  noteMin: number = 0;
  noteMax: number = 0;
  caracteristique: Caracteristique | null = null;
  resultats: Resultat[] = [];

  constructor(
    id: number | null = null,
    label: string = '',
    noteMin: number = 0,
    noteMax: number = 0,
    caracteristique: Caracteristique | null = null,
    resultats: Resultat[] = []
  ) {
    this.id = id;
    this.label = label;
    this.noteMin = noteMin;
    this.noteMax = noteMax;
    this.caracteristique = caracteristique;
    this.resultats = resultats;
  }
}
