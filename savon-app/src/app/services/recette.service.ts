import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecetteDTO } from '../models/RecetteDTO';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = 'http://localhost:8080/api-savon//recette'; // Remplace par ton URL d'API

  constructor(private http: HttpClient) {}

  getAllRecettes(): Observable<RecetteDTO[]> {
    return this.http.get<RecetteDTO[]>(this.apiUrl);
  }

  getRecetteById(id: number): Observable<RecetteDTO> {
    return this.http.get<RecetteDTO>(`${this.apiUrl}/${id}`);
  }

  postRecetteDTO(recette: RecetteDTO): Observable<RecetteDTO> {
    return this.http.post<RecetteDTO>(this.apiUrl, recette);
  }

  putRecetteDTO(id: number, recette: RecetteDTO): Observable<RecetteDTO> {
    return this.http.put<RecetteDTO>(`${this.apiUrl}/${id}`, recette);
  }

  deleteRecette(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
