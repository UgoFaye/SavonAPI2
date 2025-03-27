import { Component, OnInit } from '@angular/core';
import { RecetteService } from '../../services/recette.service';
import { RecetteDTO } from '../../models/RecetteDTO';

@Component({
  selector: 'app-recette-index',
  templateUrl: './recette-index.component.html',
  styleUrls: ['./recette-index.component.css']
})
export class RecetteIndexComponent implements OnInit {
  recettes: RecetteDTO[] = [];

  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    this.loadRecettes();
  }

  loadRecettes(): void {
    this.recetteService.getAllRecettes().subscribe((data) => {
      this.recettes = data;
    });
  }

  deleteRecette(id: number | null): void {
    if (id === null) {
      console.error("Erreur : Impossible de supprimer la recette car l'ID est null.");
      return;
    }

    if (confirm("Voulez-vous vraiment supprimer cette recette ?")) {
      this.recetteService.deleteRecette(id).subscribe(() => {
        this.recettes = this.recettes.filter(r => r.id !== id);
        console.log(`Recette avec ID ${id} supprimée.`);
      });
    }
  }
}
