import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimulateurServiceService } from '../../services/simulateur-service.service';
import { Ingredient } from '../../models/Ingredient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.css']
})
export class IngredientFormComponent {
  // Référence au formulaire pour le reset
  @ViewChild('ingredientForm') ingredientForm!: NgForm;
  
  // Message de succès/erreur
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;
  
  // Objet ingrédient à enregistrer
  ingredient: Ingredient = new Ingredient(
    null,    // id
    '',      // nom
    0,       // iode
    0,       // ins
    0,       // sapo
    0,       // volMousse
    0,       // tenueMousse
    0,       // douceur
    0,       // lavant
    0,       // durete
    0,       // solubilite
    0,       // sechage
    true,    // estCorpsGras
    []       // ligneIngredients
  );

  constructor(
    private simulateurService: SimulateurServiceService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.ingredientForm.valid) {
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';
      
      this.simulateurService.postIngredient(this.ingredient).subscribe({
        next: (response) => {
          console.log('Ingrédient enregistré avec succès:', response);
          this.successMessage = `L'ingrédient "${response.nom}" a été enregistré avec succès`;
          this.resetForm();
          this.isSubmitting = false;
          
          // Optionnel: rediriger vers la liste des ingrédients après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/ingredients']);
          }, 2000);
        },
        error: (error) => {
          console.error('Erreur lors de l\'enregistrement de l\'ingrédient:', error);
          this.errorMessage = 'Une erreur est survenue lors de l\'enregistrement de l\'ingrédient';
          this.isSubmitting = false;
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.ingredientForm.controls).forEach(key => {
        const control = this.ingredientForm.controls[key];
        control.markAsTouched();
      });
    }
  }

  resetForm() {
    if (this.ingredientForm) {
      this.ingredientForm.resetForm();
      // Réinitialiser l'objet ingrédient
      this.ingredient = new Ingredient(
        null, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, true, []
      );
    }
  }
}