import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HubComponent} from './hub/hub.component';

const poke_routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'pokemon/register', component: RegisterComponent},
  { path: 'pokemon/hub',
    loadChildren: () => import('./hub/hub.module').then(m => m.HubModule)
  },

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(poke_routes),CommonModule],
  exports: [RouterModule]
})
export class PokemonModule { }
