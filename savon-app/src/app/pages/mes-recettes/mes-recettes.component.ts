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

  constructor(private recetteService: RecetteService) { }

  ngOnInit(): void {
    this.loadRecettes();
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
}
