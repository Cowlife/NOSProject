import {Component} from '@angular/core';
import {Pokedex} from '../../../model/pokedex';
import {PokemonService} from '../../pokemon.service';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Pokemon} from '../../../model/pokemon';
import {PaginatorModule} from 'primeng/paginator';
import {Image} from 'primeng/image';
import {Sprites} from '../../../model/sprites';
import {forkJoin, map, Observable, of, switchMap, take, tap} from 'rxjs';
import {PokemonType} from '../../../model/pokemonType';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {NamedAPIResource} from '../../../model/namedAPIResource';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    Card,
    Button,
    PrimeTemplate,
    NgForOf,
    NgOptimizedImage,
    PaginatorModule,
    Image,
    AsyncPipe,
    NgIf,
    Checkbox,
    FormsModule
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent {

  pokemon_list: any = {} as Pokedex;
  record_length: number = 0;


  filteredArray: any[] = []
  defaultRecords: number = 10;
  image_list: String[] = [];
  type_list: PokemonType[][]  = [];

  type_categories: any = [] as NamedAPIResource[];
  selected_type_categories: any[] = [];

  constructor(protected pokemonService: PokemonService) {}

  ngOnInit(){
    this.pokemonService.getAllPokemon().subscribe(data=>{
      this.pokemon_list = data;
      this.record_length = this.pokemon_list.results.length;
      this.filteredArray = this.pokemon_list.results.slice(0, this.defaultRecords);
      this.modifyImageArray();
      this.modifyTypeArray();
    });
    this.pokemonService.getAllTypes().subscribe(type_data =>{
      this.type_categories = type_data as NamedAPIResource[];
      console.log(this.type_categories)
    })

  }

  modifyImageArray(){
    const image_requests = this.filteredArray.map(result =>
      this.pokemonService.getPokemonElement(result.name).pipe(
        map((pokemon:any) => pokemon.sprites.front_default)
      )
    );
    // Used forkJoin to wait for request image
    forkJoin(image_requests).subscribe((images: any) => {
      this.image_list = images;
    });
  }


  modifyTypeArray(){
    const type_requests = this.filteredArray.map(result =>
      this.pokemonService.getPokemonElement(result.name).pipe(
        map((pokemon:any) => pokemon.types)
      )
    );

    forkJoin(type_requests).subscribe((types: any) => {
      this.type_list = types;
      console.log(this.type_list[0][0].type.name)
      console.log(this.type_list[0][1].type.name)
      console.log(this.type_list[1][0].type.name)
      console.log(this.type_list[1][1].type.name)
      console.log(this.type_list[2][0].type.name)
      console.log(this.type_list[2][1].type.name)
      console.log(this.type_list[3][0].type.name)
    });
  }

  checkUndefined(str_var: string){
    if (str_var == undefined){
      return "";
    }
    else {
      return str_var
    }

  }

  onPageChange(data: any) {
    this.filteredArray = this.pokemon_list.results.slice(
      data.page * data.rows,
      (data.page + 1) * data.rows );
    this.modifyImageArray()
    this.modifyTypeArray()
    // console.log("Data Page:" + data.page) » Actual page index
    //console.log("Page Index:" + data.first) » Index the page begins with
    // console.log("Data Rows:" + data.rows) » Rows that table can display
    // console.log("Page Count Max:" + data.pageCount) » Total pages
  }


}
