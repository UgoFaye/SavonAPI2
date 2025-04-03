import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimulateurServiceService } from '../../services/simulateur-service.service';
import { RecetteService } from '../../services/recette.service';
import { RecetteDTO } from '../../models/RecetteDTO';
import { Ingredient } from '../../models/Ingredient';
import { LigneIngredient } from '../../models/LigneIngredient';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recette-create',
  templateUrl: './recette-create.component.html',
  styleUrls: ['./recette-create.component.css']
})
export class RecetteCreateComponent implements OnInit, OnDestroy {
  recetteDTO: RecetteDTO = new RecetteDTO();
  
  listeingredients: Ingredient[] = [];
  ingredientIdSelect: number | null = null;
  quantiteIngredient: number = 10;
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showModal = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private simulateurService: SimulateurServiceService,
    private recetteService: RecetteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchIngredients();
    // Initialiser la recette avec des valeurs par défaut
    this.recetteDTO = {
      id: null,
      titre: '',
      description: '',
      surgraissage: 5, // Valeur par défaut raisonnable
      apportEnEau: 38, // Valeur par défaut raisonnable
      avecSoude: true, // Par défaut, on utilise la soude
      concentrationAlcalin: 30, // Valeur par défaut
      qteAlcalin: 0,
      ligneIngredients: [],
      resultats: {}
    };
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
          console.log('Ingrédients chargés:', data);
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Erreur de chargement des ingrédients: ' + error.message;
          this.isLoading = false;
        } 
      });
  }

  ajoutLigne(): void {
    console.log('Ajout d\'ingrédient, ID sélectionné:', this.ingredientIdSelect);
    
    if (this.ingredientIdSelect === null || this.ingredientIdSelect === undefined) {
      this.errorMessage = 'Veuillez sélectionner un ingrédient';
      return;
    }
    
    const ingredient = this.listeingredients.find(ing => ing.id === this.ingredientIdSelect);
    console.log('Ingrédient trouvé:', ingredient);
    
    if (!ingredient) {
      this.errorMessage = 'Ingrédient non trouvé';
      return;
    }
    
    // Vérifier si l'ingrédient est déjà dans la liste
    const existingIndex = this.recetteDTO.ligneIngredients.findIndex(
      line => line.ingredient && line.ingredient.id === this.ingredientIdSelect
    );
    
    if (existingIndex !== -1) {
      // Si l'ingrédient existe déjà, on augmente sa quantité
      this.recetteDTO.ligneIngredients[existingIndex].quantite += this.quantiteIngredient;
      console.log('Quantité mise à jour pour ingrédient existant');
    } else {
      // Sinon, on l'ajoute à la liste
      const newLine= new LigneIngredient  ( ingredient, this.quantiteIngredient || 10, 0, null)
      
      this.recetteDTO.ligneIngredients.push(newLine);
      console.log('Nouvelle ligne ajoutée:', newLine);
    }
    
    this.majPourcentages();
    this.closeModal();
  }

  majPourcentages(): void {
    const totalQuantite = this.getTotalQuantite();
    this.recetteDTO.ligneIngredients.forEach(ligne => {
      ligne.pourcentage = totalQuantite > 0 ? (ligne.quantite / totalQuantite) * 100 : 0;
    });
    console.log('Pourcentages mis à jour');
  }

  getTotalQuantite(): number {
    return this.recetteDTO.ligneIngredients.reduce((sum, ligne) => sum + ligne.quantite, 0);
  }

  getIngredientName(ingredient: Ingredient | null): string {
    return ingredient ? ingredient.nom : 'Ingrédient inconnu';
  }

  removeIngredient(index: number): void {
    this.recetteDTO.ligneIngredients.splice(index, 1);
    this.majPourcentages();
    console.log('Ingrédient supprimé à l\'index:', index);
  }

  openModal(): void {
    this.showModal = true;
    this.ingredientIdSelect = null;
    this.quantiteIngredient = 10;
    this.errorMessage = '';
    console.log('Modal ouvert');
  }

  closeModal(): void {
    this.showModal = false;
    console.log('Modal fermé');
  }

  submitRecette(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    console.log('Soumission de la recette:', this.recetteDTO);
    
    // Utilise le service RecetteService pour l'envoi
    this.recetteService.postRecetteDTO(this.recetteDTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Recette créée avec succès!';
          console.log('Recette créée avec succès:', response);
          
          // Redirection après un court délai
          setTimeout(() => {
            this.router.navigate(['/mesrecettes']);
          }, 1500);
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la création: ' + (err.message || err);
          this.isLoading = false;
          console.error('Erreur lors de la création de la recette:', err);
        }
      });
  }

  validateForm(): boolean {
    if (!this.recetteDTO.titre.trim()) {
      this.errorMessage = 'Le titre est obligatoire';
      return false;
    }

    if (!this.recetteDTO.description.trim()) {
      this.errorMessage = 'La description est obligatoire';
      return false;
    }

    if (this.recetteDTO.ligneIngredients.length === 0) {
      this.errorMessage = 'Ajoutez au moins un ingrédient';
      return false;
    }

    if (this.recetteDTO.avecSoude) {
      if (this.recetteDTO.concentrationAlcalin <= 0) {
        this.errorMessage = 'La concentration alcaline doit être positive';
        return false;
      }
    }

    return true;
  }

  resetForm(): void {
    this.recetteDTO = {
      id: null,
      titre: '',
      description: '',
      surgraissage: 5,
      apportEnEau: 38,
      avecSoude: true,
      concentrationAlcalin: 30,
      qteAlcalin: 0,
      ligneIngredients: [],
      resultats: {}
    };
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Formulaire réinitialisé');
  }
}