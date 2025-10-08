import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {Sprites} from '../model/sprites';
import {Pokemon} from '../model/pokemon';
import {Trainer} from '../model/trainer';
import {Table} from 'primeng/table';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  get apiURL(): string {
    return this._apiURL;
  }

  private _apiURL = "http://localhost:8080"
  private current_user = {} as Trainer

  constructor(private router: Router,
              private httpClient: HttpClient) { }

  getAllPokemon(){
    return this.httpClient.get(this._apiURL + "/api/pokemon")
  }

  getPokemonElement(pokemon_name: string){
    return this.httpClient.get(this._apiURL + "/api/pokemon/name/" + pokemon_name)
  }

  getAllTypes(){
    return this.httpClient.get(this._apiURL + "/api/pokemon/types")
  }

  getAllPokemonByType(type_name: string){
    return this.httpClient.get(this._apiURL + "/api/pokemon/type/" + type_name)
  }

  changePage(url: string = '', person_response_object?: Trainer){
    this.current_user = person_response_object ? person_response_object : {} as Trainer
    this.router.navigate([url]).then(r => {});
  }


}
