import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, Routes} from '@angular/router';
import {CharactersComponent} from "./components/characters/characters.component";
import {CharacterDetailComponent} from "./components/character-detail/character-detail.component";

const routes: Routes = [
  {path: '', component: CharactersComponent},
  {path:'character/:id', component : CharacterDetailComponent},
]

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
