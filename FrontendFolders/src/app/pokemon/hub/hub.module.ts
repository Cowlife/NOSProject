import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HubComponent} from './hub.component';
import {EditMovesPageComponent} from './edit-moves-page/edit-moves-page.component';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';


const poke_routes: Routes = [
  {
    path: '',
    component: HubComponent,
    children: [
      { path: '', component: PokemonListComponent },
      { path: 'pokemonId:/edit_moves', component: EditMovesPageComponent },
    ],

  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(poke_routes)],
  exports: [RouterModule],
})
export class HubModule { }
