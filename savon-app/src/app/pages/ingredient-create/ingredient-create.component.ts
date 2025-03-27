import { Component } from '@angular/core';
import { SimulateurServiceService } from '../../services/simulateur-service.service';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.css']
})
export class IngredientFormComponent {
  ingredient = {
    nom: '',
    quantite: 0,
    unite: ''
  };

  constructor(private simulateurService: SimulateurServiceService) {}

  onSubmit() {
    this.simulateurService.postIngredient(this.ingredient).subscribe(response => {
      console.log('Ingrédient enregistré :', response);
    });
  }
}
