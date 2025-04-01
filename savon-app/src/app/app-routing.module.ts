import { NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { IngredientFormComponent } from './pages/ingredient-create/ingredient-create.component';
import { MesRecettesComponent } from './pages/mes-recettes/mes-recettes.component';
import { RecetteIndexComponent } from './components/recette-index/recette-index.component';
import { RecetteCreateComponent } from './pages/recette-create/recette-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'confidentialite', component: PrivacyPolicyComponent },
  { path: 'ingredients', component: IngredientFormComponent},
  {path: 'mesrecettes', component: MesRecettesComponent},
  {path: 'recetteindex', component: RecetteIndexComponent},
  {path: 'creerrecette', component: RecetteCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    provideHttpClient(withFetch())
  ], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
