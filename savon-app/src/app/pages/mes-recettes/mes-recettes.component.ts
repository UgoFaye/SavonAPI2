import { Component, OnInit } from '@angular/core';
// Si tu utilises un service pour récupérer les recettes, il faudra l'importer ici.
import { RecetteService } from '../../services/recette.service';  // Remplace par le chemin de ton service

@Component({
  selector: 'app-mes-recettes',
  templateUrl: './mes-recettes.component.html',
  styleUrls: ['./mes-recettes.component.css']
})
export class MesRecettesComponent implements OnInit {
  recettes: any[] = [];  // Initialise le tableau des recettes comme un tableau vide
  insIndexMoyen: number = 0;

  constructor(private recetteService: RecetteService) { }

  ngOnInit(): void {
    this.loadRecettes();
  }

  deleteAllRecettes(): void {
    if (confirm("Attention ! Voulez-vous vraiment supprimer TOUTES vos recettes ? Cette action est irréversible.")) {
      this.recetteService.deleteAllRecettes().subscribe(
        () => {
          // Une fois la suppression réussie, on vide le tableau des recettes
          this.recettes = [];
          console.log('Toutes les recettes ont été supprimées avec succès.');
        },
        (error) => {
          console.error('Erreur lors de la suppression des recettes :', error);
        }
      );
    }
  }


  loadRecettes(): void {
    // Si tu as un service pour récupérer les recettes, utilise-le comme ici :
    this.recetteService.getAllRecettes().subscribe(
      (data: any[]) => {
        // Une fois les données récupérées, on les assigne à la variable `recettes`
        this.recettes = data;
      },
      (error) => {
        // Gère l'erreur si l'appel échoue
        console.error('Erreur lors du chargement des recettes :', error);
      }
    );
  }
  calculerINSMoyen(): void {
    if (this.recettes.length === 0) {
      this.insIndexMoyen = 0;
      return;
    }

    // En me basant sur le template HTML (document 9), il semble que l'INS soit
    // stocké dans recette.resultats[0] ou recette.resultats[1]
    // Vérifions le nom de la caractéristique pour trouver l'INS
    let sommeINS = 0;
    let nombreRecettesAvecINS = 0;

    for (const recette of this.recettes) {
      // Parcourir les résultats pour trouver celui avec le nom "INS"
      const insResultat = recette.resultats.find(
        (resultat: any) => 
          resultat.caracteristique?.nom === 'INS' || 
          resultat.caracteristique?.nom === 'Indice INS' ||
          resultat.caracteristique?.nom === 'INS Index'
      );

      if (insResultat) {
        sommeINS += insResultat.score;
        nombreRecettesAvecINS++;
      } else if (recette.resultats[0]?.score !== undefined) {
        // Si on ne trouve pas par le nom, prenons la première caractéristique par défaut
        // (d'après le template, il semble que ce soit l'INS)
        sommeINS += recette.resultats[0].score;
        nombreRecettesAvecINS++;
      }
    }

    this.insIndexMoyen = nombreRecettesAvecINS > 0 ? sommeINS / nombreRecettesAvecINS : 0;
  }
}


