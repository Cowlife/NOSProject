import {Injectable} from '@angular/core';
import {PokemonService} from './pokemon.service';
import argon2 from 'argon2';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private pokemonService: PokemonService) { }

  //Below is just for security purposes
  hashAllPasswordsOfDatabase(){
    this.pokemonService.getAllTrainers().subscribe((data: any) => {
      console.dir(data)
    })
  }

}
