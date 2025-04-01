import { Component } from '@angular/core';
import { SimulateurServiceService } from '../../services/simulateur-service.service';
import { Ingredient } from '../../models/Ingredient'; // ✅ Vérifie que l'import est correct

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.css']
})
export class IngredientFormComponent {
  ingredient: Ingredient = {
    id: 0, // Peut être null ou géré côté backend
    nom: '',
    iode: 0,
    ins: 0,
    sapo: 0,
    volMousse: 0,
    tenueMousse: 0,
    douceur: 0,
    lavant: 0,
    durete: 0,
    solubilite: 0,
    sechage: 0,
    estCorpsGras: false,
    ligneIngredients: []
  };

  constructor(private simulateurService: SimulateurServiceService) {}

  onSubmit() {
    const ingredientToSend: Ingredient = { ...this.ingredient }; // Copie de l'objet pour éviter des mutations
    this.simulateurService.postIngredient(ingredientToSend).subscribe(response => {
      console.log('Ingrédient enregistré :', response);
    });
  }
}
