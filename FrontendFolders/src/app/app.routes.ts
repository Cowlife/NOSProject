import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pokemon/services/pokemon.module').then(m => m.PokemonModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule{}
