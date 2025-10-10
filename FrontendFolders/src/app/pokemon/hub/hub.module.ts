import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HubComponent} from './hub.component';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {BattleCenterComponent} from './battle-center/battle-center.component';


const poke_routes: Routes = [
  {
    path: '',
    component: HubComponent,
    children: [
      { path: '', component: PokemonListComponent },
      { path: 'battle_center', component: BattleCenterComponent },
    ],

  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(poke_routes)],
  exports: [RouterModule],
})
export class HubModule { }
