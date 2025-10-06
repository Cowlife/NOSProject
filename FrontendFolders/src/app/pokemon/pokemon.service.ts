import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  get apiURL(): string {
    return this._apiURL;
  }

  private _apiURL = "http://localhost:8080"

  constructor(private router: Router,
              private httpClient: HttpClient) { }

  getAllPokemon(){
    return this.httpClient.get(this._apiURL + "/api/pokemon")
  }

  changePage(url: any){
    this.router.navigate([url]).then(r => {});
  }


}
