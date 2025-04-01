import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { IngredientFormComponent } from './pages/ingredient-create/ingredient-create.component';
import { FormsModule } from '@angular/forms';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { MesRecettesComponent } from './pages/mes-recettes/mes-recettes.component';
import { RecetteIndexComponent } from './components/recette-index/recette-index.component';
import { RecetteCreateComponent } from './pages/recette-create/recette-create.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PrivacyPolicyComponent,
    IngredientsComponent,
    IngredientsComponent,
    IngredientFormComponent,
    RadarChartComponent,
    MesRecettesComponent,
    RecetteIndexComponent,
    RecetteCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
