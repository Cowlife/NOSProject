import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Trainer} from '../../model/trainer';
import {Favorite} from '../../model/favorite';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Pokemon} from '../../model/pokemon';
import {MoveLong} from '../../model/moveLong';


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
  pokemon_moves_repo: MoveLong[] = []

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

  getAllMoves(){
    return this.httpClient.get(this._apiURL + "/api/pokemon/moves")
  }

  getFavoritesByEmail(){
    return this.httpClient.get(this._apiURL + "/api/favorite?email=" + this.current_user.email)
  }

  checkIfEmailAndPokemonExistInFavorite(email: string, poke_name: string){
    return this.httpClient.get(this._apiURL + "/api/favorite/exists?email=" + email + "&name=" + poke_name )
  }

  createFavoriteElement(favorite: Favorite, messageService: MessageService){
    this.httpClient.post(this._apiURL + '/api/favorite', favorite)
      .subscribe({
        next: response => {
          this.post_data = response;
          this.alertString = "Favorite is created"
        },
        error: error => this.alertString = error.toString(),
        complete: () => {
          messageService.add({severity: 'success', summary: 'Element Added', detail: this.alertString})
          favorite.pokemonImage = this.post_data.pokemonImage
          favorite.pokemonTypes = this.post_data.pokemonTypes
          this.favorite_pokemon.push(favorite)
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
      }
    })
  }

  getMoveInfo(move_name: string){
    this.httpClient.get(this._apiURL + '/api/pokemon/moves/' + move_name)
  }

  changePage(url: string = '', person_response_object?: Trainer){
    this._current_user = person_response_object ? person_response_object : {} as Trainer
    this.favorite_pokemon = person_response_object ? this.favorite_pokemon : [];
    this.router.navigate([url]).then(r => {});
  }

  getAllTrainersExceptOne(){
    return this.httpClient.get(this._apiURL + "/api/trainers/excludes/" + this.current_user.email)
  }

  getAllTrainers(){
    return this.httpClient.get(this._apiURL + "/api/trainers")
  }

}
