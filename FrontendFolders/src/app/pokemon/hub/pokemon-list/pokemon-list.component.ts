import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokedex} from '../../../model/pokedex';
import {PokemonService} from '../../pokemon.service';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    Card,
    Button,
    PrimeTemplate,
    NgForOf
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {

  pokemon_list: any = {} as Pokedex;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(){
    this.pokemonService.getAllPokemon().subscribe(data=>{
      this.pokemon_list = data;
      console.log(this.pokemon_list.results)
    });

  }

}
