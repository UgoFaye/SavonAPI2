import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimulateurServiceService } from '../../services/simulateur-service.service';
import { RecetteDTO } from '../../models/RecetteDTO';
import { Ingredient } from '../../models/Ingredient';
import { LigneIngredient } from '../../models/LigneIngredient';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recette-create',
  templateUrl: './recette-create.component.html',
  styleUrls: ['./recette-create.component.css']
})
export class RecetteCreateComponent implements OnInit, OnDestroy {
  recetteDTO: RecetteDTO = {
    id: null,  // ou une valeur par défaut si nécessaire
    titre: '',
    description: '',
    ligneIngredients: [],
    surgraissage: 0, // Valeur par défaut
    avecSoude: false, // Valeur par défaut
    concentrationAlcalin: 0, // Valeur par défaut
    qteAlcalin: 0, // Valeur par défaut
    apportEnEau: 0, // Valeur par défaut
    resultats: undefined // ou {} selon la structure de 'resultats'
  };

  listeingredients: Ingredient[] = [];
  ingredientIdSelect?: number | null;
  isLoading = false;
  errorMessage = '';
  showModal = false;
  private destroy$ = new Subject<void>();
  ingredient: Ingredient | undefined;

  constructor(private simulateurService: SimulateurServiceService) { }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchIngredients(): void {
    this.isLoading = true;
    this.simulateurService.getIngredients()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.listeingredients = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Erreur de chargement des ingrédients';
          this.isLoading = false;
        } 
      });
  }

  ajoutLigne(): void {
    if (this.ingredientIdSelect !== null && this.ingredientIdSelect !== undefined) {
      const ingredient = this.listeingredients.find(ing => ing.id === this.ingredientIdSelect);
      if (ingredient) {
        const newLine: LigneIngredient = {
          ingredient: ingredient,
          quantite: 1,
          pourcentage: 0,
          ligneIngredientId: null,
          recette: null
        };
        this.recetteDTO.ligneIngredients.push(newLine);
        this.majPourcentages();
        this.closeModal();
      }
    }
  }

  majPourcentages(): void {
    const totalQuantite = this.recetteDTO.ligneIngredients.reduce((sum, ligne) => sum + ligne.quantite, 0);
    this.recetteDTO.ligneIngredients.forEach(ligne => {
      ligne.pourcentage = totalQuantite > 0 ? (ligne.quantite / totalQuantite) * 100 : 0;
    });
  }

  getIngredientName(ingredient: Ingredient | null): string {
    return ingredient ? ingredient.nom : 'Ingrédient inconnu';
  }

  removeIngredient(index: number): void {
    this.recetteDTO.ligneIngredients.splice(index, 1);
    this.majPourcentages();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.ingredientIdSelect = null;
  }

  submitRecette(): void {
    if (!this.recetteDTO.ligneIngredients.length) {
      this.errorMessage = 'Ajoutez au moins un ingrédient';
      return;
    }

    this.isLoading = true;
    this.simulateurService.postRecette(this.recetteDTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.resetForm();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la création: ' + err.message;
          this.isLoading = false;
        }
      });
  }

  private resetForm(): void {
    this.recetteDTO = {
      id: null,  // ou une valeur par défaut si nécessaire
      titre: '',
      description: '',
      ligneIngredients: [],
      surgraissage: 0, // Valeur par défaut
      avecSoude: false, // Valeur par défaut
      concentrationAlcalin: 0, // Valeur par défaut
      qteAlcalin: 0, // Valeur par défaut
      apportEnEau: 0, // Valeur par défaut
      resultats: undefined // ou {} selon la structure de 'resultats'
    };
    this.errorMessage = '';
  }
}
