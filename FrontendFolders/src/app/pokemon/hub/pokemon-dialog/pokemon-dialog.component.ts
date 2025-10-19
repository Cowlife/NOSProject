import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {Dialog} from "primeng/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {ConfirmationService, FilterMatchMode, MessageService, PrimeTemplate, SelectItem} from 'primeng/api';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../../model/pokemon';
import {TableModule} from 'primeng/table';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {PokemonTypesRepo} from '../../pokemon_types_repo';
import {UIChart} from 'primeng/chart';

@Component({
  selector: 'app-pokemon-dialog',
  standalone: true,
  imports: [
    Button,
    Card,
    Dialog,
    NgForOf,
    NgIf,
    PrimeTemplate,
    TableModule,
    FaIconComponent,
    UIChart
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './pokemon-dialog.component.html',
  styleUrl: './pokemon-dialog.component.css'
})
export class PokemonDialogComponent {
  @Input() dialog_visibility: boolean = false;
  @Input() retrieval_move_cols: any[] = [];
  @Input() current_extracted_data: Pokemon = {} as Pokemon
  @Input() chart_data_options: any[] = [];


  data: any;
  options: any;

  @Output() change_dialog_visibility = new EventEmitter<boolean>();
  protected readonly console = console;
  protected readonly FilterMatchMode = FilterMatchMode;
  ref_set: Set<string> = new Set<string>()
  current_pokemon_move_list: any[] = [];



  constructor(protected pokemonService: PokemonService,
              protected pokemonTypes: PokemonTypesRepo){}

  ngOnInit(){

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Value of Stat',
          backgroundColor: '#357222',
          data: [65, 59, 80, 81, 56, 55]
        },
      ]
    };

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#cc2525'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff',
            font: {
              weight: 500
            }
          },
          grid: {
            color: '#2f0080',
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: '#ffffff'
          },
          grid: {
            color: '#2f0080',
            drawBorder: false
          }
        }
      }
    };
  }


  setSpriteImages(){
    let spriteImageRepo: SelectItem[] = [];
    for (let key in this.current_extracted_data.sprites) {
      if ((this.current_extracted_data.sprites as any)[key]){
        spriteImageRepo.push({
          label: this.setSpriteImageLabel(key),
          value: (this.current_extracted_data.sprites as any)[key],
        })
      }
    }
    return spriteImageRepo
  }

  setSpriteImageLabel(key: string, remove_hifen: boolean = false){
    // Capitalizing all letters
    let words: string[];
    if (remove_hifen){
      words = key.replace(/-/g," ").split(" ")
    }
    else{
      words = key.replace(/_/g," ").split(" ")
    }
    const result = words.map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    }).join(" ");

    return result;
  }

  setMoveTable(){
    this.retrieval_move_cols = []
    let current_pokemon_moves: string[] = []
    this.current_extracted_data.moves.forEach(value => {
      current_pokemon_moves.push(value.move.name)
    })
    const moveLongElements = this.pokemonService.pokemon_moves_repo[0]
    for (let key in moveLongElements) {
      switch(key) {
        case 'id': {break}
        case 'meta': {break}
        default: {
          this.retrieval_move_cols.push({
            field: key,
            header: this.setSpriteImageLabel(key),
          })
          break
        }
      }
    }
    this.current_pokemon_move_list = this.pokemonService.pokemon_moves_repo.filter(
      url => (
        current_pokemon_moves.includes(url.name)
      )
    )
    console.log("result")
    console.dir(this.current_pokemon_move_list)

  }

  returnFilter(col: any){
    if (['damage_class','target','type'].includes(col.field)){
      return col.field.name
    }
    else if(col.field == 'effect_entries'){
      return col.field[0].short_effect
    }
    else{
      return col.field
    }
  }

  returnNonIconCellElement(rowData: any, col: any): any {
    const element = rowData[col.field]
    if(Array.isArray(element)){
      return element[0].short_effect //Use effect later
    }
    else if(element instanceof Object){
      return element.name
    }
    else if (element == null){
      return "--"
    }
    else{
      return element
    }
  }


}
