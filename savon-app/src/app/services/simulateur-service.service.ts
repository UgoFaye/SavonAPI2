import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Correction 1: Importer HttpClient
import { Observable } from 'rxjs';
import { RecetteDTO } from '../models/RecetteDTO';
import { Ingredient } from '../models/Ingredient';

@Injectable({
  providedIn: 'root'
})
export class SimulateurServiceService {

  // Correction 2: Supprimer la déclaration manuelle de 'http'
  private apiURL = 'http://localhost:8080/api-savon/v1'; // Optionnel: Déclarer l'URL de base

  // Correction 3: Injecter HttpClient correctement
  constructor(private http: HttpClient) { }

  // Correction 4: Implémenter getIngredients correctement
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiURL}/ingredient`);
  }

  // Correction 5: Implémenter postRecette
  postRecette(recetteDTO: RecetteDTO): Observable<RecetteDTO> {
    return this.http.post<RecetteDTO>(`${this.apiURL}/recettes`, recetteDTO);
  }

  // Correction 6: Implémenter postIngredient avec le bon type
  postIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.apiURL}/ingredient`, ingredient);
  }
}