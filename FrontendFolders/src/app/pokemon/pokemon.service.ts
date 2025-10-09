import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Trainer} from '../model/trainer';
import {Favorite} from '../model/favorite';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Pokemon} from '../model/pokemon';


@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  get current_user(): Trainer {
    return this._current_user;
  }

  get apiURL(): string {
    return this._apiURL;
  }

  private _apiURL = "http://localhost:8080"
  private _current_user = {} as Trainer
  alertString: string = "";
  favorite_pokemon: Favorite[] = []
  post_data: any = {};
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

  getFavoritesByEmail(){
    return this.httpClient.get(this._apiURL + "/api/favorite?email=" + this.current_user.email)
  }

  checkIfEmailAndPokemonExistInFavoriteRemainder(poke_name: string){
    for (var ind_pokemon of this.favorite_pokemon){
      if (ind_pokemon.favoritePokemonName == poke_name){
        return true
      }
    }
    return false
  }

  checkIfEmailAndPokemonExistInFavorite(email: string, poke_name: string){
    return this.httpClient.get(this._apiURL + "/api/favorite/exists?email=" + email + "&name=" + poke_name )
  }

  createFavoriteElement(favorite: Favorite, messageService: MessageService){
    this.httpClient.post(this._apiURL + '/api/favorite', favorite)
      .subscribe({
        next: response => {
          this.post_data = response;
          console.dir(this.post_data)
          this.alertString = "Favorite is created"
        },
        error: error => this.alertString = error.toString(),
        complete: () => {
          messageService.add({severity: 'success', summary: 'Element Added', detail: this.alertString})
          favorite.pokemonImage = this.post_data.pokemonImage
          favorite.pokemonTypes = this.post_data.pokemonTypes
          console.log(favorite.pokemonTypes)
          console.log(":::::::::::::::")
          console.log(this.post_data.pokemonTypes)
          this.favorite_pokemon.push(favorite)
          console.dir(this.favorite_pokemon)
          this.post_data = {}
        }
      })


  }

  deleteFavoriteElement(favorite_to_delete: Favorite, messageService: MessageService){
    this.httpClient.delete(this._apiURL + '/api/favorite/deletion?email=' + favorite_to_delete.trainerEmail + '&name=' + favorite_to_delete.favoritePokemonName).subscribe({
      next: response => this.alertString = "Favorite is successfully removed.",
      error: error => this.alertString = error.toString(),
      complete: () => {
        messageService.add({severity: 'error', summary: 'Element Removed', detail: this.alertString})
        this.favorite_pokemon = this.favorite_pokemon.filter(fav => fav.favoritePokemonName !== favorite_to_delete.favoritePokemonName)
        console.dir(this.favorite_pokemon)
      }
    })
  }

  changePage(url: string = '', person_response_object?: Trainer){
    this._current_user = person_response_object ? person_response_object : {} as Trainer
    this.favorite_pokemon = person_response_object ? this.favorite_pokemon : [];
    this.router.navigate([url]).then(r => {});
  }

}
