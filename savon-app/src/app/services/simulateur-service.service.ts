import { Injectable } from '@angular/core';
import { IngredientsComponent } from '../pages/ingredients/ingredients.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulateurServiceService {
  postIngredient(ingredient : IngredientsComponent): Observable<IngredientsComponent> {
    return this.post<IngredientsComponent>('${this.apiURL}/ingredient', ingredient);
  }
  post<T>(arg0: string, ingredient: IngredientsComponent): Observable<IngredientsComponent> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
