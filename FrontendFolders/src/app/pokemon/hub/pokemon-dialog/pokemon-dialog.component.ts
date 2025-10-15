import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {Dialog} from "primeng/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {Favorite} from '../../../model/favorite';
import {ConfirmationService, FilterMatchMode, MessageService, PrimeTemplate, SelectItem} from 'primeng/api';
import {PokemonService} from '../../pokemon.service';
import {ArtService} from '../../art.service';
import {Pokemon} from '../../../model/pokemon';
import {TableModule} from 'primeng/table';
import {Trainer} from '../../../model/trainer';
import {MoveShort} from '../../../model/moveShort';
import {MoveLong} from '../../../model/moveLong';
import {MetaData} from '../../../model/metaData';

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
    TableModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './pokemon-dialog.component.html',
  styleUrl: './pokemon-dialog.component.css'
})
export class PokemonDialogComponent {
  @Input() dialog_visibility: boolean = false;
  matchModeOptions: SelectItem[] = [];
  @Input() retrieval_move_cols: any[] = [];
  @Input() current_extracted_data: Pokemon = {} as Pokemon
  @Output() change_dialog_visibility = new EventEmitter<boolean>();
  protected readonly console = console;
  protected readonly FilterMatchMode = FilterMatchMode;
  moves: MoveLong[] = [];
  cols: any[] = [];
  current_pokemon_move_list: any[] = [];

  constructor(protected pokemonService: PokemonService,
              protected messageService: MessageService,
              protected confirmationService: ConfirmationService,
              protected artService: ArtService){}

  ngOnInit(){
    this.matchModeOptions = [
      { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contains', value: FilterMatchMode.CONTAINS},
      { label: 'Not Contains', value: FilterMatchMode.NOT_CONTAINS},
      { label: 'Ends With',value: FilterMatchMode.ENDS_WITH},
      { label: 'Equals',value: FilterMatchMode.EQUALS},
      { label: 'Not Equals',value: FilterMatchMode.NOT_EQUALS}
    ];


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

  setSpriteImageLabel(key: string){
    // Capitalizing all letters
    let words = key.replace(/_/g," ").split(" ")

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
        case 'meta': {
          const meta = moveLongElements[key];
          this.setMetaColumns(meta)
          break
        }
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

  setMetaColumns(meta: MetaData){
    for (let inside_key in meta){
      if (['ailment','category','crit_rate'].includes(inside_key)){
        this.retrieval_move_cols.push({
          field: inside_key,
          header: this.setSpriteImageLabel(inside_key),
        })
      }
    }
  }

  returnCellElement(element: any): any {
    if (element == null){
      return "--"
    }
    else if(Array.isArray(element)){
      return element[0].short_effect //Use effect later
    }
    else if(element instanceof Object){
      return element.name
    }
    else{
      return element
    }

  }
}
